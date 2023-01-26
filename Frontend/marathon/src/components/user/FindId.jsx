import style from "./FindId.module.css";

export default function FindId({ setModalOpen }) {
  /** '전송' 버튼을 누르면 실행되는 함수 */
  const submit = () => {
    // axios 연결 필요 + 이메일 일치하는지 확인 필요
    alert("아이디를 이메일로 전송하였습니다.");
    setModalOpen(false);
  };

  return (
    <div className={style.container}>
      <p className={style.title}>아이디 찾기</p>
      <div className={style.content}>
        가입할 때 입력하였던 이메일 주소를 기입해주세요.
      </div>
      <input className={style.input_txt} type="text" />
      <button className={style.btn} onClick={submit}>
        전송
      </button>
    </div>
  );
}
