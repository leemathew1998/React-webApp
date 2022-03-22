import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Discover = lazy(() => import("../pages/Discover"));
const Group = lazy(() => import("../pages/Group"));
const My = lazy(() => import("../pages/My"));
const Login = lazy(() => import("../pages/My/Login"));
const CreatGroup = lazy(() => import("../pages/Group/CreatGroup"));
const InfoGroup = lazy(() => import("../pages/Group/InfoGroup"));

const Home = React.lazy(() => import("../pages/Home"));
const RouterIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/home"} />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/my" element={<My />}></Route>
      <Route path="/my/login" element={<Login />}></Route>
      <Route path="/group" element={<Group />}></Route>
      <Route path="/group/creatgroup" element={<CreatGroup />}></Route>
      <Route path="/group/infogroup" element={<InfoGroup />}></Route>
      <Route path="/discover" element={<Discover />}></Route>
    </Routes>
  );
};
export default RouterIndex;
