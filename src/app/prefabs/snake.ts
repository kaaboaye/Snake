import { Vector } from "p5";
import { SCALE } from "../config";
import { assertNever } from "../helpers";
import { Direction, DirectionValue } from "./direction";
import { Food } from "./food";
import { FoodType } from "./food-type";
import { Frame } from "./frame";
import { GameObject } from "./game-object";
import { InputType } from "./input-type";
import { SnakeTailPart } from "./snake-tail-part";

export class Snake extends GameObject {
  private set _score(score: number) {
    this.__score__ = score;
    this._scoreObserver(score);
  }

  private get _score(): number {
    return this.__score__;
  }

  public get position(): Readonly<Vector> {
    return this._position;
  }

  private _position: Vector = createVector(0, 0);
  private _direction: DirectionValue = Direction.Up;
  private readonly _tail: SnakeTailPart[] = [];
  private readonly _foods: Food[];
  private readonly _scoreObserver: (score: number) => void;
  private readonly _deathObserver: (score: number) => void;
  private readonly _headColor: readonly [number, number, number];
  private readonly _inputType: InputType;

  // tslint:disable-next-line: variable-name
  private __score__: number = 0;

  public constructor(config: {
    foods: Food[];
    inputType?: InputType;
    headColor?: [number, number, number];
    scoreObserver?(score: number): void;
    deathObserver?(score: number): void;
  }) {
    super();

    this._foods = config.foods;
    this._headColor = config.headColor || [255, 255, 255];
    this._inputType = config.inputType || InputType.Any;
    this._scoreObserver = config.scoreObserver || (() => ({}));
    this._deathObserver = config.deathObserver || (() => ({}));
  }

  public update(frame: Frame): this {
    this.setDirection(this.directionFromFrame(frame))
      .move()
      .eatFood()
      .eatTail();

    this._tail.forEach(part => part.update());

    return this;
  }

  public draw(): this {
    fill(...this._headColor);
    rect(this._position.x, this._position.y, SCALE, SCALE);

    this._tail.forEach(part => part.draw());

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
    this._foods.forEach(food => {
      if (this.collides(food)) {
        food.eat();

        switch (food.type) {
          case FoodType.Healthy:
            this.grow();

            return;

          case FoodType.Poisonous:
            this.die();

            return;

          default:
            assertNever(food.type);
        }
      }
    });

    return this;
  }

  private eatTail(): this {
    const eaten = this._tail.some(tailPart => this.collides(tailPart));

    if (eaten) {
      this._score = 0;
      this._tail.length = 0;
    }

    return this;
  }

  private grow(): this {
    this._score += 1;

    return this;
  }

  private die(): this {
    this._deathObserver(this._score);

    this._score = 0;
    this._tail.length = 0;

    return this;
  }

  private directionFromFrame(frame: Frame): DirectionValue | null {
    switch (this._inputType) {
      case InputType.Arrows:
        return frame.inputArrowDirection;

      case InputType.Keys:
        return frame.inputKeyDirection;

      case InputType.Any:
        return frame.inputArrowDirection;
    }
  }
}
