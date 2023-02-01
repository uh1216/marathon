import style from "./ConsultListModal.module.css";
import { useSelector } from "react-redux";

export default function ConsultListModal({ setIsModalOpen }) {
  const state = useSelector((state) => state);

  return (
    <div className={style.modal_container}>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: "1" }} />
        <h3>상담 예약 상세 </h3>
        <div style={{ flexGrow: "1" }} />
      </div>
      <table className={style.table}>
        <tbody>
          <tr className={style.table_tr}>
            <td
              className={style.table_td1}
              style={{ borderTopLeftRadius: "5px" }}
            >
              <span>대상자 성명</span>
            </td>
            <td className={style.table_td2 + " " + style.table_d3}>
              <span>{state.nowBoardInfo.name}</span>
            </td>
            <td
              className={style.table_td1}
              style={{ borderLeft: "1px solid black" }}
            >
              <span>희망 날짜</span>
            </td>
            <td className={style.table_td2}>
              <span>{state.nowBoardInfo.birth}</span>
            </td>
          </tr>
          <tr className={style.table_tr}>
            <td className={style.table_td1}>
              <span>대상자 생년월일</span>
            </td>
            <td className={style.table_td2 + " " + style.table_d3}>
              <span>{state.nowBoardInfo.birth}</span>
            </td>
            <td
              className={style.table_td1}
              style={{ borderLeft: "1px solid black" }}
            >
              <span>이메일 주소</span>
            </td>
            <td className={style.table_td2}>
              <span>{state.nowBoardInfo.email}</span>
            </td>
          </tr>
          <tr className={style.table_tr}>
            <td className={style.table_td1}>
              <span>연락처</span>
            </td>
            <td className={style.table_td2 + " " + style.table_d3}>
              <span>{state.nowBoardInfo.phone}</span>
            </td>
            <td
              className={style.table_td1}
              style={{ borderLeft: "1px solid black" }}
            >
              <span>비상 연락처1</span>
            </td>
            <td className={style.table_td2}>
              <span>{state.nowBoardInfo.phone}</span>
            </td>
          </tr>
          <tr className={style.table_tr}>
            <td className={style.table_td1}>
              <span>뇌손상 발병시기</span>
            </td>
            <td className={style.table_td2 + " " + style.table_d3}>
              <span>{state.nowBoardInfo.birth}</span>
            </td>
            <td
              className={style.table_td1}
              style={{ borderLeft: "1px solid black" }}
            >
              <span>비상 연락처2</span>
            </td>
            <td className={style.table_td2}>
              <span>{state.nowBoardInfo.phone}</span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottomLeftRadius: "5px",
                backgroundColor: "#ececff",
                borderRight: "1px solid black",
              }}
            >
              <p>의사소통에</p>
              <p>어려운 부분</p>
            </td>
            <td colSpan="3" style={{ borderTop: "1px solid black" }}>
              <span>{state.nowBoardInfo.des}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: "1" }} />
        <div
          className={
            !state.nowBoardInfo.done
              ? style.button
              : style.button + " " + style.button_cancel
          }
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          {state.nowBoardInfo.done ? "처리완료" : "미처리"}
        </div>
        <div style={{ flexGrow: "1" }} />
      </div>
    </div>
  );
}
