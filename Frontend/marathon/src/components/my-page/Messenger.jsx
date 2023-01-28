import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Messenger.module.css";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faXmark, faBell } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { changeNowSideNav } from "stores/toggle.store";
import { useDispatch } from "react-redux";

export default function Messenger() {
  const dispatch = useDispatch();
  const list = [
    {
      type: "alarm",
      content: "30분 뒤 화상 치료가 시작됩니다.",
      date: "2023.1.10 05:05 pm",
      sender: "",
      check: false,
    },
    {
      type: "message",
      content:
        "안녕하세요? 그동안 잘 지내셨나요?\r\n동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세.",
      date: "2023.1.10 05:05 pm",
      sender: "홍길순",
      check: false,
    },
    {
      type: "alarm",
      content: "30분 뒤 화상 치료가 시작됩니다.",
      date: "2023.1.10 05:05 pm",
      sender: "",
      check: true,
    },
    {
      type: "alarm",
      content: "30분 뒤 화상 치료가 시작됩니다.",
      date: "2023.1.10 05:05 pm",
      sender: "",
      check: true,
    },
    {
      type: "message",
      content:
        "안녕하세요? 그동안 잘 지내셨나요?\n동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세.",
      date: "2023.1.10 05:05 pm",
      sender: "홍길순",
      check: true,
    },
    {
      type: "alarm",
      content: "30분 뒤 화상 치료가 시작됩니다.",
      date: "2023.1.10 05:05 pm",
      sender: "",
      check: true,
    },
    {
      type: "alarm",
      content: "30분 뒤 화상 치료가 시작됩니다.",
      date: "2023.1.10 05:05 pm",
      sender: "",
      check: true,
    },
    {
      type: "alarm",
      content: "30분 뒤 화상 치료가 시작됩니다.",
      date: "2023.1.10 05:05 pm",
      sender: "",
      check: true,
    },
    {
      type: "alarm",
      content: "30분 뒤 화상 치료가 시작됩니다.",
      date: "2023.1.10 05:05 pm",
      sender: "",
      check: true,
    },
    {
      type: "alarm",
      content: "30분 뒤 화상 치료가 시작됩니다.",
      date: "2023.1.10 05:05 pm",
      sender: "",
      check: true,
    },
  ];

  useEffect(() => {
    // 사이드 나브 초기화
    dispatch(changeNowSideNav("알림 / 메시지"));
  }, []);

  return (
    <div className="container">
      <div className={style.btn_container}>
        <button className={style.btn_new_message}>
          <FontAwesomeIcon icon={faPaperPlane} /> 새 메시지
        </button>
      </div>

      {list.map((item) => (
        <div className={style.message_box}>
          <FontAwesomeIcon
            icon={item.type === "message" ? faPaperPlane : faBell}
            className={style.icon}
          />
          <div className={style.content_box}>
            <div className={style.message_content}>{item.content}</div>
            <div className={style.sub_content_box}>
              <div className={style.sub_content}>{item.date}</div>
              {item.type === "message" ? (
                <div className={style.sub_content}>from. 홍길동 선생님</div>
              ) : null}
            </div>
          </div>
          <div className={style.btn_box}>
            {item.type === "message" ? (
              <>
                <FontAwesomeIcon icon={faXmark} className={style.icon_x} />
                <button className={style.btn}>답장 쓰기</button>
              </>
            ) : (
              <button className={style.btn}>수업 입장</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
