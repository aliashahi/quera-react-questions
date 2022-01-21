import React, { useState } from "react";
import { THEME_TYPE } from "../constants";
export const ThemeContext = React.createContext({});
const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(THEME_TYPE.LIGHT);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
