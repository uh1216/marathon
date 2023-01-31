import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNowSideNav } from "stores/toggle.store";
import style from "./Schedule.module.css";

export default function Schedule() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
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
        seq: "14",
        name: "김오순",
        date: "2023-01-30",
        dayOfWeek: "월",
        time: "15",
      },
      {
        seq: "13",
        name: "김사순",
        date: "2023-01-30",
        dayOfWeek: "월",
        time: "16",
      },
      {
        seq: "18",
        name: "김하순",
        date: "2023-02-11",
        dayOfWeek: "토",
        time: "11",
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

  // 날짜의 연산을 도와준다. 하루가 지나면 day + 1을 주입한다.
  const calDate = (day) => {
    return new Date(
      Number(data.firstDateInfo) + (nowPage * 7 + day) * 86400000
    );
  };

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
              className={
                nowPage !== 0
                  ? style.button
                  : style.button + " " + style.noButton
              }
              style={{ marginRight: "10px", paddingRight: "10px" }}
              onClick={() => {
                nowPage > 0 ? setNowPage(nowPage - 1) : setNowPage(nowPage);
              }}
            >
              ◁이전
            </button>
            {calDate(0).getFullYear()}.{calDate(0).getMonth() + 1}.
            {calDate(0).getDate()} ~ {calDate(6).getFullYear()}.
            {calDate(6).getMonth() + 1}.{calDate(6).getDate()}
            <button
              className={
                nowPage !== 2
                  ? style.button
                  : style.button + " " + style.noButton
              }
              style={{ marginLeft: "10px", paddingLeft: "10px" }}
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
            {calDate(0).getDate()}일 (월)
          </div>
          <div className={style.calender_bottom_div}>
            {data.reservation.map((reservedDay) => {
              if (
                new Date(reservedDay.date).getDate() === calDate(0).getDate()
              ) {
                return (
                  <div key={reservedDay.seq} className={style.reserve_info}>
                    <div className={style.green_circle}></div>
                    <div className={style.sentence}>
                      {reservedDay.name}
                      {state.loginUser.userRole === "patient"
                        ? " 선생님 "
                        : " 님 "}
                      {reservedDay.time}시
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div}>
            {calDate(1).getDate()}일 (화)
          </div>
          <div className={style.calender_bottom_div}>
            {data.reservation.map((reservedDay) => {
              if (
                new Date(reservedDay.date).getDate() === calDate(1).getDate()
              ) {
                return (
                  <div key={reservedDay.seq} className={style.reserve_info}>
                    <div className={style.green_circle}></div>
                    <div className={style.sentence}>
                      {reservedDay.name}
                      {state.loginUser.userRole === "patient"
                        ? " 선생님 "
                        : " 님 "}
                      {reservedDay.time}시
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div}>
            {calDate(2).getDate()}일 (수)
          </div>
          <div className={style.calender_bottom_div}>
            {data.reservation.map((reservedDay) => {
              if (
                new Date(reservedDay.date).getDate() === calDate(2).getDate()
              ) {
                return (
                  <div key={reservedDay.seq} className={style.reserve_info}>
                    <div className={style.green_circle}></div>
                    <div className={style.sentence}>
                      {reservedDay.name}
                      {state.loginUser.userRole === "patient"
                        ? " 선생님 "
                        : " 님 "}
                      {reservedDay.time}시
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div}>
            {calDate(3).getDate()}일 (목)
          </div>
          <div className={style.calender_bottom_div}>
            {data.reservation.map((reservedDay) => {
              if (
                new Date(reservedDay.date).getDate() === calDate(3).getDate()
              ) {
                return (
                  <div key={reservedDay.seq} className={style.reserve_info}>
                    <div className={style.green_circle}></div>
                    <div className={style.sentence}>
                      {reservedDay.name}
                      {state.loginUser.userRole === "patient"
                        ? " 선생님 "
                        : " 님 "}
                      {reservedDay.time}시
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div}>
            {calDate(4).getDate()}일 (금)
          </div>
          <div className={style.calender_bottom_div}>
            {data.reservation.map((reservedDay) => {
              if (
                new Date(reservedDay.date).getDate() === calDate(4).getDate()
              ) {
                return (
                  <div key={reservedDay.seq} className={style.reserve_info}>
                    <div className={style.green_circle}></div>
                    <div className={style.sentence}>
                      {reservedDay.name}
                      {state.loginUser.userRole === "patient"
                        ? " 선생님 "
                        : " 님 "}
                      {reservedDay.time}시
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div} style={{ color: "blue" }}>
            {calDate(5).getDate()}일 (토)
          </div>
          <div className={style.calender_bottom_div}>
            {data.reservation.map((reservedDay) => {
              if (
                new Date(reservedDay.date).getDate() === calDate(5).getDate()
              ) {
                return (
                  <div key={reservedDay.seq} className={style.reserve_info}>
                    <div className={style.green_circle}></div>
                    <div className={style.sentence}>
                      {reservedDay.name}
                      {state.loginUser.userRole === "patient"
                        ? " 선생님 "
                        : " 님 "}
                      {reservedDay.time}시
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div} style={{ color: "red" }}>
            {calDate(6).getDate()}일 (일)
          </div>
          <div
            className={style.calender_bottom_div}
            style={{ borderRight: "none" }}
          >
            {" "}
            {data.reservation.map((reservedDay) => {
              if (
                new Date(reservedDay.date).getDate() === calDate(6).getDate()
              ) {
                return (
                  <div key={reservedDay.seq} className={style.reserve_info}>
                    <div className={style.green_circle}></div>
                    <div className={style.sentence}>
                      {reservedDay.name}
                      {state.loginUser.userRole === "patient"
                        ? " 선생님 "
                        : " 님 "}
                      {reservedDay.time}시
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}
