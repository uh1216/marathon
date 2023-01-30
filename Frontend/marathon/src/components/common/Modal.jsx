import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import style from "./Modal.module.css";

/**
 * setModalOpen : 모달을 띄울 것인지 말 것인지 정하는 boolean 변수의 setter
 * children : 부모 컴포넌트에서 모달 태그 안에 넣은 내용이 자동으로 children에 담김
 */
export default function Modal({ setModalOpen, children }) {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={style.background} onClick={closeModal}></div>
      <div className={style.container}>
        <FontAwesomeIcon
          icon={faXmark}
          className={style.close}
          onClick={closeModal}
        />
        <div className={style.content}>{children}</div>
      </div>
    </>
  );
}
