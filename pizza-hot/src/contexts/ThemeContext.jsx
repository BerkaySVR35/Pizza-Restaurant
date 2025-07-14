import { React, createContext, useReducer, useState } from "react";
import { themeReducer } from "../reducers/ThemeReducer";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  //   const [color, setColor] = useState("dark");
  const [state, dispatch] = useReducer(themeReducer, {
    color: "dark",
    mode: "light",
  });

  function changeColor(color) {
    dispatch({ type: "CHANGE_COLOR", payload: color });
  }
  function changeMode(value) {
    dispatch({ type: "CHANGE_MODE", payload: value });
  }

  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
