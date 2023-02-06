import style from "./ScheduleModal.module.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function ScheduleModal({ modalData, setIsModalOpen }) {
  const state = useSelector((state) => state);
  const [isCreatable, setIsCreatable] = useState(false);

  useEffect(() => {
    let date = new Date(modalData.reservedDay.dateTime).getTime();
    date += (modalData.reservedDay.dateTime - 9) * 3600000;
    let nowTime = new Date();
    if (
      -3600000 <= date - nowTime.getTime() &&
      date - nowTime.getTime() <= 600000
    ) {
      setIsCreatable(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.modal_container}>
      <div className={style.modal_left_box}>
        <img
          className={style.modal_profile}
          src={
            modalData.reservedDay.doctorImg || modalData.reservedDay.patientImg
          }
          alt=""
        />
      </div>
      <div className={style.modal_right_box}>
        <h3 style={{ display: "inline-block" }}>
          {modalData.reservedDay.doctorName ||
            modalData.reservedDay.patientName}
        </h3>
        <h4>{state.loginUser.userRole === "patient" ? " 선생님 " : " 님 "}</h4>
        <hr />
        <span style={{ color: "gray", marginRight: "10px" }}>예약 구분</span>
        <span>재활</span>
        <br />
        <span
          style={{
            display: "inline-block",
            marginTop: "15px",
            color: "gray",
            marginRight: "10px",
          }}
        >
          예약 날짜
        </span>
        <span>
          {new Date(modalData.reservedDay.dateTime).toLocaleDateString()}
        </span>
        <span>({modalData.dayOfWeek})</span>
        <span>{new Date(modalData.reservedDay.dateTime).getHours()}시</span>
        {state.loginUser.userRole === "doctor" ? (
          <>
            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: "1" }}></div>
              <div>
                <button
                  className={
                    isCreatable
                      ? style.button + " " + style.button_create
                      : style.button +
                        " " +
                        style.button_create +
                        " " +
                        style.unable
                  }
                  style={{ marginRight: "10px" }}
                >
                  방 생성
                </button>
                <button
                  className={style.button + " " + style.button_cancel}
                  onClick={() => {
                    if (window.confirm("정말로 취소하시겠습니까?")) {
                      //useMutate를 수행
                      setIsModalOpen(false);
                    }
                  }}
                >
                  예약 취소
                </button>
              </div>
            </div>
            <p>
              ※ 수업시작 10분전, 수업 예약 시간 1시간 후 까지만 방생성이
              활성화됩니다.
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
