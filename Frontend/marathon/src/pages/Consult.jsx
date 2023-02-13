/* eslint-disable */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faXmark,
  faVideo,
  faVideoSlash,
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { faComment as faCommentBlank } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./Treat.module.css";
import VideoCam from "components/webRTC/VideoCam";
import Chatting from "components/treat/Chatting";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Buffer } from "buffer";
import { v4 as uuidv4 } from "uuid";

let sockJS = new SockJS("https://i8a304.p.ssafy.io/api/webSocket");
// let sockJS = new SockJS("http://localhost:4433/api/webSocket");
let stompClient = Stomp.over(sockJS);

export default function Consult() {
  const { sessionId } = useParams();
  const state = useSelector((state) => state);
  const [isVideo, setIsVideo] = useState(true);
  const [isMic, setIsMic] = useState(true);
  const [isIn, setIsIn] = useState(true);
  const [chatList, setChatList] = useState([]);
  const [isChatting, setIsChatting] = useState(false);
  const [isNotChkMessage, setIsNotChkMessage] = useState(false);

  const [anonymousName, setAnonymousName] = useState(null);
  const [anonymousId, setAnonymousId] = useState(null);

  // 모바일일때 돌아가게 만들기
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  // 웹 소켓에 쓰이는 아이디
  const channelId = sessionId;

  /** 비디오 켜기 */
  const turnOnVideo = () => {
    setIsVideo(true);
  };
  /** 비디오 끄기 */
  const turnOffVideo = () => {
    setIsVideo(false);
  };
  /** 마이크 켜기 */
  const turnOnMic = () => {
    setIsMic(true);
  };
  /** 마이크 끄기 */
  const turnOffMic = () => {
    setIsMic(false);
  };
  /** 채팅창 보이기 or 끄기 */
  const showChatting = () => {
    setIsChatting(!isChatting);
  };

  useEffect(() => {
    if (isMobile()) {
      alert(
        "모바일에서는 지원하지 않는 기능입니다. 빠르게 기능을 업데이트 하도록 하겠습니다!"
      );
      window.location.href = "/";
      return;
    }

    // 웹소켓
    stompClient.connect({}, () => {
      console.log("websocket connect");
      let myAnonymousId = uuidv4();

      // 내가 로그인하지 않았다면
      if (!sessionStorage.getItem("access-token") && anonymousId == null) {
        let name = prompt(
          "현재 비로그인 상태입니다.\n사람들에게 보여질 이름을 입력해주세요."
        );
        setAnonymousName(!name ? "익명의 누군가" : name);
        setAnonymousId(myAnonymousId);
      }

      /** 다른 사람이 채팅을 치면 일어날 일 */
      stompClient.subscribe(`/chat/${channelId}`, (data) => {
        const newMessage = JSON.parse(data.body);

        // 익명의 누군가가 보낸 채팅이라면
        if (newMessage.sender.includes("anonymous-id")) {
          const yourAnonymousId = newMessage.sender.split("anonymous-id:")[1];
          const yourAnonymousName = newMessage.sender.split("anonymous-id:")[0];
          // 내가 보낸 메시지라면
          console.log(yourAnonymousId);
          console.log(myAnonymousId);
          if (yourAnonymousId === myAnonymousId)
            addMessage({ content: newMessage.content });
          else
            addMessage({
              senderImg: "https://d1v10kml6l14kq.cloudfront.net/default.jpg",
              senderName: yourAnonymousName,
              content: newMessage.content,
            });
        }
        // 로그인한 사람이 보낸 채팅이라면
        else {
          let base64Payload = newMessage.sender.split(".")[1];
          let payload = Buffer.from(base64Payload, "base64");
          let result = JSON.parse(payload.toString());

          // 내가 보낸 메시지라면
          if (newMessage.sender === sessionStorage.getItem("access-token"))
            addMessage({ content: newMessage.content });
          // 다른 사람이 보낸 메시지라면
          else
            addMessage({
              senderImg: result.img,
              senderName: result.name,
              content: newMessage.content,
            });
        }
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

  return (
    <div className={style.wrapper}>
      <div className={style.main_container}>
        {/* webRTC */}
        <VideoCam
          isVideo={isVideo}
          isMic={isMic}
          isIn={isIn}
          sessionId={sessionId}
          name={state.loginUser.userName || "임시방문자"}
          onlyConsult={true}
        />
      </div>
      <div className={style.btn_container}>
        {!isVideo && (
          <button className={style.btn_video} onClick={turnOnVideo}>
            <FontAwesomeIcon
              icon={faVideoSlash}
              style={{ fontSize: "1.4em" }}
            />
            &nbsp; 비디오 시작
          </button>
        )}
        {isVideo && (
          <button className={style.btn_video} onClick={turnOffVideo}>
            <FontAwesomeIcon icon={faVideo} style={{ fontSize: "1.4em" }} />
            &nbsp; 비디오 중지
          </button>
        )}
        {!isMic && (
          <button className={style.btn_mic} onClick={turnOnMic}>
            <FontAwesomeIcon
              icon={faMicrophoneSlash}
              style={{ fontSize: "1.4em" }}
            />
            &nbsp; 음소거 해제
          </button>
        )}
        {isMic && (
          <button className={style.btn_mic} onClick={turnOffMic}>
            <FontAwesomeIcon
              icon={faMicrophone}
              style={{ fontSize: "1.4em" }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;음&nbsp;&nbsp;소&nbsp;&nbsp;거
          </button>
        )}

        <button className={style.btn_comment} onClick={showChatting}>
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
            anonymousName={anonymousName}
            anonymousId={anonymousId}
          />
        )}
      </div>
    </div>
  );
}
