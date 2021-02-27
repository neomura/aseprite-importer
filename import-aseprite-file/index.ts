import { tmpdir } from "os";
import { spawn } from "cross-spawn";
import { join } from "path";
import { promises, createReadStream } from "fs";
import { v4 } from "uuid";
import { ImportedAsepriteFile } from "../imported-aseprite-file";
import { escapeCommandLineArgument } from "../escape-command-line-argument";
import { PNG } from "pngjs";

export async function importAsepriteFile(
  pathToAsepriteFile: string
): Promise<ImportedAsepriteFile> {
  const temporaryDirectory = join(tmpdir(), v4());

  try {
    await promises.mkdir(temporaryDirectory, {
      recursive: true,
    });

    const dataFile = join(temporaryDirectory, `data.json`);
    const sheetFile = join(temporaryDirectory, `sheet.png`);

    // Aseprite doesn't seem to show up reliably through anything but Bash for unknown reason - so make a script and execute that.
    const scriptFile = join(temporaryDirectory, `script.sh`);

    const script = `aseprite --batch --list-tags --trim ${escapeCommandLineArgument(
      pathToAsepriteFile
    )} --data ${escapeCommandLineArgument(
      dataFile
    )} --filename-format {frame} --sheet ${escapeCommandLineArgument(
      sheetFile
    )}`;

    await promises.writeFile(
      scriptFile,
      `set -e

${script}`
    );

    let exitCode: null | number = null;
    let stdout = ``;
    let stderr = ``;

    await new Promise<void>((resolve, reject) => {
      const childProcess = spawn(`bash`, [`-e`, scriptFile]);

      childProcess.stdout.on(`data`, (data) => {
        stdout += data;
      });

      /* istanbul ignore next */
      childProcess.stderr.on(`data`, (data) => {
        // Aseprite CLI does not appear to write to stderr.
        stderr += data;
      });

      childProcess.on(`close`, (code) => {
        exitCode = code;
        resolve();
      });

      childProcess.on(`error`, reject);
    });

    /* istanbul ignore next */
    if (exitCode !== 0 || stderr.trim() !== ``) {
      // Aseprite CLI does not appear to use exit codes.
      throw new Error(
        `"${script}" exited with code ${exitCode}; stdout ${stdout}; stderr ${stderr}.`
      );
    }

    const dataJson = await promises.readFile(dataFile, `utf8`);

    if (dataJson === ``) {
      throw new Error(`"${script}" produced an empty data file.`);
    }

    const data: {
      readonly frames: {
        readonly [index: number]: {
          readonly frame: {
            readonly x: number;
            readonly y: number;
            readonly w: number;
            readonly h: number;
          };
          readonly spriteSourceSize: { x: number; y: number };
          readonly duration: number;
        };
      };
      readonly meta: {
        readonly frameTags: ReadonlyArray<{
          readonly name: string;
          readonly from: number;
          readonly to: number;
          readonly direction: `forward` | `reverse` | `pingpong`;
        }>;
      };
    } = JSON.parse(dataJson);

    const sheetPng = await new Promise<PNG>((resolve, reject) => {
      const png = new PNG();
      createReadStream(sheetFile)
        .pipe(png)
        .on(`parsed`, () => {
          resolve(png);
        })
        .on(`error`, reject);
    });

    return {
      frames: Object.keys(data.frames)
        .map((key) => parseInt(key))
        .sort((a, b) => a - b)
        .map((index) => {
          const frame = data.frames[index];

          const framePng = new PNG({
            width: frame.frame.w,
            height: frame.frame.h,
          });

          sheetPng.bitblt(
            framePng,
            frame.frame.x,
            frame.frame.y,
            frame.frame.w,
            frame.frame.h
          );

          for (let y = 0; y < framePng.height; y++) {
            for (let x = 0; x < framePng.width; x++) {
              if (framePng.data[y * framePng.width * 4 + x * 4 + 3] > 0) {
                return {
                  durationMilliseconds: frame.duration,
                  content: {
                    png: framePng,
                    offset: {
                      left: frame.spriteSourceSize.x,
                      top: frame.spriteSourceSize.y,
                    },
                  },
                };
              }
            }
          }

          return { durationMilliseconds: frame.duration, content: null };
        }),
      tags: data.meta.frameTags.map((tag) => {
        const frameIndices: number[] = [];

        switch (tag.direction) {
          case `forward`:
            for (let index = tag.from; index <= tag.to; index++) {
              frameIndices.push(index);
            }
            break;

          case `reverse`:
            for (let index = tag.to; index >= tag.from; index--) {
              frameIndices.push(index);
            }
            break;

          case `pingpong`:
            for (let index = tag.from; index < tag.to; index++) {
              frameIndices.push(index);
            }

            for (let index = tag.to; index > tag.from; index--) {
              frameIndices.push(index);
            }
            break;

          /* istanbul ignore next */
          default:
            // We cannot force Aseprite to generate an unexpected direction.
            throw new Error(
              `Tag ${JSON.stringify(
                tag.name
              )} uses unimplemented direction ${JSON.stringify(tag.direction)}.`
            );
        }

        return {
          name: tag.name,
          frameIndices,
        };
      }),
    };
  } finally {
    await promises.rm(temporaryDirectory, { recursive: true, force: true });
  }
}
