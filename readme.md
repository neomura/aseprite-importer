# neomura/aseprite-importer

Helpers for importing Aseprite files using NodeJS.

[MIT licensed](./license.md).

## Usage

Both `bash` and `aseprite` must exist on the PATH.

Use [neomura/setup-aseprite-cli-action](https://github.com/neomura/setup-aseprite-cli-action) to use this in CI.

```ts
import { inspect } from "util";
import { importAsepriteFile } from "@neomura/aseprite-importer";

importAsepriteFile(`path-to-an-aseprite-file.ase`)
  .then((result) => {
    console.log(inspect(result, false, 4, true));
  });
```

This will produce the following output for an example file:

```
{
  frames: [
    {
      durationMilliseconds: 250,
      content: {
        png: Stream {
          _events: [Object: null prototype] {},
          _eventsCount: 0,
          _maxListeners: undefined,
          width: 48,
          height: 32,
          data: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 ... 6094 more bytes>,
          gamma: 0,
          writable: true,
          readable: true,
          _parser: [Stream],
          _packer: [Stream],
          [Symbol(kCapture)]: false
        },
        offset: { left: 63, top: 19 }
      }
    },
    { durationMilliseconds: 100, content: null },
    {
      durationMilliseconds: 400,
      content: {
        png: Stream {
          _events: [Object: null prototype] {},
          _eventsCount: 0,
          _maxListeners: undefined,
          width: 48,
          height: 32,
          data: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 ... 6094 more bytes>,
          gamma: 0,
          writable: true,
          readable: true,
          _parser: [Stream],
          _packer: [Stream],
          [Symbol(kCapture)]: false
        },
        offset: { left: 69, top: 56 }
      }
    },
    {
      durationMilliseconds: 250,
      content: {
        png: Stream {
          _events: [Object: null prototype] {},
          _eventsCount: 0,
          _maxListeners: undefined,
          width: 48,
          height: 32,
          data: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 ... 6094 more bytes>,
          gamma: 0,
          writable: true,
          readable: true,
          _parser: [Stream],
          _packer: [Stream],
          [Symbol(kCapture)]: false
        },
        offset: { left: 33, top: 36 }
      }
    },
    {
      durationMilliseconds: 200,
      content: {
        png: Stream {
          _events: [Object: null prototype] {},
          _eventsCount: 0,
          _maxListeners: undefined,
          width: 71,
          height: 5,
          data: <Buffer ff 00 00 ff 00 00 00 00 00 00 00 00 00 00 00 00 ff 00 00 ff 00 00 00 00 ff 00 00 ff 00 00 00 00 00 00 00 00 00 00 00 00 ff 00 00 ff 00 00 00 00 ff 00 ... 1370 more bytes>,
          gamma: 0,
          writable: true,
          readable: true,
          _parser: [Stream],
          _packer: [Stream],
          [Symbol(kCapture)]: false
        },
        offset: { left: 28, top: 46 }
      }
    },
    {
      durationMilliseconds: 500,
      content: {
        png: Stream {
          _events: [Object: null prototype] {},
          _eventsCount: 0,
          _maxListeners: undefined,
          width: 48,
          height: 32,
          data: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 ... 6094 more bytes>,
          gamma: 0,
          writable: true,
          readable: true,
          _parser: [Stream],
          _packer: [Stream],
          [Symbol(kCapture)]: false
        },
        offset: { left: 45, top: 42 }
      }
    },
    { durationMilliseconds: 100, content: null },
    {
      durationMilliseconds: 50,
      content: {
        png: Stream {
          _events: [Object: null prototype] {},
          _eventsCount: 0,
          _maxListeners: undefined,
          width: 48,
          height: 32,
          data: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 ... 6094 more bytes>,
          gamma: 0,
          writable: true,
          readable: true,
          _parser: [Stream],
          _packer: [Stream],
          [Symbol(kCapture)]: false
        },
        offset: { left: 18, top: 38 }
      }
    },
    {
      durationMilliseconds: 200,
      content: {
        png: Stream {
          _events: [Object: null prototype] {},
          _eventsCount: 0,
          _maxListeners: undefined,
          width: 48,
          height: 32,
          data: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 ... 6094 more bytes>,
          gamma: 0,
          writable: true,
          readable: true,
          _parser: [Stream],
          _packer: [Stream],
          [Symbol(kCapture)]: false
        },
        offset: { left: 45, top: 38 }
      }
    },
    {
      durationMilliseconds: 250,
      content: {
        png: Stream {
          _events: [Object: null prototype] {},
          _eventsCount: 0,
          _maxListeners: undefined,
          width: 48,
          height: 32,
          data: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 ... 6094 more bytes>,
          gamma: 0,
          writable: true,
          readable: true,
          _parser: [Stream],
          _packer: [Stream],
          [Symbol(kCapture)]: false
        },
        offset: { left: 12, top: 45 }
      }
    },
    { durationMilliseconds: 100, content: null },
    {
      durationMilliseconds: 400,
      content: {
        png: Stream {
          _events: [Object: null prototype] {},
          _eventsCount: 0,
          _maxListeners: undefined,
          width: 48,
          height: 32,
          data: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 ... 6094 more bytes>,
          gamma: 0,
          writable: true,
          readable: true,
          _parser: [Stream],
          _packer: [Stream],
          [Symbol(kCapture)]: false
        },
        offset: { left: 53, top: 16 }
      }
    },
    {
      durationMilliseconds: 50,
      content: {
        png: Stream {
          _events: [Object: null prototype] {},
          _eventsCount: 0,
          _maxListeners: undefined,
          width: 48,
          height: 32,
          data: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 00 ff ff 00 ... 6094 more bytes>,
          gamma: 0,
          writable: true,
          readable: true,
          _parser: [Stream],
          _packer: [Stream],
          [Symbol(kCapture)]: false
        },
        offset: { left: 75, top: 27 }
      }
    }
  ],
  tags: [
    { name: 'tag_a_name', frameIndices: [ 0, 1, 2, 3 ] },
    { name: 'tag_b_name', frameIndices: [ 8, 7, 6, 5 ] },
    { name: 'tag_c_name', frameIndices: [ 9, 10, 11, 12, 11, 10 ] }
  ]
}
```

Here:
- `frames.*.content.png` is a [pngjs](https://www.npmjs.com/package/pngjs) PNG object containing the frame's pixel data, trimmed of transparent space.
- `frames.*.content.offset` describes where the trimmed PNG object was positioned relative to the top left corner of the original
- When `frames.*.content` is null, the frame is empty.
