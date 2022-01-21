import { useEffect, useReducer } from "react";
import { EAST, INIT_STATE, NORTH, SOUTH, WEST } from "../initialState";
import {
  ACTIONS,
  AllowedDirection,
  checkIsLose,
  updateSnakePosition,
} from "../logic";

const reducerFn = (state, action) => {
  if (action != ACTIONS.MOVE && !AllowedDirection(state, action)) return state;
  switch (action) {
    case ACTIONS.UP:
      state = {
        ...state,
        moves: [NORTH],
      };
      return state;
    case ACTIONS.DOWN:
      state = {
        ...state,
        moves: [SOUTH],
      };
      return state;
    case ACTIONS.RIGHT:
      state = {
        ...state,
        moves: [EAST],
      };
      return state;
    case ACTIONS.LEFT:
      state = {
        ...state,
        moves: [WEST],
      };
      return state;
    case ACTIONS.MOVE:
      state = {
        ...state,
        ...updateSnakePosition(
          state.snake,
          state.moves[0],
          state.apple,
          state.rows,
          state.cols
        ),
      };
      if (checkIsLose(state.snake)) {
        state = INIT_STATE;
        return INIT_STATE;
      }
      return state;
  }
  return INIT_STATE;
};
let intervalRef = null;
export default function useSnake() {
  const [state, dispatch] = useReducer(reducerFn, INIT_STATE);
  const onKeyBoardDown = (e) => {
    switch (e.code) {
      case "ArrowUp":
        dispatch(ACTIONS.UP);
        break;
      case "ArrowDown":
        dispatch(ACTIONS.DOWN);
        break;
      case "ArrowLeft":
        dispatch(ACTIONS.LEFT);
        break;
      case "ArrowRight":
        dispatch(ACTIONS.RIGHT);
        break;
    }
  };

  const noActionCalled = () => {
    dispatch(ACTIONS.MOVE);
  };

  useEffect(() => {
    intervalRef = setInterval(() => {
      noActionCalled();
    }, 4 * INIT_STATE.speed + INIT_STATE.speed - 1);
    window.document.addEventListener("keydown", onKeyBoardDown);
    return () => {
      clearInterval(intervalRef);
      window.document.removeEventListener("keydown", onKeyBoardDown);
    };
  }, []);
  return state;
}
