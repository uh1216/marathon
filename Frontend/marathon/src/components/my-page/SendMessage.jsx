import style from "./SendMessage.module.css";
import SelectBox from "components/common/SelectBox";

export default function SendMessage({ setModalOpen }) {
  /** 전송 버튼을 누르면 실행하는 함수 */
  const submitMessage = () => {
    setModalOpen(false);
  };
  return (
    <div className={style.modal_container}>
      <div className={style.box_1}>메시지 보내기</div>
      <div className={style.box_2}>
        <div>받는 사람</div>
        <SelectBox options={[{ name: "aa" }, { name: "bb" }]} width="270px" />
      </div>
      <textarea
        name=""
        cols="30"
        rows="10"
        className={style.box_3}
        placeholder="메시지를 입력하세요."
      ></textarea>
      <div className={style.box_4}>
        <button onClick={submitMessage}>전송</button>
      </div>
    </div>
  );
}
