import React, { useState } from "react";
import style from "./ScheduleManage.module.css";

export default function ScheduleManage() {
  const [num, setNum] = useState(0);

  const thisDate = new Date();
  /** 금주 월요일, 일요일 구하기 */
  let thisMonday = new Date(thisDate.setDate(thisDate.getDate()) + num);
  const MondayYear = thisMonday.getFullYear();
  let MondayMonth = thisMonday.getMonth() + 1;
  if (MondayMonth < 10) MondayMonth = "0" + MondayMonth;
  let MondayDate = thisMonday.getDate();
  if (MondayDate < 10) MondayDate = "0" + MondayDate;
  thisMonday = MondayYear + "-" + MondayMonth + "-" + MondayDate;

  let thisSunday = new Date(thisDate.setDate(thisDate.getDate() + 6 + num));
  let SundayMonth = thisSunday.getMonth() + 1;
  if (SundayMonth < 10) SundayMonth = "0" + SundayMonth;
  let SundayDate = thisSunday.getDate();
  if (SundayDate < 10) SundayDate = "0" + SundayDate;

  /** 수업 스케쥴 더미데이터 */
  const teacherSchedule = [
    {
      date: "2023-01-30",
      timeTable: "00021000",
    },
    {
      date: "2023-01-31",
      timeTable: "00000210",
    },
    {
      date: "2023-02-01",
      timeTable: "10020000",
    },
    {
      date: "2023-02-02",
      timeTable: "01002010",
    },
    {
      date: "2023-02-03",
      timeTable: "00200010",
    },
  ];

  const checkSchedule = (thisDay) => {
    const found = teacherSchedule.find((e) => e.date === thisDay);
    const thisTimeTable = found.timeTable;

    const timeLlist = [];
    for (let i = 0; i < thisTimeTable.length; i++) {
      if (thisTimeTable[i] === "0") {
        timeLlist.push(<button className={style.button1}>0{i} : 00</button>);
      } else if (thisTimeTable[i] === "1") {
        timeLlist.push(<button className={style.button2}>0{i} : 00</button>);
      } else {
        timeLlist.push(
          <button className={style.button3} disabled>
            0{i} : 00
          </button>
        );
      }
    }
    return timeLlist;
  };

  return (
    <div className={style.container}>
      <div className={style.inner_container}>
        <div className={style.title}>
          <span className={style.title_name}>선생님</span>
          <span className={style.title_schedule}>수업 스케쥴</span>
        </div>
        <div className={style.date_header}>
          <button className={style.button}>이전</button>
          <span className={style.date_text}>
            {MondayYear}.{MondayMonth}.{MondayDate} ~ {SundayMonth}.{SundayDate}
          </span>
          <button className={style.button}>다음</button>
        </div>
        <div className={style.date_content}>
          <div className={style.monday}>
            <div className={style.monday_header}>{MondayDate}&#40;월&#41;</div>
          </div>
          <div className={style.monday_item}>{checkSchedule(thisMonday)}</div>
        </div>
      </div>
    </div>
  );
}
