import React, { useReducer } from "react";

export const Theme: any = React.createContext("");
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
  // console.log(action);
  switch (action.type) {
    case "dark":
      state.theme = "dark";
      return state;
    case "sun":
      state.theme = "sun";
      return state;
    default:
      return state;
  }
}

export { initState, themeReducer };
