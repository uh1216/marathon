import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faXmark,
  faVideo,
  faVideoSlash,
  faMicrophone,
  faMicrophoneSlash,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faComment as faCommentBlank } from "@fortawesome/free-regular-svg-icons";
import style from "./Treat.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chatting from "components/treat/Chatting";
import VideoCam from "components/webRTC/VideoCam";
import QuestionBoard from "components/treat/QuestionBoard";
import SketchBoard from "components/treat/SketchBoard";
import ImageBoard from "components/treat/ImageBoard";
import WordChainBoard from "components/treat/WordChainBoard";
import { useSelector } from "react-redux";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Buffer } from "buffer";

// 모바일일때 돌아가게 만들기
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

let sockJS = new SockJS("https://i8a304.p.ssafy.io/api/webSocket");
// let sockJS = new SockJS("http://localhost:4433/api/webSocket");
let stompClient = Stomp.over(sockJS);

const interactionTitle = [
  "스케치 보드",
  "끝말잇기 보드",
  "그림 보드",
  "무작위질문 보드",
];

export default function Treat() {
  const { sessionId } = useParams();
  const state = useSelector((state) => state);
  const [isVideo, setIsVideo] = useState(true);
  const [isMic, setIsMic] = useState(true);
  const [isIn, setIsIn] = useState(true);
  const [isChatting, setIsChatting] = useState(false);
  const [isPreset0, setIsPreset0] = useState(false);
  const [isPreset1, setIsPreset1] = useState(false);
  const [isPreset2, setIsPreset2] = useState(false);
  const [isPreset3, setIsPreset3] = useState(false);
  const [isPreset4, setIsPreset4] = useState(false);
  const [isPreset5, setIsPreset5] = useState(false);
  const [interactionMode, setInteractionMode] = useState(0);

  // 채팅 or 상호작용 보드에서 쓰이는 데이터들
  const [items, setItems] = useState([]); // 스케치 보드 데이터 저장용
  const [chatList, setChatList] = useState([]);
  const [wordList, setWordList] = useState([]);
  const [questionNo, setQuestionNo] = useState(0);
  const [imageNo, setImageNo] = useState(0);
  const [isNotChkMessage, setIsNotChkMessage] = useState(false);

  // 웹 소켓에 쓰이는 아이디
  const channelId = sessionId;

  /** 채팅창 보이기 or 끄기 */
  const showChatting = () => {
    setIsChatting(!isChatting);
  };

  /** 상호작용 보드 바꾸기
   * idx : 몇 번째 상호작용 보드를 골랐는지
   */
  const changeInteraction = (idx) => {
    // SetInteractionMode(idx);
    stompClient.send(
      "/changeInteraction",
      {},
      JSON.stringify({ channelId: channelId, content: idx })
    );
  };

  /** 프리셋 클릭
   * idx : 몇 번째 프리셋을 클릭했는지
   */
  const alertPreset = (idx) => {
    switch (idx) {
      case 0:
        setIsPreset0(true);
        stompClient.send(
          "/preset",
          {},
          JSON.stringify({ channelId: channelId, content: "0,true" })
        );
        setTimeout(() => {
          setIsPreset0(false);
          stompClient.send(
            "/preset",
            {},
            JSON.stringify({ channelId: channelId, content: "0," })
          );
        }, 3000);
        break;
      case 1:
        setIsPreset1(true);
        stompClient.send(
          "/preset",
          {},
          JSON.stringify({ channelId: channelId, content: "1,true" })
        );
        setTimeout(() => {
          setIsPreset1(false);
          stompClient.send(
            "/preset",
            {},
            JSON.stringify({ channelId: channelId, content: "1," })
          );
        }, 3000);
        break;
      case 2:
        setIsPreset2(true);
        stompClient.send(
          "/preset",
          {},
          JSON.stringify({ channelId: channelId, content: "2,true" })
        );
        setTimeout(() => {
          setIsPreset2(false);
          stompClient.send(
            "/preset",
            {},
            JSON.stringify({ channelId: channelId, content: "2," })
          );
        }, 3000);
        break;
      case 3:
        setIsPreset3(true);
        stompClient.send(
          "/preset",
          {},
          JSON.stringify({ channelId: channelId, content: "3,true" })
        );
        setTimeout(() => {
          setIsPreset3(false);
          stompClient.send(
            "/preset",
            {},
            JSON.stringify({ channelId: channelId, content: "3," })
          );
        }, 3000);
        break;
      case 4:
        setIsPreset4(true);
        stompClient.send(
          "/preset",
          {},
          JSON.stringify({ channelId: channelId, content: "4,true" })
        );
        setTimeout(() => {
          setIsPreset4(false);
          stompClient.send(
            "/preset",
            {},
            JSON.stringify({ channelId: channelId, content: "4," })
          );
        }, 3000);
        break;
      case 5:
        setIsPreset5(true);
        stompClient.send(
          "/preset",
          {},
          JSON.stringify({ channelId: channelId, content: "5,true" })
        );
        setTimeout(() => {
          setIsPreset5(false);
          stompClient.send(
            "/preset",
            {},
            JSON.stringify({ channelId: channelId, content: "5," })
          );
        }, 3000);
        break;
      default:
        break;
    }
  };

  // let headers = { Authorization: sessionStorage.getItem("access-token") };

  useEffect(() => {
    if (isMobile()) {
      alert(
        "모바일에서는 지원하지 않는 기능입니다. 빠르게 기능을 업데이트 하도록 하겠습니다!"
      );
      window.location.href = "/";
    }

    // 웹소켓
    stompClient.connect({}, () => {
      console.log("websocket connect");

      /** 다른 사람이 채팅을 치면 일어날 일 */
      stompClient.subscribe(`/chat/${channelId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        console.log(newMessage);
        // 내가 보낸 메시지라면
        if (newMessage.sender === sessionStorage.getItem("access-token"))
          addMessage({ content: newMessage.content });
        // 다른 사람이 보낸 메시지라면
        else {
          if (newMessage.sender) {
            let base64Payload = newMessage.sender.split(".")[1];
            let payload = Buffer.from(base64Payload, "base64");
            let result = JSON.parse(payload.toString());
            addMessage({
              senderImg: result.img,
              senderName: result.name,
              content: newMessage.content,
            });
            console.log({
              senderImg: result.img,
              senderName: result.name,
              content: newMessage.content,
            });
          }
        }
      });

      /** 다른 사람이 프리셋을 누르면 일어날 일 */
      stompClient.subscribe(`/preset/${channelId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        const idx = Number(newMessage.content.split(",")[0]);
        const bool = Boolean(newMessage.content.split(",")[1]);

        switch (idx) {
          case 0:
            setIsPreset0(bool);
            break;
          case 1:
            setIsPreset1(bool);
            break;
          case 2:
            setIsPreset2(bool);
            break;
          case 3:
            setIsPreset3(bool);
            break;
          case 4:
            setIsPreset4(bool);
            break;
          case 5:
            setIsPreset5(bool);
            break;
          default:
            break;
        }
        console.log("프리셋");
      });

      /** 다른 사람이 스케치 보드를 바꾸면 일어날 일 */
      stompClient.subscribe(`/sketch/${channelId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        setItems((prev) => {
          // console.log("------------------------");
          // console.log([...prev, JSON.parse(newMessage.content)]);
          return [...prev, JSON.parse(newMessage.content)];
        });
      });

      /** 다른 사람이 상호작용 보드를 바꾸면 일어날 일 */
      stompClient.subscribe(`/changeInteraction/${channelId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        setInteractionMode(Number(newMessage.content));
      });

      /** 다른 사람이 끝말잇기를 입력하면 일어날 일 */
      stompClient.subscribe(`/wordChain/${channelId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        addWord(newMessage.content);
      });

      /** 다른 사람이 무작위질문을 바꾸면 일어날 일 */
      stompClient.subscribe(`/question/${channelId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        setQuestionNo(() => Number(newMessage.content));
      });

      /** 다른 사람이 사진을 바꾸면 일어날 일 */
      stompClient.subscribe(`/image/${channelId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        setImageNo(() => Number(newMessage.content));
      });
    });
    // eslint-disable-next-line
  }, []);

  /** 새로운 채팅이 왔고, 채팅창이 꺼져있으면 읽지 않은 메시지 알림이 뜬다. */
  useEffect(() => {
    if (!isChatting) setIsNotChkMessage(() => true);
  }, [chatList, isChatting]);

  /** 채팅창이 켜지면 읽지 않은 메시지 알림이 사라진다. */
  useEffect(() => {
    setIsNotChkMessage(() => false);
  }, [isChatting]);

  /** 채팅 대화 리스트에 새로운 채팅을 추가 */
  const addMessage = (message) => {
    setChatList((prev) => [...prev, message]);
  };

  /** 끝말잇기 리스트에 새로운 단어 추가 */
  const addWord = (word) => {
    setWordList((prev) => {
      if (prev.length === 0) return [word];
      return [word, prev[0]];
    });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.main_container}>
        <div className={style.left_container}>
          {/* webRTC */}
          <VideoCam
            isVideo={isVideo}
            isMic={isMic}
            isIn={isIn}
            sessionId={sessionId}
            name={state.loginUser.userName}
          />
          <div className={style.alert_emoji_box}>
            {isPreset0 && <div className={style.alert_emoji}>⏰</div>}
            {isPreset1 && <div className={style.alert_emoji}>😂</div>}
            {isPreset2 && <div className={style.alert_emoji}>🎧</div>}
            {isPreset3 && <div className={style.alert_emoji}>💡</div>}
            {isPreset4 && <div className={style.alert_emoji}>❓</div>}
            {isPreset5 && <div className={style.alert_emoji}>😴</div>}
          </div>
        </div>
        <div className={style.right_container}>
          <div className={style.right_up_container}>
            <div className={style.interaction_nav}>
              <span>{interactionTitle[interactionMode]}</span>
              <span className={style.dropdown}>
                <FontAwesomeIcon
                  icon={faBars}
                  className={style.bars}
                  style={{ fontSize: "1.4em" }}
                />
                <div className={style.interaction_menu}>
                  <div
                    onClick={() => {
                      changeInteraction(0);
                    }}
                  >
                    {interactionTitle[0]}
                  </div>
                  <div
                    onClick={() => {
                      changeInteraction(1);
                    }}
                  >
                    {interactionTitle[1]}
                  </div>
                  <div
                    onClick={() => {
                      changeInteraction(2);
                    }}
                  >
                    {interactionTitle[2]}
                  </div>
                  <div
                    onClick={() => {
                      changeInteraction(3);
                    }}
                  >
                    {interactionTitle[3]}
                  </div>
                </div>
              </span>
            </div>
            <div className={style.interaction_box}>
              {interactionMode === 0 && (
                <SketchBoard
                  channelId={channelId}
                  stompClient={stompClient}
                  items={items}
                />
              )}
              {interactionMode === 1 && (
                <WordChainBoard
                  channelId={channelId}
                  stompClient={stompClient}
                  wordList={wordList}
                />
              )}
              {interactionMode === 2 && (
                <ImageBoard
                  channelId={channelId}
                  stompClient={stompClient}
                  imageNo={imageNo}
                />
              )}
              {interactionMode === 3 && (
                <QuestionBoard
                  channelId={channelId}
                  stompClient={stompClient}
                  questionNo={questionNo}
                />
              )}
            </div>
          </div>
          <div className={style.right_bottom_container}>
            <div></div>
            <div className={style.preset_container}>
              <div
                className={style.preset + " " + (isPreset0 && style.blink)}
                onClick={() => {
                  alertPreset(0);
                }}
              >
                <span className={style.emoji}>⏰&nbsp;</span> 조금만 시간을
                주세요
              </div>
              <div
                className={style.preset + " " + (isPreset1 && style.blink)}
                onClick={() => {
                  alertPreset(1);
                }}
              >
                <span className={style.emoji}>😂&nbsp;</span>천천히 / 다시
                말해주세요
              </div>
              <div
                className={style.preset + " " + (isPreset2 && style.blink)}
                onClick={() => {
                  alertPreset(2);
                }}
              >
                <span className={style.emoji}>🎧&nbsp;</span>소리가 잘 안들려요
              </div>
              <div
                className={style.preset + " " + (isPreset3 && style.blink)}
                onClick={() => {
                  alertPreset(3);
                }}
              >
                <span className={style.emoji}>💡&nbsp;</span>생각이 나지 않아요
              </div>
              <div
                className={style.preset + " " + (isPreset4 && style.blink)}
                onClick={() => {
                  alertPreset(4);
                }}
              >
                <span className={style.emoji}>❓&nbsp;</span>잘 모르겠어요
              </div>
              <div
                className={style.preset + " " + (isPreset5 && style.blink)}
                onClick={() => {
                  alertPreset(5);
                }}
              >
                <span className={style.emoji}>😴&nbsp;</span>잠시 쉬고 싶어요
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.btn_container}>
        {!isVideo ? (
          <button
            className={style.btn_video}
            onClick={() => setIsVideo(!isVideo)}
          >
            <FontAwesomeIcon
              icon={faVideoSlash}
              style={{ fontSize: "1.4em" }}
            />
            &nbsp; 비디오 시작
          </button>
        ) : (
          <button
            className={style.btn_video}
            onClick={() => setIsVideo(!isVideo)}
          >
            <FontAwesomeIcon icon={faVideo} style={{ fontSize: "1.4em" }} />
            &nbsp; 비디오 중지
          </button>
        )}

        {!isMic ? (
          <button className={style.btn_mic} onClick={() => setIsMic(!isMic)}>
            <FontAwesomeIcon
              icon={faMicrophoneSlash}
              style={{ fontSize: "1.4em" }}
            />
            &nbsp; 음소거 해제
          </button>
        ) : (
          <button className={style.btn_mic} onClick={() => setIsMic(!isMic)}>
            <FontAwesomeIcon
              icon={faMicrophone}
              style={{ fontSize: "1.4em" }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;음&nbsp;&nbsp;소&nbsp;&nbsp;거
          </button>
        )}

        <button
          className={style.btn_comment}
          onClick={() => setIsChatting(!isChatting)}
        >
          <div
            className={
              isNotChkMessage
                ? style.notCheckMsg
                : style.notCheckMsg + " " + style.vhidden
            }
            style={{
              animation: "0.5s ease-in-out loadEffect5",
            }}
          >
            읽지 않은 메시지가 있습니다
            <div className={style.notCheckMsgTail}></div>
          </div>
          {!isChatting ? (
            <FontAwesomeIcon icon={faComment} />
          ) : (
            <FontAwesomeIcon icon={faCommentBlank} />
          )}
        </button>
        <button
          className={style.btn_x}
          onClick={() => {
            if (window.confirm("정말로 나가시겠습니까?")) {
              setIsIn(false);
              window.close();
              window.history.back();
            }
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div style={{ height: "100vh", position: "fixed", right: "0" }}>
        {isChatting && (
          <Chatting
            stompClient={stompClient}
            channelId={channelId}
            chatList={chatList}
            setIsChatting={showChatting}
          />
        )}
      </div>
    </div>
  );
}
