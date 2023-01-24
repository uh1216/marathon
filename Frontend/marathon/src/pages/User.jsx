import React from "react";
import Background from "img/gif/Fish Gif Animation.gif";
<<<<<<< HEAD
import style from "pages/User.module.css";
import { Routes, Route } from "react-router-dom";
import Login from "components/user/Login";
=======
import style from "./User.module.css";
import { Routes, Route } from "react-router-dom";
import Login from "components/user/Login";
import SignUpType from "components/user/SignUpType";
import SignUp from "components/user/SignUp";
>>>>>>> 009e5953bd219379dacfb5cf9771861ca8499f90

export default function Main() {
  return (
    <div className={style.wrap}>
<<<<<<< HEAD
      <img className={style.background} src={Background} />
      <Routes>
        <Route path="login" element={<Login />}></Route>
=======
      <img className={style.background} src={Background} alt="배경이미지" />
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="sign-up-type" element={<SignUpType />}></Route>
        <Route path="sign-up/:type" element={<SignUp />}></Route>
>>>>>>> 009e5953bd219379dacfb5cf9771861ca8499f90
      </Routes>
    </div>
  );
}
