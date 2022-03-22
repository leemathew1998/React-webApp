import React, { useEffect, useState, useContext } from "react";
import { NavBar, Space, Toast } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderWapper } from "./style";
import { Theme, darkTheme, sunTheme } from "../../pages/Context";
import { AddOutline } from "antd-mobile-icons";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch }: any = useContext(Theme);
  const [navbar, setNavbar]: any = useState({});
  const creatgroup = () => {
    navigate("/group/creatgroup");
  };

  const right = (
    <div style={{ fontSize: 24 }} onClick={creatgroup}>
      <Space style={{ "--gap": "16px" }}>
        {location.pathname == "/group" ? <AddOutline /> : ""}
      </Space>
    </div>
  );
  const back = () => {
    if (
      location.pathname == "/group/creatgroup" ||
      location.pathname == "/group/infogroup"
    ) {
      navigate("/group");
    }
    Toast.show({
      content: "点击了返回区域",
      duration: 1000,
    });
  };
  useEffect(() => {
    if (location.pathname == "/group") {
      setNavbar({
        back: null,
        onBack: back,
        right: right,
        title: "小组",
      });
    } else if (location.pathname == "/group/creatgroup") {
      setNavbar({
        back: "后退",
        onBack: back,
        right: right,
        title: "小组",
      });
    } else if (location.pathname == "/group/infogroup") {
      setNavbar({
        back: "后退",
        onBack: back,
        right: right,
        title: "小组",
      });
    } else if (location.pathname == "/home") {
      setNavbar({
        back: null,
        onBack: back,
        right: null,
        title: "首页",
      });
    } else if (location.pathname == "/discover") {
      setNavbar({
        back: null,
        onBack: back,
        right: null,
        title: "发现",
      });
    } else if (location.pathname == "/my") {
      setNavbar({
        back: null,
        onBack: back,
        right: null,
        title: "个人",
      });
    }
  }, [location.pathname]);
  return (
    <div>
      <NavBar
        back={navbar.back}
        onBack={navbar.onBack}
        className="navbar"
        right={navbar.right}
        style={state.theme == "sun" ? sunTheme : darkTheme}
      >
        {navbar.title}
      </NavBar>
    </div>
  );
};
export default Header;
