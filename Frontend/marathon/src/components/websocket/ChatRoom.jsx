import { useRef, useState, useEffect } from "react";
import style from "./ChatRoom.module.css";
import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { useSelector } from "react-redux";

export default function ChatRoom() {
  const state = useSelector((state) => state);
  const { id } = useParams();
  const client = useRef({});
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState("");
  let stompClient = null;

  /** 서버와 연결 성공 시 작업하는 부분 */
  const connect = () => {
    // 연결할 때
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:9999/ws",
      onConnect: () => {
        subscribe();
      },
    });
    client.current.activate(); // 클라이언트 활성화
  };

  /** 메세지 발행 코드 */
  const publish = (chat) => {
    /** 클라이언트 연결여부 체크 */
    if (!client.current.connected) return;

    client.current.publish({
      destination: "/pub/chatroom",
      /** 형식에 맞게 수정하기 */
      body: JSON.stringify({
        channelId: id,
        senderSeq: state.loginUser.name,
        chat: chat,
      }),
    });

    setChat("");
  };

  /** 메세지를 주고받을 서버를 구독하는 함수(사용자별로 특정 서버에서 채팅하도록) */
  const subscribe = () => {
    client.current.subscribe("/sub/chat/" + id, (body) => {
      const json_body = JSON.parse(body.body);
      setChatList((chatList) => [...chatList, json_body]);
    });
  };

  /** 연결 해제 */
  const disconnect = () => {
    client.current.deactivate();
  };

  /** 채팅 입력 시 state에 값 설정 */
  const handleChange = (e) => {
    setChat(e.target.value);
  };

  /** 메세지 보내기 버튼 클릭 */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(chat);
    publish(chat);
  };

  /** 최초 랜더링 시 서버 연결 */
  useEffect(() => {
    connect();
  }, []);

  return (
    <>
      <div className={style.container}>
        <div className={style.inner_container}>
          <div className={style.message_board}>{chatList}</div>
          <div>
            <input
              className={style.message_text}
              type={"text"}
              name={"chatInput"}
              onChange={handleChange}
              value={chat}
            />
          </div>
          <div>
            <button onClick={handleSubmit}>보내기</button>
            <button onClick={disconnect}>종료</button>
          </div>
        </div>
      </div>
    </>
  );
}
