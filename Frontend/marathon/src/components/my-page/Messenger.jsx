import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Messenger.module.css";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faXmark, faBell } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { changeNowSideNav } from "stores/toggle.store";
import { useDispatch } from "react-redux";
import Modal from "components/common/Modal";
import SendMessage from "./SendMessage";
import { $ } from "util/axios";

export default function Messenger() {
  const dispatch = useDispatch();
  const now = new Date();

  const [list, setList] = useState([]);
  // const list = [
  //   {
  //     type: "alarm",
  //     content: "30분 뒤 화상 치료가 시작됩니다.",
  //     date: now,
  //     sender: "",
  //     check: false,
  //   },
  //   {
  //     type: "message",
  //     content:
  //       "안녕하세요? 그동안 잘 지내셨나요?\r\n동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세.",
  //     date: now,
  //     sender: "홍길순",
  //     check: false,
  //   },
  //   {
  //     type: "alarm",
  //     content: "30분 뒤 화상 치료가 시작됩니다.",
  //     date: new Date("2023-01-27"),
  //     sender: "",
  //     check: true,
  //   },
  //   {
  //     type: "alarm",
  //     content: "30분 뒤 화상 치료가 시작됩니다.",
  //     date: new Date("2023-01-27"),
  //     sender: "",
  //     check: true,
  //   },
  //   {
  //     type: "message",
  //     content:
  //       "안녕하세요? 그동안 잘 지내셨나요?\n동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세.",
  //     date: new Date("2023-01-27"),
  //     sender: "홍길순",
  //     check: true,
  //   },
  //   {
  //     type: "alarm",
  //     content: "30분 뒤 화상 치료가 시작됩니다.",
  //     date: new Date("2023-01-27"),
  //     sender: "",
  //     check: true,
  //   },
  //   {
  //     type: "alarm",
  //     content: "30분 뒤 화상 치료가 시작됩니다.",
  //     date: new Date("2023-01-27"),
  //     sender: "",
  //     check: true,
  //   },
  //   {
  //     type: "alarm",
  //     content: "30분 뒤 화상 치료가 시작됩니다.",
  //     date: new Date("2023-01-27"),
  //     sender: "",
  //     check: true,
  //   },
  //   {
  //     type: "alarm",
  //     content: "30분 뒤 화상 치료가 시작됩니다.",
  //     date: new Date("2023-01-27"),
  //     sender: "",
  //     check: true,
  //   },
  //   {
  //     type: "alarm",
  //     content: "30분 뒤 화상 치료가 시작됩니다.",
  //     date: new Date("2023-01-27"),
  //     sender: "",
  //     check: true,
  //   },
  // ];

  // 모달창 노출 여부 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  let pageNum = 1;
  let prevList = [];

  /** 서버로부터 메시지 받아오는 함수
   * 더 받아온 메시지가 있다면 true
   * 없다면 false
   */
  async function getMoreMessage(prev, pageNum) {
    console.log(2);
    await $.get(`/user-commu/list?pageNum=${pageNum}`)
      .then(({ data }) => {
        console.log(3);
        console.log([...prev, ...data.content]);
        return [...prev, ...data.content];
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // 무한 스크롤 관련 변수
  const [bottom, setBottom] = useState(null);
  const bottomObserver = useRef(null);
  const observer = new IntersectionObserver(
    async (entries) => {
      // viewport에 target이 보이면
      if (entries[0].isIntersecting) {
        console.log(1);
        prevList = await getMoreMessage(prevList, pageNum++);
        console.log(4);
        // console.log("5");
        console.log(prevList);
        console.log(prevList.type);
        setList(prevList);
      }
    },
    { threshold: 0.25, rootMargin: "80px" }
  );

  useEffect(() => {
    // 사이드 나브 초기화
    dispatch(changeNowSideNav("알림 / 메시지"));

    bottomObserver.current = observer;
  }, []);

  useEffect(() => {
    const observer = bottomObserver.current;
    if (bottom) {
      observer.observe(bottom);
    }
    return () => {
      if (bottom) {
        observer.unobserve(bottom);
      }
    };
  }, [bottom]);

  /** Date 객체를 원하는 포맷의 String으로 반환하는 함수 */
  const dateToString = (date) => {
    if (date) {
      let str = date.toString();
      str = str.replace(/GMT\+0900\s\(한국 표준시\)/, "");
      str = str.replace(/\D{4}/, "");
      str = str.substr(0, 17);
      return str;
    }
    return date;
  };

  /** 메시지를 작성하는 모달 */
  const showModalMessage = () => {
    setIsModalOpen(true);
  };

  /** 알림/메시지 읽음 처리 */
  const setChecked = (commuSeq, idx) => {
    $.put(`/user-commu/message/${commuSeq}`)
      .then(() => {
        list[idx].checked = true;
        setList([...list]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container">
        <div className={style.btn_container}>
          <button className={style.btn_new_message} onClick={showModalMessage}>
            <FontAwesomeIcon icon={faPaperPlane} /> 새 메시지
          </button>
        </div>
        {list.length === 0 ? (
          <>메시지가 존재하지 않습니다.</>
        ) : (
          list.map((item, idx) => (
            <div
              className={
                item.checked
                  ? style.message_checked + " " + style.message_box
                  : style.message_box
              }
              key={idx}
              onClick={() => {
                setChecked(item.commuSeq, idx);
              }}
            >
              {item.type === "message" && (
                <FontAwesomeIcon icon={faXmark} className={style.icon_x} />
              )}
              <FontAwesomeIcon
                icon={item.type === "message" ? faPaperPlane : faBell}
                className={style.icon}
              />
              <div className={style.content_box}>
                <div className={style.message_content}>{item.content}</div>
                <div className={style.sub_content_box}>
                  <div className={style.sub_content}>
                    {dateToString(item.date)}
                  </div>
                  {item.type === "message" ? (
                    <div className={style.sub_content}>
                      from. {item.senderName} 선생님
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={style.btn_box}>
                {item.type === "message" && (
                  <button className={style.btn} onClick={showModalMessage}>
                    답장 쓰기
                  </button>
                )}
                {item.type === "alarm" && now - new Date(item.date) <= 30 && (
                  <button className={style.btn}>수업 입장</button>
                )}
              </div>
            </div>
          ))
        )}
        {/* 이 친구가 뷰포트에 25% 보인다면, 무한 스크롤이 실행됨 */}
        <div ref={setBottom} />
      </div>
      {isModalOpen && (
        <Modal setModalOpen={setIsModalOpen}>
          <SendMessage setModalOpen={setIsModalOpen} />
        </Modal>
      )}
    </>
  );
}
