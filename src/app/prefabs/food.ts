import { Vector } from "p5";
import { COL_COUNT, ROW_COUNT, SCALE } from "../config";
import { GameObject } from "./game-object";

export class Food extends GameObject {
  private readonly _position: Vector = createVector(0, 0);

  public get position(): Readonly<Vector> {
    return this._position;
  }

  public constructor() {
    super();
    this.eat();
  }

  public update(): this {
    return this;
  }

  public draw(): this {
    fill(255, 0, 100);
    rect(this._position.x, this._position.y, SCALE, SCALE);

    return this;
  }

  public eat(): this {
    this._position.x = Math.floor(Math.random() * COL_COUNT);
    this._position.y = Math.floor(Math.random() * ROW_COUNT);
    this._position.mult(SCALE);

    return this;
  }
}
