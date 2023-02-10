import style from "./QuestionBoard.module.css";

const questions = [
  "좋아하는 음식은 무엇인가요?",
  "좋아하는 영화나 TV 프로그램이 있나요?",
  "좋아하는 취미나 활동은 무엇인가요?",
  "어떤 종류의 음악을 좋아하나요?",
  "당신의 가족이 가진 특별한 전통이나 규칙이 있나요?",
  "즐거운 여행을 한 적있다면 이야기 해주세요.",
  "당신의 첫 직업은 무엇이었나요?",
  "가장 좋아하는 날씨 유형은 무엇인가요?",
  "마지막으로 읽은 책은 무엇인가요?",
  "애완동물이 있나요? 있으면 소개해주세요. 없다면 가장 좋아하는 동물에 대해 말해주세요.",
  "좋아하는 운동이 있나요?",
  "당신의 인생에서 가장 중요한 사람은 누구이며 그 이유는 무엇인가요?",
  "항상 가보고 싶었던 장소가 있나요? 있다면 그 이유는 무엇인가요?",
  "당신만의 독특한 기술이나 재능은 무엇이 있나요?",
  "기억나는 마지막 꿈은 무엇인가요?",
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
