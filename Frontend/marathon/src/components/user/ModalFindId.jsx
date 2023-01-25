import style from "./ModalFindId.module.css";

export default function ModalFindId({ setModalOpen, content }) {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={style.container}>
      <button className={style.close} onClick={closeModal}>
        X
      </button>
      <p>아이디 찾기</p>
    </div>
  );
}
