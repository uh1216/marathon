import style from "./QuestionBoard.module.css";

const questions = [
  "질문1",
  "좀 긴 질문입니다.좀 긴 질문입니다.좀 긴 질문입니다.좀 긴 질문입니다.좀 긴 질문입니다.",
  "질문3",
  "질문4",
  "질문5",
];

export default function Board({ channelId, stompClient, questionNo }) {
  /** 이전 질문 보기 */
  const prev = () => {
    stompClient.send(
      "/question",
      {},
      JSON.stringify({
        channelId: channelId,
        content: questionNo === 0 ? questions.length - 1 : questionNo - 1,
      })
    );
  };

  /** 다음 질문 보기 */
  const next = () => {
    stompClient.send(
      "/question",
      {},
      JSON.stringify({
        channelId: channelId,
        content: questionNo === questions.length - 1 ? 0 : questionNo + 1,
      })
    );
  };

  return (
    <div className={style.wrapper}>
      <div className={style.button} onClick={prev}>
        ◀
      </div>
      <div className={style.question}>
        {0 <= questionNo &&
          questionNo < questions.length &&
          questions[questionNo]}
      </div>
      <div className={style.button} onClick={next}>
        ▶
      </div>
    </div>
  );
}
