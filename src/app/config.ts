import { assert } from "./helpers";

export const SCALE = 20;
export const CANVAS_WIDTH = 640;
export const CANVAS_HEIGHT = CANVAS_WIDTH;
export const COL_COUNT = CANVAS_WIDTH / SCALE;
export const ROW_COUNT = CANVAS_HEIGHT / SCALE;
export const FRAMES_PER_SECOND = 7;

assert(Number.isInteger(COL_COUNT));
assert(Number.isInteger(ROW_COUNT));
