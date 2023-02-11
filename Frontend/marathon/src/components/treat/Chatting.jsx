import { useState } from "react";
import style from "./Chatting.module.css";
import { v4 as uuidv4 } from "uuid";

export default function Chatting({ stompClient, channelId, chatList }) {
  const [message, setMessage] = useState("");

  /** 전송 클릭 시 실행 */
  const submit = () => {
    if (message === "") return;
    stompClient.send(
      "/chat",
      {},
      JSON.stringify({
        channelId: channelId,
        content: message,
        sender: sessionStorage.getItem("access-token"),
      })
    );
    setMessage("");
  };

  return (
    <div className={style.wrapper}>
      <div className={style.chatting_container}>
        {chatList.map((item) =>
          item.hasOwnProperty("senderImg") ? (
            <div className={style.your_wrapper} key={uuidv4()}>
              <img
                className={style.your_bubble_profile}
                src={item.senderImg}
                alt=""
              />
              <div>
                <div className={style.your_name}>{item.senderName}</div>
                <div className={style.your_bubble_container}>
                  <span className={style.your_bubble}>
                    <div className={style.your_bubble_tail}></div>
                    <span className={style.your_bubble_content}>
                      {item.content}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className={style.my_bubble_container} key={uuidv4()}>
              <span className={style.my_bubble}>
                <div className={style.my_bubble_tail}></div>
                <span className={style.my_bubble_content}>{item.content}</span>
              </span>
            </div>
          )
        )}
      </div>
      <hr />
      <div className={style.textarea_container}>
        <textarea
          className={style.textarea}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submit();
            }
          }}
        ></textarea>
        <div className={style.submit} onClick={submit}>
          전송
        </div>
      </div>
    </div>
  );
}
