import React from "react";
import style from "./SelectSchedule.module.css";

export default function SelectSchedule({ setModalOpen, name }) {
  return (
    <div className={style.container}>
      <div className={style.inner_container}>
        <div className={style.title}></div>
        <span className={style.title_name}>{name} 선생님</span>
        <span className={style.title_schedule}>수업 스케쥴</span>
      </div>
      <div></div>
    </div>
  );
}
