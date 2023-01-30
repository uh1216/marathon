import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeNowSideNav } from "stores/toggle.store";
import style from "./Schedule.module.css";

export default function Schedule() {
  const dispatch = useDispatch();
  const data = {
    firstDateInfo: "1675061240413",
    reservation: [
      {
        seq: "12",
        name: "김삼순",
        date: "2023-01-30",
        dayOfWeek: "월",
        time: "9",
      },
      {
        seq: "13",
        name: "김사순",
        date: "2023-02-01",
        dayOfWeek: "수",
        time: "16",
      },
      {
        seq: "14",
        name: "김오순",
        date: "2023-02-08",
        dayOfWeek: "수",
        time: "15",
      },
      {
        seq: "15",
        name: "김육순",
        date: "2023-02-17",
        dayOfWeek: "금",
        time: "11",
      },
    ],
  };
  const [nowPage, setNowPage] = useState(0);

  useEffect(() => {
    // 사이드 Nav 업데이트
    dispatch(changeNowSideNav("재활 일정"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className={style.side_inner_div}>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: "1" }} />
          <div className={style.arrow_div}>
            <button
              className={style.button}
              style={{ marginRight: "10px" }}
              onClick={() => {
                nowPage > 0 ? setNowPage(nowPage - 1) : setNowPage(nowPage);
              }}
            >
              ◁이전
            </button>
            {new Date(
              Number(data.firstDateInfo) + nowPage * 86400000 * 7
            ).getFullYear()}
            .
            {new Date(
              Number(data.firstDateInfo) + nowPage * 86400000 * 7
            ).getMonth() + 1}
            .
            {new Date(
              Number(data.firstDateInfo) + nowPage * 86400000 * 7
            ).getDate()}{" "}
            ~{" "}
            {new Date(
              Number(data.firstDateInfo) + nowPage * 86400000 * 7 + 86400000 * 6
            ).getFullYear()}
            .
            {new Date(
              Number(data.firstDateInfo) + nowPage * 86400000 * 7 + 86400000 * 6
            ).getMonth() + 1}
            .
            {new Date(
              Number(data.firstDateInfo) + nowPage * 86400000 * 7 + 86400000 * 6
            ).getDate()}
            <button
              className={style.button}
              style={{ marginLeft: "10px" }}
              onClick={() => {
                nowPage < 2 ? setNowPage(nowPage + 1) : setNowPage(nowPage);
              }}
            >
              이후▷
            </button>
          </div>
          <div style={{ flexGrow: "1" }} />
        </div>
      </div>
      <div className={style.middle_box}>
        <div className={style.calender_div}>
          <div className={style.calender_top_div}>
            {new Date(
              Number(data.firstDateInfo) + nowPage * 86400000 * 7
            ).getDate()}
            일 (월)
          </div>
          <div className={style.calender_bottom_div}>
            {data.reservation.map((reservedDay, idx) => {
              if (
                new Date(reservedDay.date).getDate() ===
                new Date(
                  Number(data.firstDateInfo) + nowPage * 86400000 * 7
                ).getDate()
              ) {
                return (
                  <span key={idx}>
                    {reservedDay.name} 선생님 {reservedDay.time}시
                  </span>
                );
              }
            })}
          </div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div}>
            {new Date(
              Number(data.firstDateInfo) + nowPage * 86400000 * 7 + 86400000 * 1
            ).getDate()}
            일 (화)
          </div>
          <div className={style.calender_bottom_div}></div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div}>
            {new Date(
              Number(data.firstDateInfo) + nowPage * 86400000 * 7 + 86400000 * 2
            ).getDate()}
            일 (수)
          </div>
          <div className={style.calender_bottom_div}></div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div}>
            {new Date(
              Number(data.firstDateInfo) + nowPage * 86400000 * 7 + 86400000 * 3
            ).getDate()}
            일 (목)
          </div>
          <div className={style.calender_bottom_div}></div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div}>
            {new Date(
              Number(data.firstDateInfo) + nowPage * 86400000 * 7 + 86400000 * 4
            ).getDate()}
            일 (금)
          </div>
          <div className={style.calender_bottom_div}></div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div}>
            {new Date(
              Number(data.firstDateInfo) + nowPage * 86400000 * 7 + 86400000 * 5
            ).getDate()}
            일 (토)
          </div>
          <div className={style.calender_bottom_div}></div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div}>
            {new Date(
              Number(data.firstDateInfo) + nowPage * 86400000 * 7 + 86400000 * 6
            ).getDate()}
            일 (일)
          </div>
          <div
            className={style.calender_bottom_div}
            style={{ borderRight: "none" }}
          ></div>
        </div>
      </div>
    </>
  );
}
