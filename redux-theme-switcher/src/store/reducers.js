// # Reducer name should be **themeReducer**

import { THEME_TYPE } from "../constants";
import { setTheme } from "./actions";

const initial_state = {
  theme: THEME_TYPE.LIGHT,
};

export const themeReducer = (state = initial_state, action) => {
  if (action.type == THEME_TYPE.DARK || action.type == THEME_TYPE.LIGHT) {
    return setTheme(
      state.theme === THEME_TYPE.DARK ? THEME_TYPE.LIGHT : THEME_TYPE.DARK
    );
  }
  return state;
};
