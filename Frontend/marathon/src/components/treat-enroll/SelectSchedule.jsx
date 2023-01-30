import React from "react";
import style from "./SelectSchedule.module.css";

export default function SelectSchedule({ setModalOpen, name }) {
  return (
    <div className={style.container}>
      <div className={style.inner_container}>
        <div className={style.title}>
          <span className={style.title_name}>{name} 선생님</span>
          <span className={style.title_schedule}>수업 스케쥴</span>
        </div>
        <div className={style.date_header}>
          <button className={style.button}>이전</button>
          <span className={style.date_text}>2023.01.16 ~ 01.22</span>
          <button className={style.button}>다음</button>
        </div>
        <div className={style.date_content}></div>
      </div>
    </div>
  );
}
