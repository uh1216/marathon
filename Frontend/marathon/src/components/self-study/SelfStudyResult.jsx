import { useSelector } from "react-redux";
import style from "./SelfStudyResult.module.css";
import O from "img/icon/green_check.png";
import X from "img/icon/red_x.png";
import { useEffect, useState } from "react";

export default function SelfStudyResult() {
  const gameState = useSelector((state) => state).gameState;
  const [ansCnt, setAnsCnt] = useState(0);

  useEffect(() => {
    let cnt = 0;

    for (let i = 0; i < 10; i++) {
      if (gameState.record[i]) cnt++;
    }
    setAnsCnt(cnt);
  }, []);
  // 게임 종류 : gameState.type
  // 난이도 : gameState.mode

  return (
    <div className={style.container}>
      <div className={style.title}>
        10문제 중 <h2>{ansCnt}문제</h2> 를 맞추셨습니다!
      </div>
      <div className={style.icon_boxes}>
        <div className={style.row}>
          {gameState.record.map(
            (v, i) =>
              i < 5 && (
                <div className={style.icon_box} key={i}>
                  <p>{i + 1} 번</p>
                  <img
                    className={style.icon}
                    key={i}
                    src={v ? O : X}
                    alt={v ? "정답" : "오답"}
                  />
                </div>
              )
          )}
        </div>
        <div className={style.row}>
          {gameState.record.map(
            (v, i) =>
              i > 4 && (
                <div className={style.icon_box} key={i}>
                  <p>{i + 1} 번</p>
                  <img
                    className={style.icon}
                    key={i}
                    src={v ? O : X}
                    alt={v ? "정답" : "오답"}
                  />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
