import style from "./ScheduleModal.module.css";
import { useSelector } from "react-redux";

export default function ScheduleModal({ modalData }) {
  const state = useSelector((state) => state);
  return (
    <div className={style.modal_container}>
      <div className={style.modal_left_box}>
        <img className={style.modal_profile} src={modalData.url} alt="" />
      </div>
      <div className={style.modal_right_box}>
        <h3 style={{ display: "inline-block" }}>{modalData.name} </h3>
        <h4>{state.loginUser.userRole === "patient" ? " 선생님 " : " 님 "}</h4>
        <hr />
        <span>예약 구분</span> <span>재활</span>
        <br />
        <span style={{ display: "inline-block", marginTop: "20px" }}>
          예약 날짜
        </span>{" "}
        <span>재활</span>
      </div>
    </div>
  );
}
