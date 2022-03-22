import React, { useState, useEffect, useContext } from "react";
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
    changeFooter(path.slice(1));
  }, []);

  const changeFooter = (e: any) => {
    console.log(e);
    setActiveKey(e);
    if (e == location.pathname.slice(1)) {
      console.log("need reload");
      navigate("/");
      // navigate(e);
    }
    navigate(e);
  };
  return (
    <FooterWapper>
      <TabBar
        className="footer"
        activeKey={activeKey}
        onChange={changeFooter}
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
