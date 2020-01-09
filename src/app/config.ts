import { assert } from "./helpers";

export const SCALE = 20;
export const CANVAS_WIDTH = 1080;
export const CANVAS_HEIGHT = 640;
export const COL_COUNT = CANVAS_WIDTH / SCALE;
export const ROW_COUNT = CANVAS_HEIGHT / SCALE;
export const FRAMES_PER_SECOND = 7;
export const HEALTHY_FOOD_COUNT = 3;
export const POISONOUS_FOOD_COUNT = 3;

assert(Number.isInteger(COL_COUNT));
assert(Number.isInteger(ROW_COUNT));
