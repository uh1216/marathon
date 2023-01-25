import React from "react";
import Background from "img/gif/Fish Gif Animation.gif";
import style from "./User.module.css";
import { Routes, Route } from "react-router-dom";
import Login from "components/user/Login";
import SignUpType from "components/user/SignUpType";
import SignUp from "components/user/SignUp";

export default function Main() {
  return (
    <div className={style.wrap}>
      <img className={style.background} src={Background} alt="배경이미지" />
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="sign-up-type" element={<SignUpType />}></Route>
        <Route path="sign-up/:type" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}
