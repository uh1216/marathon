import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let sockJS = new SockJS("http://localhost:9999/api/webSocket");
let stompClient = Stomp.over(sockJS);
stompClient.debug = () => {};
console.log(stompClient);

const Practice = ({}) => {
  const [contents, setContents] = useState([]);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    stompClient.connect({}, () => {
      console.log("connect");
      stompClient.subscribe("/topic/roomId", (data) => {
        const newMessage = JSON.parse(data.body);
        addMessage(newMessage);
      });
    });
  }, []);

  const handleEnter = (username, x) => {
    const newMessage = { username: username, content: x };
    stompClient.send("/hello", {}, JSON.stringify(newMessage));
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
        </div>
      </div>
    </div>
  );
};

export default Practice;
