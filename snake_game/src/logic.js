import { EAST, NORTH, SOUTH, WEST } from "./initialState";

// your logic for game here
export const ACTIONS = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
  NEW_FOOD: "new_food",
  EAT_FOOD: "eat_food",
  MOVE: "MOVE",
};

const moveByValue = (y, value, range) => {
  const v = y + value;
  if (v < 0) return range - v - 2;
  else if (v >= range) return v - range;
  else return v;
};

const randomNewApplePosition = (snake, rows, cols) => {
  while (true) {
    const x = Math.floor(Math.random() * cols);
    const y = Math.floor(Math.random() * rows);
    if (!snake.find((i) => i.x == x && i.y == y)) return { x, y };
  }
};

export function updateSnakePosition(snake, direction, apple, rows, cols) {
  for (let i = 0; i < snake.length; i++) {
    if (i != snake.length - 1) {
      snake[i] = {
        ...snake[i + 1],
      };
    } else {
      snake[i] = {
        x: moveByValue(snake[i].x, direction.x, cols),
        y: moveByValue(snake[i].y, direction.y, rows),
      };
      if (snake[i].x == apple.x && snake[i].y == apple.y) {
        snake = [...snake, apple];
        apple = randomNewApplePosition(snake, rows, cols);
      }
    }
  }
  return { snake: [...snake], apple };
}

export function checkIsLose(snake) {
  const currentState = snake[snake.length - 1];
  for (let i = 0; i < snake.length - 1; i++)
    if (currentState.y == snake[i].y && currentState.x == snake[i].x)
      return true;
  return false;
}

export function AllowedDirection(state, action) {
  switch (action) {
    case ACTIONS.UP:
      return state.moves[0] != SOUTH;
    case ACTIONS.DOWN:
      return state.moves[0] != NORTH;
    case ACTIONS.RIGHT:
      return state.moves[0] != WEST;
    case ACTIONS.LEFT:
      return state.moves[0] != EAST;
  }
}
