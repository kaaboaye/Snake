import { Vector } from "p5";
import { Frame } from "./frame";

export abstract class GameObject {
  public abstract get position(): Readonly<Vector>;
  public abstract update(frame: Frame): this;
  public abstract draw(): this;

  public distance(gameObject: GameObject): number {
    return dist(
      this.position.x,
      this.position.y,
      gameObject.position.x,
      gameObject.position.y
    );
  }
}
