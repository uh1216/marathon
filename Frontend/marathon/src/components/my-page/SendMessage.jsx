import style from "./SendMessage.module.css";
import SelectBox from "components/common/SelectBox";
import { $ } from "util/axios";
import { useEffect, useState } from "react";

export default function SendMessage({ setModalOpen }) {
  const [content, setContent] = useState("");

  useEffect(()=>{
     $.get(`/user-commu/message`).then()
  },[])

  /** 전송 버튼을 누르면 실행하는 함수 */
  const submitMessage = () => {
    $.post(`/user-commu/message`, {
      receiverSeq: 33,
      content: content,
    })
      .then((res) => {
        alert("메시지가 성공적으로 전송되었습니다.");
        setModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <div className={style.box_4}>
        <button onClick={submitMessage}>전송</button>
      </div>
    </div>
  );
}
