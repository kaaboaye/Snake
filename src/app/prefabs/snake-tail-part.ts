import { Vector } from "p5";
import { SCALE } from "../config";
import { GameObject } from "./game-object";

export class SnakeTailPart extends GameObject {
  public constructor(public readonly position: Vector) {
    super();
  }

  public update(): this {
    return this;
  }

  public draw(): this {
    fill(255);
    rect(this.position.x, this.position.y, SCALE, SCALE);

    return this;
  }
}
