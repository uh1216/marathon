import style from "./FindPwd.module.css";

export default function FindId({ setModalOpen }) {
  /** '전송' 버튼을 누르면 실행되는 함수 */
  const submit = () => {
    // axios 연결 필요 + 비밀번호, 이메일 일치하는지 확인 필요
    alert("새 비밀번호를 이메일로 전송하였습니다.");
    setModalOpen(false);
  };

  return (
    <div className={style.container}>
      <p className={style.title}>비밀번호 찾기</p>
      <div className={style.content}>아이디를 입력해주세요.</div>
      <input className={style.input_txt} type="text" />
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
