import { PNG } from "pngjs";

export type Frame = {
  readonly durationMilliseconds: number;
  readonly content: null | {
    readonly png: PNG;
    readonly offset: {
      readonly left: number;
      readonly top: number;
    };
  };
};
