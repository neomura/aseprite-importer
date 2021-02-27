import { Frame } from "./frame";
import { Tag } from "./tag";

export { Frame } from "./frame";
export { Tag } from "./tag";

export type ImportedAsepriteFile = {
  readonly frames: ReadonlyArray<Frame>;
  readonly tags: ReadonlyArray<Tag>;
};
