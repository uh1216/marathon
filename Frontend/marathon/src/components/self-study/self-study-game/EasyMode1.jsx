import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecord, resetRecord } from "stores/game.store";
import commonStyle from "./Game.module.css";
import style from "./EasyMode1.module.css";
import SelfStudyIntro from "../SelfStudyIntro";
import { setStage, setIsReady, setMode } from "stores/game.store";
import GIF from "img/gif/11.gif";

export default function EasyMode1() {
  const gameState = useSelector((state) => state.gameState);
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState([]);
  let quizList = [];

  // 인트로 화면 띄울 때 세팅할 것
  useEffect(() => {
    dispatch(setMode("easy"));
    dispatch(setStage(0));
    dispatch(setIsReady(0));
  }, []);

  useEffect(() => {
    /** 1단계라면 점수 기록을 초기화 */
    if (gameState.stage === 1 && gameState.isReady === 0) {
      dispatch(resetRecord());
    }

    if (gameState.isReady === 2) {
      ////////////////////////////// 해당 코드 삭제하고 작업 시작해주세요
      if (gameState.stage !== 3) dispatch(addRecord(true));
      else dispatch(addRecord(false));
      ////////////////////////////// 해당 코드 삭제하고 작업 시작해주세요

      ////////////////////////////// 정답을 채워주세요
      // if (---정답 조건---) dispatch(addRecord(true));
      // else dispatch(addRecord(false));
    }
  }, [gameState.isReady]);

  /** 게임 스테이지 넘어갈때마다 새로운 문제 생성 */
  useEffect(() => {
    craeteQuiz();
  }, [gameState.stage]);

  /** 초기 문제 생성 위한 코드*/
  const craeteQuiz = () => {
    quizList = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 5; i++) {
      while (1) {
        const rand = Math.round(Math.random() * 8);
        if (quizList[rand] === 0) {
          quizList[rand] = 1;
          break;
        }
      }
    }
    console.log(quizList);
  };

  if (gameState.stage == 0) {
    return (
      <SelfStudyIntro
        mode={"easy"}
        title="주어진 화면에서 색칠된 부분을 기억해서 맞추는 게임입니다."
        gif={GIF}
      />
    );
  } else if (gameState.isReady == 0) {
    return (
      <>
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        <div className={commonStyle.title}>
          다음 화면에서 색칠된 부분의 위치를 기억해주세요
        </div>
        <div className={style.content}>
          <div className={style.board}>
            {quizList.forEach((index) =>
              quizList[index] === 1 ? (
                <button className={style.button_answer}></button>
              ) : (
                <button className={style.button_blank}></button>
              )
            )}
          </div>
        </div>
      </>
    );
  } else if (gameState.isReady == 1) {
    return (
      <>
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        <div className={commonStyle.title}>
          기억을 토대로 색칠되었던 부분을 클릭해주세요
        </div>
        <div>--------여기에 '문제 풀기'를 구현해주세요--------</div>
      </>
    );
  } else {
    return (
      <>
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        <div className={commonStyle.title}>채점 결과 입니다</div>
        <div>--------여기에 '정답'을 제시해주세요--------</div>
      </>
    );
  }
}
