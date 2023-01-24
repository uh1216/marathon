import React, { useState } from "react";
import style from "./Login.module.css";
import Kakao_login_medium_wide from "img/button/kakao_login_medium_wide.png";
import ModalFindId from "./ModalFindId";
import ModalFindPwd from "./ModalFindPwd";

export default function Main() {
  // 모달창 노출 여부 state
  const [modalFindIdOpen, setModalFindIdOpen] = useState(false);
  const [modalFindPwdOpen, setModalFindPwdOpen] = useState(false);

  // 모달창 노출
  const showModalFindId = () => {
    setModalFindIdOpen(true);
  };
  const showModalFindPwd = () => {
    setModalFindPwdOpen(true);
  };

  return (
    <div className={style.user_box}>
      <div className={style.title}>환영합니다</div>
      <input className={style.input_text} type="text" placeholder="아이디" />
      <input className={style.input_text} type="text" placeholder="비밀번호" />
      <div>
        <input
          className={style.memorize_id_box}
          type="checkbox"
          id="memorize_id_box"
        />
        <label className={style.memorize_id_txt} htmlFor="memorize_id_box">
          아이디 기억하기
        </label>
      </div>
      <div>
        <button className={`${style.btn} ${style.login}`}>로그인</button>
        <img
          className={style.btn}
          src={Kakao_login_medium_wide}
          alt="카카오 로그인 버튼"
        />
      </div>
      <div className={style.find}>
        <div className={style.inline} onClick={showModalFindId}>
          아이디 찾기
        </div>

        <div className={style.inline} onClick={showModalFindPwd}>
          비밀번호 찾기
        </div>
        {modalFindIdOpen && <ModalFindId setModalOpen={setModalFindIdOpen} />}
        {modalFindPwdOpen && (
          <ModalFindPwd setModalOpen={setModalFindPwdOpen} />
        )}
      </div>
    </div>
  );
}
