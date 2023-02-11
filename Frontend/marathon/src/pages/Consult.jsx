/* eslint-disable */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareFromSquare,
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

let sockJS = new SockJS("http://localhost:9999/api/webSocket");
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

        <button className={style.btn_share}>
          <FontAwesomeIcon icon={faShareFromSquare} />
        </button>
        <div
          className={style.notCheckMsg}
          style={{
            visibility: isNotChkMessage ? "visible" : "hidden",
            // transition: " 0.3s ease-out",
          }}
        >
          읽지 않은 메시지가 있습니다
          <div className={style.notCheckMsgTail}></div>
        </div>
        <button className={style.btn_comment} onClick={showChatting}>
          {!isChatting && <FontAwesomeIcon icon={faComment} />}
          {isChatting && <FontAwesomeIcon icon={faCommentBlank} />}
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
      {isChatting && (
        <Chatting
          stompClient={stompClient}
          channelId={channelId}
          chatList={chatList}
        />
      )}
    </div>
  );
}
