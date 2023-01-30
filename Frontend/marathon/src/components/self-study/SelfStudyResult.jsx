import { useSelector } from "react-redux";

export default function SelfStudyResult() {
  const gameState = useSelector((state) => state).gameState;
  console.log(gameState.record);

  return (
    <>
      결과 화면 / {gameState.type}번째 게임 / {gameState.mode} 난이도
      {gameState.record.map((v, i) => (
        <div key={i}>{v ? "정답" : "오답"}</div>
      ))}
    </>
  );
}
