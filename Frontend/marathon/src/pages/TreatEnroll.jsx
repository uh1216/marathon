import React from "react";
import style from "./TreatEnroll.module.css";
import DoctorContainer from "components/treat-enroll/DoctorContainer";

export default function TreatEnroll() {
  return (
    <div className={style.container}>
      <div className={style.inner_container}>
        <h1 className={style.main_title}>수업 예약하기</h1>
        <p className={style.main_content}>
          마음에 드는 재활사 선생님을 선택하고 예약하기 버튼을 눌러주세요
        </p>
      </div>
      <div>
        <DoctorContainer />
      </div>
    </div>
  );
}
