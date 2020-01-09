import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  FRAMES_PER_SECOND,
  HEALTHY_FOOD_COUNT,
  POISONOUS_FOOD_COUNT
} from "./config";
import { Direction, DirectionValue } from "./prefabs/direction";
import { Food } from "./prefabs/food";
import { FoodType } from "./prefabs/food-type";
import { Frame } from "./prefabs/frame";
import { GameObject } from "./prefabs/game-object";
import { InputType } from "./prefabs/input-type";
import { Snake } from "./prefabs/snake";

// tslint:disable-next-line: no-any
declare var window: any;

const gameObjects: GameObject[] = [];
let inputKeyDirection: DirectionValue | null = null;
let inputArrowDirection: DirectionValue | null = null;

// tslint:disable-next-line: no-non-null-assertion
const scoreAElement = document.getElementById("score-a")!;
// tslint:disable-next-line: no-non-null-assertion
const scoreBElement = document.getElementById("score-b")!;
// tslint:disable-next-line: no-non-null-assertion
const bestScoreAElement = document.getElementById("best-score-a")!;
// tslint:disable-next-line: no-non-null-assertion
const bestScoreBElement = document.getElementById("best-score-b")!;

bestScoreAElement.innerHTML = localStorage.getItem("snake-best-score-a") || "0";
bestScoreBElement.innerHTML = localStorage.getItem("snake-best-score-b") || "0";

window.setup = () => {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  frameRate(FRAMES_PER_SECOND);

  const foods: Food[] = [];

  // tslint:disable-next-line: increment-decrement
  for (let i = 0; i < HEALTHY_FOOD_COUNT; i++) {
    foods.push(new Food(FoodType.Healthy));
  }
  // tslint:disable-next-line: increment-decrement
  for (let i = 0; i < POISONOUS_FOOD_COUNT; i++) {
    foods.push(new Food(FoodType.Poisonous));
  }

  const snakeKeys = new Snake({
    foods,
    inputType: InputType.Keys,
    headColor: [0, 32, 255],
    scoreObserver: score => (scoreAElement.innerHTML = score.toString()),
    deathObserver: score => {
      const bestScore = Number.parseInt(
        localStorage.getItem("snake-best-score-a") || "0",
        10
      );

      if (score > bestScore) {
        bestScoreAElement.innerHTML = score.toString();
        localStorage.setItem("snake-best-score-a", score.toString());
      }
    }
  });

  const snakeArrows = new Snake({
    foods,
    inputType: InputType.Arrows,
    headColor: [255, 255, 0],
    scoreObserver: score => (scoreBElement.innerHTML = score.toString()),
    deathObserver: score => {
      const bestScore = Number.parseInt(
        localStorage.getItem("snake-best-score-b") || "0",
        10
      );

      if (score > bestScore) {
        bestScoreBElement.innerHTML = score.toString();
        localStorage.setItem("snake-best-score-b", score.toString());
      }
    }
  });

  gameObjects.push(...foods, snakeArrows, snakeKeys);
};

window.draw = () => {
  background(51);

  const frame: Frame = { inputArrowDirection, inputKeyDirection };

  gameObjects.forEach(gameObject => gameObject.update(frame).draw());

  inputKeyDirection = null;
  inputArrowDirection = null;
};

window.keyPressed = () => {
  switch (keyCode) {
    case UP_ARROW:
      inputArrowDirection = Direction.Up;
      break;

    case DOWN_ARROW:
      inputArrowDirection = Direction.Down;
      break;

    case LEFT_ARROW:
      inputArrowDirection = Direction.Left;
      break;

    case RIGHT_ARROW:
      inputArrowDirection = Direction.Right;
      break;

    default:
  }
};

window.keyTyped = () => {
  const directions: { keys: string[]; direction: DirectionValue }[] = [
    { keys: ["w", "W"], direction: Direction.Up },
    { keys: ["s", "S"], direction: Direction.Down },
    { keys: ["a", "A"], direction: Direction.Left },
    { keys: ["d", "D"], direction: Direction.Right }
  ];

  const input = directions.find(({ keys }) => keys.includes(key));

  if (input) {
    inputKeyDirection = input.direction;
  }
};
