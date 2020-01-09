import { CANVAS_HEIGHT, CANVAS_WIDTH, FRAMES_PER_SECOND } from "./config";
import { Direction, DirectionValue } from "./prefabs/direction";
import { Food } from "./prefabs/food";
import { Frame } from "./prefabs/frame";
import { GameObject } from "./prefabs/game-object";
import { Snake } from "./prefabs/snake";

// tslint:disable-next-line: no-any
declare var window: any;

const gameObjects: GameObject[] = [];
let inputDirection: DirectionValue | null = null;

// tslint:disable-next-line: no-non-null-assertion
const scoreElement = document.getElementById("score")!;

window.setup = () => {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  frameRate(FRAMES_PER_SECOND);

  const food = new Food();
  const snake = new Snake(food);

  snake.addScoreObserver(score => (scoreElement.innerHTML = score.toString()));

  gameObjects.push(food, snake);
};

window.draw = () => {
  background(51);

  const frame: Frame = { inputDirection };

  gameObjects.forEach(gameObject => gameObject.update(frame).draw());

  inputDirection = null;
};

window.keyPressed = () => {
  switch (keyCode) {
    case UP_ARROW:
      inputDirection = Direction.Up;
      break;

    case DOWN_ARROW:
      inputDirection = Direction.Down;
      break;

    case LEFT_ARROW:
      inputDirection = Direction.Left;
      break;

    case RIGHT_ARROW:
      inputDirection = Direction.Right;
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
    inputDirection = input.direction;
  }
};
