import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNowSideNav } from "stores/toggle.store";
import Board from "components/common/Board";
import Pagination from "components/common/Pagination";
import Modal from "components/common/Modal";
import style from "./Schedule.module.css";
import ScheduleModal from "./ScheduleModal";

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
        url: "https://img1.daumcdn.net/thumb/C500x500/?fname=http://t1.daumcdn.net/brunch/service/user/6qYm/image/eAFjiZeA-fGh8Y327AH7oTQIsxQ.png",
        dayOfWeek: "월",
        time: "9",
      },
      {
        seq: "14",
        name: "김오순",
        date: "2023-01-30",
        url: "https://img1.daumcdn.net/thumb/C500x500/?fname=http://t1.daumcdn.net/brunch/service/user/6qYm/image/eAFjiZeA-fGh8Y327AH7oTQIsxQ.png",
        dayOfWeek: "월",
        time: "15",
      },
      {
        seq: "13",
        name: "김사순",
        date: "2023-01-30",
        url: "https://img1.daumcdn.net/thumb/C500x500/?fname=http://t1.daumcdn.net/brunch/service/user/6qYm/image/eAFjiZeA-fGh8Y327AH7oTQIsxQ.png",
        dayOfWeek: "월",
        time: "16",
      },
      {
        seq: "18",
        name: "김하순",
        date: "2023-02-11",
        url: "https://img1.daumcdn.net/thumb/C500x500/?fname=http://t1.daumcdn.net/brunch/service/user/6qYm/image/eAFjiZeA-fGh8Y327AH7oTQIsxQ.png",
        dayOfWeek: "토",
        time: "11",
      },
      {
        seq: "15",
        name: "김육순",
        date: "2023-02-17",
        url: "https://img1.daumcdn.net/thumb/C500x500/?fname=http://t1.daumcdn.net/brunch/service/user/6qYm/image/eAFjiZeA-fGh8Y327AH7oTQIsxQ.png",
        dayOfWeek: "금",
        time: "11",
      },
    ],
  };

  let dumy = [];
  for (let i = 1; i <= 5; i++) {
    const newContents = {
      historySeq: i,
      doctorName: "김덕배",
      dateTime: "2023-02-03",
      day: "금",
    };
    dumy = [newContents, ...dumy];
  }

  // 달력에 사용하는 페이지 데이터.
  const [nowPage, setNowPage] = useState(0);
  const headRow =
    state.loginUser.userRole === "patient"
      ? ["수업일", "선생님", "수업상세"]
      : ["수업일", "환자", "수업상세"];

  // 모달창에 들어갈 프로필 // 수업 정보
  const [modalData, setModalData] = useState();

  // 모달창 노출 여부 state
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                  <div
                    key={reservedDay.seq}
                    className={style.reserve_info}
                    onClick={() => {
                      setModalData(reservedDay);
                      setIsModalOpen(true);
                    }}
                  >
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
              } else return null;
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
                  <div
                    key={reservedDay.seq}
                    className={style.reserve_info}
                    onClick={() => {
                      setModalData(reservedDay);
                      setIsModalOpen(true);
                    }}
                  >
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
              } else return null;
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
                  <div
                    key={reservedDay.seq}
                    className={style.reserve_info}
                    onClick={() => {
                      setModalData(reservedDay);
                      setIsModalOpen(true);
                    }}
                  >
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
              } else return null;
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
                  <div
                    key={reservedDay.seq}
                    className={style.reserve_info}
                    onClick={() => {
                      setModalData(reservedDay);
                      setIsModalOpen(true);
                    }}
                  >
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
              } else return null;
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
                  <div
                    key={reservedDay.seq}
                    className={style.reserve_info}
                    onClick={() => {
                      setModalData(reservedDay);
                      setIsModalOpen(true);
                    }}
                  >
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
              } else return null;
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
                  <div
                    key={reservedDay.seq}
                    className={style.reserve_info}
                    onClick={() => {
                      setModalData(reservedDay);
                      setIsModalOpen(true);
                    }}
                  >
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
              } else return null;
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
                  <div
                    key={reservedDay.seq}
                    className={style.reserve_info}
                    onClick={() => {
                      setModalData(reservedDay);
                      setIsModalOpen(true);
                    }}
                  >
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
              } else return null;
            })}
          </div>
        </div>
      </div>

      <div className={style.side_inner_div}>
        <h3 style={{ marginTop: "35px", fontWeight: "bold" }}>
          {state.loginUser.userRole === "patient"
            ? "지난 수업 내역"
            : "피드백 미작성 내역"}
        </h3>
        <Board
          headRow={headRow}
          grid={"40% 30% 30%"}
          data={dumy}
          type={"mypageSchedule"}
          setIsModalOpen={setIsModalOpen}
        ></Board>
        <Pagination
          number={11}
          first={false}
          last={false}
          totalPages={17}
          url={"www.naver.com"}
        ></Pagination>
      </div>
      {isModalOpen && (
        <Modal setModalOpen={setIsModalOpen}>
          <ScheduleModal modalData={modalData} />
        </Modal>
      )}
    </>
  );
}
