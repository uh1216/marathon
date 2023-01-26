import React from "react";
import style from "./SignUpType.module.css";
import Doctor from "img/icon/doctor.png";
import Patient from "img/icon/patient.png";
import { useNavigate } from "react-router-dom";

export default function SignInType() {
  const navigate = useNavigate();

  return (
    <div className={style.user_box}>
      <div className={style.title}>가입 유형을 선택해주세요</div>
      <div className={style.select_box}>
        <div
          className={style.box}
          onClick={() => navigate("/user/sign-up/normal")}
        >
          <img className={style.img} src={Patient} alt="환자 아이콘" />
          <div className={style.txt}>언어재활 대상자/보호자</div>
        </div>
        <div
          className={style.box}
          onClick={() => navigate("/user/sign-up/teacher")}
        >
          <img className={style.img} src={Doctor} alt="의사 아이콘" />
          <div className={style.txt}>언어재활사 선생님</div>
        </div>
      </div>
    </div>
  );
}
