import React from "react";
import style from "components/user/Login.module.css";

export default function Main() {
  return (
    <div className={style.user_box}>
      <div className={style.title}>환영합니다</div>
      <input type="text" className={style.input_text} placeholder="아이디" />
      <input type="text" className={style.input_text} placeholder="비밀번호" />
      <input type="checkbox" />
      아이디 기억하기
      <div>
        <div>아이디 찾기</div>
        <div>비밀번호 찾기</div>
      </div>
    </div>
  );
}
