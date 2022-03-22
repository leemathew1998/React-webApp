import React, { useState, useEffect } from "react";
import { Mywarpper } from "./style";
import { Avatar, Card, Tabs, Badge } from "antd-mobile";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createNewUser } from "../../store/action/index";
import Creat from "./Creat";
import Mycreat from "./Mycreat";
import Setting from "./Setting";
const My = () => {
  const [username, setUsername] = useState("点击登录");
  const [useravatar, setUserAvatar] = useState("");
  const dispatch = useDispatch();
  const user_reducer = useSelector((state: any) => {
    return state.user_reducer;
  });
  const [activeKey, setActiveKey] = useState("mycreat");
  const navigete = useNavigate();
  const location = useLocation();
  const user_data: any = location.state;
  const localStorage_data: any = localStorage.getItem("user_info");
  const login = () => {
    navigete("/my/login");
  };
  const changeActiveKey = (valus: any) => {
    setActiveKey(valus);
  };
  useEffect(() => {
    if (user_data) {
      const url = `http://1.15.125.141:3007/downloadavatar?name=${user_data.user_avatar}`;
      setUsername(user_data.user_name);
      setUserAvatar(url);
    } else if (user_reducer.user_id) {
      const url = `http://1.15.125.141:3007/downloadavatar?name=${user_reducer.user_avatar}`;
      setUsername(user_reducer.user_name);
      setUserAvatar(url);
    } else if (localStorage_data) {
      const user_info = JSON.parse(localStorage_data);
      dispatch(createNewUser(user_info));
      const url = `http://1.15.125.141:3007/downloadavatar?name=${user_info.user_avatar}`;
      setUsername(user_info.user_name);
      setUserAvatar(url);
    }
  }, []);
  return (
    <Mywarpper>
      <Card className="card">
        <a onClick={login}>
          <Avatar className="avatar" src={useravatar} />
          <div className="username">{username}</div>
        </a>
      </Card>
      <Tabs activeKey={activeKey} onChange={changeActiveKey}>
        <Tabs.Tab title="我的" key="mycreat">
          <Mycreat activeKey={activeKey} />
        </Tabs.Tab>
        <Tabs.Tab title="创作" key="creat">
          <Creat func={changeActiveKey} />
        </Tabs.Tab>
        <Tabs.Tab
          title={
            <Badge content="1" style={{ "--right": "-10px", "--top": "8px" }}>
              设置
            </Badge>
          }
          key="setting"
        >
          <Setting />
        </Tabs.Tab>
      </Tabs>
    </Mywarpper>
  );
};
export default My;
