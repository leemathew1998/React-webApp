import React, { useState, useContext, useEffect } from "react";
import { List, Switch } from "antd-mobile";
import { Theme } from "../../Context";
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
        <List.Item extra="未开启" clickable>
          大字号模式
        </List.Item>
        <List.Item description="管理已授权的产品和设备" clickable>
          授权管理
        </List.Item>
        <List.Item title="这里是标题">这里是主信息</List.Item>
      </List>
    </div>
  );
};
export default Setting;
