import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { $ } from "util/axios";
import style from "./ScheduleManage.module.css";

export default function ScheduleManage() {
  const state = useSelector((state) => state);
  const [cnt, setCnt] = useState(0);
  const [teacherSchedule, setTeacherSchedule] = useState();
  const newData = {
    list: teacherSchedule,
  };

  /** API GET 함수 */
  const { isLoading, data, isError, error } = useQuery(["TimeTable"], () =>
    $.get(`/doctor-treatment/table`)
  );

  /** API PUT 함수 */
  const res_put = () => {
    return $.put(`/doctor-treatment/table`, newData);
  };

  const { mutate: onSubmit } = useMutation(res_put, {
    onSuccess: () => {
      alert("저장되었습니다.");
    },
    onError: () => {
      alert("실패했습니다.");
    },
  });

  const totalThisDate = (num) => {
    let today = new Date(
      Number(data.data.firstDateInfo) + (num + cnt * 7) * 86400000
    );
    let todayYear = today.getFullYear();
    let todayMonth = today.getMonth() + 1;
    if (todayMonth < 10) todayMonth = "0" + todayMonth;
    let todayDate = today.getDate();
    if (todayDate < 10) todayDate = "0" + todayDate;
    today = todayYear + "-" + todayMonth + "-" + todayDate;
    return today.toString();
  };

  const thisYear = (num) => {
    let today = new Date(
      Number(data.data.firstDateInfo) + (num + cnt * 7) * 86400000
    );
    let todayYear = today.getFullYear();
    return todayYear.toString();
  };

  const thisMonth = (num) => {
    let today = new Date(
      Number(data.data.firstDateInfo) + (num + cnt * 7) * 86400000
    );
    let todayMonth = today.getMonth() + 1;
    if (todayMonth < 10) todayMonth = "0" + todayMonth;
    return todayMonth.toString();
  };

  const thisDay = (num) => {
    let today = new Date(
      Number(data.data.firstDateInfo) + (num + cnt * 7) * 86400000
    );
    let todayDate = today.getDate();
    if (todayDate < 10) todayDate = "0" + todayDate;
    return todayDate.toString();
  };

  const checkSchedule = (thisDay) => {
    const found = data.data.list.find((e) => e.localDate === thisDay);
    const thisTimeTable = found.bitDate;

    const timeLlist = [];
    for (let i = 0; i < thisTimeTable.length; i++) {
      /** 9시 수업인 경우 09:00로 표기하기 위해 따로 구분
       * 11시 다음 수업이 13시 이므로 11시, 12시도 따로 구분*/
      if (i === 0) {
        timeLlist.push(
          <button
            key={i}
            className={
              (thisTimeTable[i] === "0" && style.button0) ||
              (thisTimeTable[i] === "1" && style.button1) ||
              (thisTimeTable[i] === "2" && style.button2)
            }
            name={thisDay}
            value={i + thisTimeTable[i]}
            onClick={onClick}
            disabled={thisTimeTable[i] === "2" ? true : false}
          >
            0{i + 9} : 00
          </button>
        );
      } else if (i === 1 || i === 2) {
        timeLlist.push(
          <button
            key={i}
            className={
              (thisTimeTable[i] === "0" && style.button0) ||
              (thisTimeTable[i] === "1" && style.button1) ||
              (thisTimeTable[i] === "2" && style.button2)
            }
            name={thisDay}
            value={i + thisTimeTable[i]}
            onClick={onClick}
            disabled={thisTimeTable[i] === "2" ? true : false}
          >
            {i + 9} : 00
          </button>
        );
      } else {
        timeLlist.push(
          <button
            key={i}
            className={
              (thisTimeTable[i] === "0" && style.button0) ||
              (thisTimeTable[i] === "1" && style.button1) ||
              (thisTimeTable[i] === "2" && style.button2)
            }
            name={thisDay}
            value={i + thisTimeTable[i]}
            onClick={onClick}
            disabled={thisTimeTable[i] === "2" ? true : false}
          >
            {i + 10} : 00
          </button>
        );
      }
    }
    return timeLlist;
  };

  /** 일정 예약 가능 여부 변경 함수 */
  const onClick = (e) => {
    /** e.target.value[0] : 시간대 index, e.target.value[2] : 예약 여부 */
    let reserve = "";
    if (e.target.value[1] === "0") {
      reserve = "1";
    } else if (e.target.value[1] === "1") {
      reserve = "0";
    }

    let findItem = data.data.list.find((t) => t.localDate === e.target.name);
    let newTimeTable = [];
    for (let i = 0; i < 8; i++) {
      i.toString() === e.target.value[0]
        ? newTimeTable.push(reserve)
        : newTimeTable.push(findItem.bitDate[i]);
    }
    newTimeTable = newTimeTable.join("");

    let newSchedule = [...data.data.list];
    let findorigin = newSchedule.find((t) => t.localDate === e.target.name);
    findorigin.bitDate = newTimeTable;
    setTeacherSchedule(newSchedule);
  };

  /** 다음 일정 확인 */
  const nextWeek = () => {
    if (cnt < 2) {
      setCnt(cnt + 1);
    }
  };

  /** 이전 일정 확인 */
  const prevWeek = () => {
    if (cnt > 0) {
      setCnt(cnt - 1);
    }
  };

  return (
    <>
      {!isLoading && (
        <div className={style.container}>
          <div className={style.inner_container}>
            <div className={style.title}>
              <span className={style.title_name}>
                {state.loginUser.userName}{" "}
              </span>
              <span className={style.title_position}>선생님</span>
              <span className={style.title_schedule}>수업 스케쥴</span>
            </div>
            <div className={style.content}>
              <div className={style.date_header}>
                <button className={style.button} onClick={prevWeek}>
                  ◁ 이전
                </button>
                <span className={style.date_text}>
                  {thisYear(0)}.{thisMonth(0)}.{thisDay(0)} ~ {thisYear(6)}.
                  {thisMonth(6)}.{thisDay(6)}
                </span>
                <button className={style.button} onClick={nextWeek}>
                  다음 ▷
                </button>
              </div>
              <div className={style.date_item}>
                <div className={style.day_start}>
                  <div className={style.day_header}>
                    {thisDay(0)} &#40;월&#41;
                  </div>
                  <div className={style.day_item}>
                    {checkSchedule(totalThisDate(0))}
                  </div>
                </div>
                <div className={style.day}>
                  <div className={style.day_header}>
                    {thisDay(1)} &#40;화&#41;
                  </div>
                  <div className={style.day_item}>
                    {checkSchedule(totalThisDate(1))}
                  </div>
                </div>
                <div className={style.day}>
                  <div className={style.day_header}>
                    {thisDay(2)} &#40;수&#41;
                  </div>
                  <div className={style.day_item}>
                    {checkSchedule(totalThisDate(2))}
                  </div>
                </div>
                <div className={style.day}>
                  <div className={style.day_header}>
                    {thisDay(3)} &#40;목&#41;
                  </div>
                  <div className={style.day_item}>
                    {checkSchedule(totalThisDate(3))}
                  </div>
                </div>
                <div className={style.day}>
                  <div className={style.day_header}>
                    {thisDay(4)} &#40;금&#41;
                  </div>
                  <div className={style.day_item}>
                    {checkSchedule(totalThisDate(4))}
                  </div>
                </div>
                <div className={style.day}>
                  <div className={style.day_header} style={{ color: "blue" }}>
                    {thisDay(5)} &#40;토&#41;
                  </div>
                  <div className={style.day_item}>
                    {checkSchedule(totalThisDate(5))}
                  </div>
                </div>
                <div className={style.day_end}>
                  <div className={style.day_header} style={{ color: "red" }}>
                    {thisDay(6)} &#40;일&#41;
                  </div>
                  <div className={style.day_item}>
                    {checkSchedule(totalThisDate(6))}
                  </div>
                </div>
              </div>
              <div className={style.save_button_div}>
                <button className={style.save_button} onClick={onSubmit}>
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
