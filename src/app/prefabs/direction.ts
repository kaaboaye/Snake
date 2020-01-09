import { Vector } from "p5";

export class Direction {
  public static readonly Up = Symbol("Direction.Up");
  public static readonly Down = Symbol("Direction.Down");
  public static readonly Left = Symbol("Direction.Left");
  public static readonly Right = Symbol("Direction.Right");

  public static toVector(direction: DirectionValue): Vector {
    switch (direction) {
      case Direction.Up:
        return createVector(0, -1);

      case Direction.Down:
        return createVector(0, 1);

      case Direction.Left:
        return createVector(-1, 0);

      case Direction.Right:
        return createVector(1, 0);
    }
  }

  public static isOpposite(
    direction1: DirectionValue,
    direction2: DirectionValue
  ): boolean {
    switch (direction1) {
      case Direction.Up:
        return direction2 === Direction.Down;

      case Direction.Down:
        return direction2 === Direction.Up;

      case Direction.Left:
        return direction2 === Direction.Right;

      case Direction.Right:
        return direction2 === Direction.Left;
    }
  }
}

export type DirectionValue =
  | typeof Direction.Up
  | typeof Direction.Down
  | typeof Direction.Left
  | typeof Direction.Right;
