import React, { useReducer } from "react";

export const Theme: any = React.createContext({ state: { theme: "sun" } });
export const darkTheme = {
  color: "#fff",
  backgroundColor: "#000",
};
export const sunTheme = {
  color: "#000",
  backgroundColor: "#eee",
};

// 定义初始化值
const initState = {
  theme: "sun",
};
// 定义state[业务]处理逻辑 reducer函数
function themeReducer(state: any, action: any) {
  switch (action.type) {
    case "dark":
      return { theme: action.type };
    case "sun":
      return { theme: action.type };
    default:
      return state;
  }
}

export { initState, themeReducer };
