import React, { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FooterWapper } from "./style";
import { Badge, TabBar } from "antd-mobile";
import {
  AppOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import { Theme, darkTheme, sunTheme } from "../../pages/Context";
const Footer = () => {
  const { state, dispatch }: any = useContext(Theme);
  const navigate = useNavigate();
  const tabs = [
    {
      key: "home",
      title: "首页",
      icon: <AppOutline />,
      badge: "",
    },
    {
      key: "discover",
      title: "发现",
      icon: <UnorderedListOutline />,
      badge: "",
    },
    {
      key: "group",
      title: "小组",
      icon: <MessageFill />,
      badge: "",
    },
    {
      key: "my",
      title: "个人中心",
      icon: <UserOutline />,
    },
  ];
  const location = useLocation();
  const path = location.pathname;
  const [activeKey, setActiveKey] = useState("home");
  useEffect(() => {
    changeFooterMemo(path.slice(1));
    // console.log('render')
  }, []);

  const changeFooterMemo = (e: any) => {
    console.log(e);
    // navigate(path.slice(1));
    // changeFooter()
    setActiveKey(e);
    // setActiveKey(path.slice(1));
    navigate(e);
  };

  return (
    <FooterWapper>
      <TabBar
        className="footer"
        activeKey={activeKey}
        onChange={changeFooterMemo}
        style={state.theme == "sun" ? sunTheme : darkTheme}
      >
        {tabs.map((item) => (
          <TabBar.Item
            key={item.key}
            icon={item.icon}
            title={item.title}
            badge={item.badge}
          />
        ))}
      </TabBar>
    </FooterWapper>
  );
};
export default Footer;
