import style from "./FindId.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { $ } from "util/axios";

export default function FindId({ setModalOpen }) {
  const [email, setEmail] = useState();

  /** '전송' 버튼을 누르면 실행되는 함수 */
  const submit = () => {
    $.get("/user-sign/findid", {
      params: {
        email: email,
      },
    });
    Swal.fire({
      icon: "info",
      title: "",
      text: "아이디를 이메일로 전송하였습니다.",
      confirmButtonText: "닫기",
    });
    setModalOpen(false);
  };

  return (
    <div className={style.container}>
      <p className={style.title}>아이디 찾기</p>
      <div className={style.content}>
        가입할 때 입력하였던 이메일 주소를 기입해주세요.
      </div>
      <input
        className={style.input_txt}
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button className={style.btn} onClick={submit}>
        전송
      </button>
    </div>
  );
}
