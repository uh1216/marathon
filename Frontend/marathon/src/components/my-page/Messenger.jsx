import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Messenger.module.css";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faXmark, faBell } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { changeNowSideNav } from "stores/toggle.store";
import { useDispatch, useSelector } from "react-redux";
import Modal from "components/common/Modal";
import SendMessage from "./SendMessage";
import { updateUnReadMsgNum } from "stores/user.store";
import { changeTreatSessionId } from "stores/content.store";
import { $ } from "util/axios";
import { useNavigate } from "react-router-dom";

export default function Messenger() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const now = new Date();

  const [list, setList] = useState([]);
  const state = useSelector((state) => state);

  // 모달창 노출 여부 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  // 무슨 메시지에 대한 답장인지
  const [commuSeq, setCommuSeq] = useState(0);
  // 답장을 보낼 메시지의 sender가 누구였는지
  const [senderSeq, setSenderSeq] = useState(0);
  const [senderName, setSenderName] = useState("");

  useEffect(() => {
    // 사이드 나브 초기화
    dispatch(changeNowSideNav("알림 / 메시지"));

    $.get(`/user-commu/list?pageNum=1`)
      .then(({ data }) => {
        console.log(data);
        setList(data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
  const showModalMessage = (commuSeq, senderSeq, senderName) => {
    setSenderSeq(senderSeq);
    setSenderName(senderName);
    setCommuSeq(commuSeq);
    setIsModalOpen(true);
  };

  /** 알림/메시지 읽음 처리 */
  const setChecked = (commuSeq, idx) => {
    if (list[idx].checked) return;
    $.put(`/user-commu/message/${commuSeq}`)
      .then(() => {
        list[idx].checked = true;
        dispatch(updateUnReadMsgNum(state.loginUser.unReadMsgNum - 1));
        setList([...list]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /** 메시지 삭제 */
  const removeMessage = (commuSeq, idx) => {
    $.delete(`/user-commu/message/${commuSeq}`)
      .then(() => {
        list.splice(idx, 1);
        setList([...list]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /** 페이지네이션 */
  const getMoreMessage = () => {
    $.get(`/user-commu/list?pageNum=${pageNum + 1}`)
      .then(({ data }) => {
        setList([...list, ...data.content]);
      })
      .catch((error) => {
        console.log(error);
      });

    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    if (!state.treatSessionId.sessionId) return;
    navigate("/treat");
  }, [state.treatSessionId.sessionId]);

  return (
    <>
      <div className="container">
        <div className={style.btn_container}>
          <button
            className={style.btn_new_message}
            onClick={() => {
              showModalMessage(0);
            }}
          >
            <FontAwesomeIcon icon={faPaperPlane} /> 새 메시지
          </button>
        </div>
        {list.length === 0 ? (
          <div className={style.not_message}>
            <div style={{ fontSize: "40px" }}>❌</div>
            <div>
              알림 / 메시지가 존재하지 않습니다.
              <br /> 새 메시지를 작성해보세요!
            </div>
          </div>
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
              {/* content가 null이면 알림, null이 아니면 메시지 */}
              {item.content !== null && (
                <FontAwesomeIcon
                  icon={faXmark}
                  className={style.icon_x}
                  onClick={() => {
                    removeMessage(item.commuSeq, idx);
                  }}
                />
              )}
              <FontAwesomeIcon
                icon={item.content !== null ? faPaperPlane : faBell}
                className={style.icon}
              />
              <div className={style.content_box}>
                <div className={style.message_content}>
                  {item.content !== null ? item.content : "방이 생성되었습니다"}
                </div>
                <div className={style.sub_content_box}>
                  <div className={style.sub_content}>
                    {dateToString(item.date)}
                  </div>
                  {item.content !== null ? (
                    <div className={style.sub_content}>
                      from. {item.senderName} 선생님
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={style.btn_box}>
                {item.content !== null && (
                  <button
                    className={style.btn}
                    onClick={() => {
                      showModalMessage(
                        item.commuSeq,
                        item.senderSeq,
                        item.senderName
                      );
                    }}
                  >
                    답장 쓰기
                  </button>
                )}
                {item.content === null && (
                  <button
                    className={style.btn}
                    onClick={() => {
                      dispatch(changeTreatSessionId(item.link));
                    }}
                  >
                    수업 입장
                  </button>
                )}
              </div>
            </div>
          ))
        )}
        {list.length !== 0 && list.length % 5 === 0 && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className={style.btn_more} onClick={() => getMoreMessage()}>
              ▼ 더보기
            </button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal setModalOpen={setIsModalOpen}>
          <SendMessage
            setModalOpen={setIsModalOpen}
            commuSeq={commuSeq}
            senderSeq={senderSeq}
            senderName={senderName}
          />
        </Modal>
      )}
    </>
  );
}
