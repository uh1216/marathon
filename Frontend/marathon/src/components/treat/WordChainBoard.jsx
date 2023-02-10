import { useState } from "react";
import style from "./WordChainBoard.module.css";

export default function WordChainBoard({ channelId, stompClient, wordList }) {
  const [word, setWord] = useState("");

  /** 전송 시 실행 */
  const submit = () => {
    if (!word) return;
    stompClient.send(
      "/wordChain",
      {},
      JSON.stringify({
        channelId: channelId,
        content: word,
      })
    );
    setWord("");
  };

  return (
    <div className={style.wrapper}>
      <div className={style.word + " " + style.prev_word}>
        {wordList && wordList.length > 1 && wordList[1]}
      </div>
      <div className={style.word}>
        {wordList && wordList.length > 0 && wordList[0]}
      </div>
      <input
        className={style.input}
        type="text"
        placeholder="단어를 입력해주세요"
        value={word}
        maxLength="5"
        onChange={(e) => {
          setWord(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submit();
          }
        }}
      />
    </div>
  );
}
