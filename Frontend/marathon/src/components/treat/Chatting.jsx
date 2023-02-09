import { useState } from "react";
import style from "./Chatting.module.css";

export default function Chatting({ isChatting, stompClient, channelId }) {
  const [message, setMessage] = useState("");
  /** 전송 클릭 시 실행 */
  const submit = () => {
    if (message === "") return;
    stompClient.send(
      "/changeInteraction",
      {},
      JSON.stringify({ channelId: channelId, content: message })
    );
    setMessage("");
  };

  return (
    <div className={style.wrapper} style={{ visibility: `${isChatting}` }}>
      <div className={style.chatting_container}>
        <div className={style.your_wrapper}>
          <img
            className={style.your_bubble_profile}
            src="https://newsimg.sedaily.com/2021/12/09/22V85NTJGY_1.jpg"
            alt=""
          />
          <div>
            <div className={style.your_name}>김김김</div>
            <div className={style.your_bubble_container}>
              <span className={style.your_bubble}>
                <div className={style.your_bubble_tail}></div>
                <span className={style.your_bubble_content}>?????????</span>
              </span>
            </div>
          </div>
        </div>
        <div className={style.my_bubble_container}>
          <span className={style.my_bubble}>
            <div className={style.my_bubble_tail}></div>
            <span className={style.my_bubble_content}>?????????</span>
          </span>
        </div>
        <div className={style.my_bubble_container}>
          <span className={style.my_bubble}>
            <div className={style.my_bubble_tail}></div>
            <span className={style.my_bubble_content}>네~~!!</span>
          </span>
        </div>
        <div className={style.my_bubble_container}>
          <span className={style.my_bubble}>
            <div className={style.my_bubble_tail}></div>
            <span className={style.my_bubble_content}>네~~!!</span>
          </span>
        </div>
        <div className={style.my_bubble_container}>
          <span className={style.my_bubble}>
            <div className={style.my_bubble_tail}></div>
            <span className={style.my_bubble_content}>네~~!!</span>
          </span>
        </div>
        <div className={style.my_bubble_container}>
          <span className={style.my_bubble}>
            <div className={style.my_bubble_tail}></div>
            <span className={style.my_bubble_content}>네~~!!</span>
          </span>
        </div>
        <div className={style.my_bubble_container}>
          <span className={style.my_bubble}>
            <div className={style.my_bubble_tail}></div>
            <span className={style.my_bubble_content}>네~~!!</span>
          </span>
        </div>
        <div className={style.my_bubble_container}>
          <span className={style.my_bubble}>
            <div className={style.my_bubble_tail}></div>
            <span className={style.my_bubble_content}>네~~!!</span>
          </span>
        </div>
        <div className={style.my_bubble_container}>
          <span className={style.my_bubble}>
            <div className={style.my_bubble_tail}></div>
            <span className={style.my_bubble_content}>네~~!!</span>
          </span>
        </div>
        <div className={style.my_bubble_container}>
          <span className={style.my_bubble}>
            <div className={style.my_bubble_tail}></div>
            <span className={style.my_bubble_content}>네~~!!</span>
          </span>
        </div>
        <div className={style.my_bubble_container}>
          <span className={style.my_bubble}>
            <div className={style.my_bubble_tail}></div>
            <span className={style.my_bubble_content}>네~~!!</span>
          </span>
        </div>
      </div>
      <hr />
      <div className={style.textarea_container}>
        <textarea
          className={style.textarea}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></textarea>
        <div className={style.submit} onClick={submit}>
          전송
        </div>
      </div>
    </div>
  );
}
