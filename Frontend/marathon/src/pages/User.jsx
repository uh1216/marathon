import React from "react";
import Background from "img/gif/Fish Gif Animation.gif";
import style from "pages/User.module.css";
import { Routes, Route } from "react-router-dom";
import Login from "components/user/Login";

export default function Main() {
  return (
    <div className={style.wrap}>
      <img className={style.background} src={Background} />
      <Routes>
        <Route path="login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}
