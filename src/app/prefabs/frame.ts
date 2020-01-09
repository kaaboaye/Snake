import { DirectionValue } from "./direction";

export interface Frame {
  readonly inputKeyDirection: DirectionValue | null;
  readonly inputArrowDirection: DirectionValue | null;
}
