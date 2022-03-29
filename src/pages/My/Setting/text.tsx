import React, { useReducer, useContext, useCallback, useMemo } from "react";

const UPDATE_COLOR = "UPDATE_COLOR";

type StateType = {
  color: string;
};

type ActionType = {
  type: string;
  color: string;
};

type MixStateAndDispatch = {
  state: StateType;
  dispatch?: React.Dispatch<ActionType>;
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return { color: action.color };
    default:
      return state;
  }
};

const ColorContext = React.createContext<MixStateAndDispatch>({
  state: { color: "black" },
});

const Show = () => {
  const { state, dispatch } = useContext(ColorContext);
  return (
    <div style={{ color: state.color }}>
      当前字体颜色为: {state.color}
      <button
        onClick={() =>
          dispatch && dispatch({ type: UPDATE_COLOR, color: "red" })
        }
      >
        红色
      </button>
      <button
        onClick={() =>
          dispatch && dispatch({ type: UPDATE_COLOR, color: "green" })
        }
      >
        绿色
      </button>
    </div>
  );
};

const Example = ({ initialColor = "#000000" }) => {
  const [state, dispatch] = useReducer(reducer, { color: initialColor });
  const callback = () => {
    console.log("aaaa");
    // return "aaaaa";
  };

  const memoizedCallback = useCallback(callback, []);
  return (
    <ColorContext.Provider value={{ state, dispatch }}>
      <div>
        <Show />
        <button
          onClick={() =>
            dispatch && dispatch({ type: UPDATE_COLOR, color: "blue" })
          }
        >
          蓝色
        </button>
        <button
          onClick={() =>
            dispatch && dispatch({ type: UPDATE_COLOR, color: "lightblue" })
          }
        >
          轻绿色
        </button>
        <button onClick={memoizedCallback}>aaa</button>
        {/* <div>{memoizedCallback}</div> */}
      </div>
    </ColorContext.Provider>
  );
};

export default Example;
