import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";

export default function Chatting() {
  const { id } = useParams();
  const client = useRef({});
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState("");

  /** 서버와 연결 성공 시 작업하는 부분 */
  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:9999/ws",
      debug: null,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    client.current.activate();
  };

  /** 메세지 발행 코드 */
  const publish = (chat) => {
    /** 클라이언트 연결여부 체크 */
    if (!client.current.connected) return;

    client.current.publish({
      destination: "/pub/chat",
      /** 형식에 맞게 수정하기 */
      body: JSON.stringify({
        applyId: id,
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
  const handleChange = (event) => {
    setChat(event.target.value);
  };

  /** 메세지 보내기 버튼 클릭 */
  const handleSubmit = (event, chat) => {
    event.preventDefault();

    publish(chat);
  };

  /** 최초 랜더링 시 서버 연결 */
  useEffect(() => {
    connect();
  }, []);

  return (
    <div>
      <div className={"chat-list"}>{chatList}</div>
      <form onSubmit={(event) => handleSubmit(event, chat)}>
        <div>
          <input
            type={"text"}
            name={"chatInput"}
            onChange={handleChange}
            value={chat}
          />
        </div>
        <input type={"submit"} value={"보내기"} />
      </form>
    </div>
  );
}
