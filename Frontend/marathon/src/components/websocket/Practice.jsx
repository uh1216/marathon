import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let sockJS = new SockJS("http://localhost:9999/api/webSocket");
let stompClient = Stomp.over(sockJS);

const Practice = ({}) => {
  const channelId = 1;
  const [contents, setContents] = useState([]);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    stompClient.connect({}, () => {
      console.log("connect");
      /** 다른 사람이 채팅을 치면 일어날 일 */
      stompClient.subscribe(`/chat/${channelId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        addMessage(newMessage);
      });
      /** 다른 사람이 그림을 그리면 일어날 일 */
      stompClient.subscribe(`/sketch/${channelId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        console.log("스케치");
      });
      /** 다른 사람이 질문을 바꾸면 일어날 일 */
      stompClient.subscribe(`/question/${channelId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        console.log("무작위질문");
      });
      /** 다른 사람이 프리셋을 누르면 일어날 일 */
      stompClient.subscribe(`/preset/${channelId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        console.log("프리셋");
      });
      /** 다른 사람이 사진을 바꾸면 일어날 일 */
      stompClient.subscribe(`/image/${channelId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        console.log("그림보드");
      });
      /** 다른 사람이 끝말잇기를 치면 일어날 일 */
      stompClient.subscribe(`/wordChain/${channelId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        console.log("끝말잇기");
      });
    });
  }, []);

  const handleEnter = (username, x) => {
    const newMessage = {
      channelId: channelId,
      senderSeq: username,
      content: x,
    };
    stompClient.send("/chat", {}, JSON.stringify(newMessage));
    setMessage("");
  };

  const addMessage = (message) => {
    setContents((prev) => [...prev, message]);
  };

  return (
    <div className={"container"}>
      <div className={"chat-box"}>
        <div className="header">
          유저이름 :
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={"contents"}>
          {contents.map((message) => (
            <div>
              {" "}
              {message.username} : {message.content}{" "}
            </div>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="input your messages..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={() => handleEnter(username, message)}>전송</button>
          <button
            onClick={() =>
              stompClient.send(
                "/sketch",
                {},
                JSON.stringify({ channelId: channelId })
              )
            }
          >
            스케치
          </button>
          <button
            onClick={() =>
              stompClient.send(
                "/question",
                {},
                JSON.stringify({ channelId: channelId })
              )
            }
          >
            질문
          </button>
          <button
            onClick={() =>
              stompClient.send(
                "/preset",
                {},
                JSON.stringify({ channelId: channelId })
              )
            }
          >
            프리셋
          </button>
          <button
            onClick={() =>
              stompClient.send(
                "/image",
                {},
                JSON.stringify({ channelId: channelId })
              )
            }
          >
            그림
          </button>
          <button
            onClick={() =>
              stompClient.send(
                "/wordChain",
                {},
                JSON.stringify({ channelId: channelId })
              )
            }
          >
            끝말잇기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Practice;
