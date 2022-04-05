import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { List, Switch } from "antd-mobile";
import { Theme } from "../../Context";
import VirtualList from "./text";
const Setting = () => {
  const { state, dispatch }: any = useContext(Theme);
  const changetheme = (e: any) => {
    // console.log(state);
    if (e) {
      dispatch({
        type: "dark",
      });
    } else {
      dispatch({
        type: "sun",
      });
    }
  };

  return (
    <div>
      <List header="基础设置">
        <List.Item
          extra={
            <Switch
              defaultChecked={state.theme == "dark" ? true : false}
              onChange={changetheme}
            />
          }
        >
          暗黑模式
        </List.Item>
      </List>
      <VirtualList />
    </div>
  );
};
export default Setting;
