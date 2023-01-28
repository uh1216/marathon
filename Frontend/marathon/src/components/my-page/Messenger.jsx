import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Messenger.module.css";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Messenger() {
  return (
    <div className="container">
      <div className={style.message_box}>
        <FontAwesomeIcon icon={faPaperPlane} className={style.icon} />
        <div className={style.content_box}>
          <div className={style.message_content}>
            동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세
            <br />
            무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세.
          </div>
          <div className={style.sub_content_box}>
            <div className={style.sub_content}>2023.1.10 05:08 pm</div>
            <div className={style.sub_content}>from. 홍길동 선생님</div>
          </div>
        </div>
        <div className={style.btn_box}>
          <FontAwesomeIcon icon={faXmark} className={style.icon_x} />
          <button className={style.btn}>답장 쓰기</button>
        </div>
      </div>
    </div>
  );
}
