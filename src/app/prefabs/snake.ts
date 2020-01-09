import { Vector } from "p5";
import { SCALE } from "../config";
import { Direction, DirectionValue } from "./direction";
import { Food } from "./food";
import { Frame } from "./frame";
import { GameObject } from "./game-object";
import { SnakeTailPart } from "./snake-tail-part";

export class Snake extends GameObject {
  private set _score(score: number) {
    this.__score__ = score;
    this._scoreObservers.forEach(observer => observer(score));
  }

  private get _score(): number {
    return this.__score__;
  }

  public get position(): Readonly<Vector> {
    return this._position;
  }

  private readonly _scoreObservers: Set<(score: number) => void> = new Set();
  private _position: Vector = createVector(0, 0);
  private _direction: DirectionValue = Direction.Up;
  private readonly _tail: SnakeTailPart[] = [];

  // tslint:disable-next-line: variable-name
  private __score__: number = 0;

  public constructor(public food: Food) {
    super();
  }

  public update({ inputDirection }: Frame): this {
    this.setDirection(inputDirection)
      .move()
      .eatFood()
      .eatTail();

    this._tail.forEach(part => part.update());

    return this;
  }

  public draw(): this {
    fill(255);
    rect(this._position.x, this._position.y, SCALE, SCALE);

    this._tail.forEach(part => part.draw());

    return this;
  }

  public addScoreObserver(observer: (score: number) => void): this {
    observer(this._score);
    this._scoreObservers.add(observer);

    return this;
  }

  private move(): this {
    // move tail
    if (this._score === this._tail.length) {
      // tslint:disable-next-line: increment-decrement
      for (let i = 0; i < this._tail.length - 1; i++) {
        this._tail[i] = this._tail[i + 1];
      }
    }

    this._tail[this._score - 1] = new SnakeTailPart(this._position);

    // move snake head
    this._position = Direction.toVector(this._direction)
      .mult(SCALE)
      .add(this._position);

    // move head after collision with a wall
    if (this._position.y > height - SCALE) {
      this._position.y = 0;
    }

    if (this._position.y < 0) {
      this._position.y = height + SCALE;
    }

    if (this._position.x > width - SCALE) {
      this._position.x = 0;
    }

    if (this._position.x < 0) {
      this._position.x = width - SCALE;
    }

    this._position.x = constrain(this._position.x, 0, width - SCALE);
    this._position.y = constrain(this._position.y, 0, height - SCALE);

    return this;
  }

  private setDirection(direction: DirectionValue | null): this {
    if (!direction) {
      return this;
    }

    if (!Direction.isOpposite(direction, this._direction)) {
      this._direction = direction;
    }

    return this;
  }

  private eatFood(): this {
    if (this.distance(this.food) < 1) {
      this._score += 1;
      this.food.eat();
    }

    return this;
  }

  private eatTail(): this {
    const eaten = this._tail.some(tailPart => this.distance(tailPart) < 1);

    if (eaten) {
      this._score = 0;
      this._tail.length = 0;
    }

    return this;
  }
}
