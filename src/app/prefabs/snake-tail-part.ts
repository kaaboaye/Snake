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
    const color = [
      (this.position.x / (width - SCALE)) * 255,
      (this.position.y / (height - SCALE)) * 255,
      ((this.position.x / (width - SCALE) +
        this.position.y / (height - SCALE)) *
        255) /
        2
    ].map(x => Math.round(x)) as [number, number, number];

    fill(...color);
    rect(this.position.x, this.position.y, SCALE, SCALE);

    return this;
  }
}
