import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecord, resetRecord } from "stores/game.store";
import commonStyle from "./Game.module.css";
import SelfStudyIntro from "../SelfStudyIntro";
import { setStage, setIsReady, setMode } from "stores/game.store";
import GIF from "img/gif/11.gif";

export default function EasyMode1() {
  const gameState = useSelector((state) => state.gameState);
  const dispatch = useDispatch();

  // 인트로 화면 띄울 때 세팅할 것
  useEffect(() => {
    dispatch(setMode("easy"));
    dispatch(setStage(0));
    dispatch(setIsReady(0));
    dispatch(resetRecord());
  }, []);

  useEffect(() => {
    if (gameState.isReady == 1) {
      return () => {
        ////////////////////////////// 해당 코드 삭제하고 작업 시작해주세요
        if (gameState.stage != 3) dispatch(addRecord(true));
        else dispatch(addRecord(false));
        ////////////////////////////// 해당 코드 삭제하고 작업 시작해주세요

        ////////////////////////////// 정답을 채워주세요
        // if (---정답 조건---) dispatch(addRecord(true));
        // else dispatch(addRecord(false));
      };
    }
  }, [gameState.isReady]);

  if (gameState.stage == 0) {
    return (
      <SelfStudyIntro mode={"hard"} title="---안내문구 hard---" gif={GIF} />
    );
  } else if (gameState.isReady == 0) {
    return (
      <>
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        <div className={commonStyle.title}>
          -------여기에 가이드 문구를 입력해주세요-------
        </div>
        <div>--------여기에 '문제'를 제시해주세요--------</div>
      </>
    );
  } else if (gameState.isReady == 1) {
    return (
      <>
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        <div className={commonStyle.title}>
          -------여기에 가이드 문구를 입력해주세요-------
        </div>
        <div>--------여기에 '문제 풀기'를 구현해주세요--------</div>
      </>
    );
  } else {
    return (
      <>
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        <div className={commonStyle.title}>
          -------여기에 가이드 문구를 입력해주세요-------
        </div>
        <div>--------여기에 '정답'을 제시해주세요--------</div>
      </>
    );
  }
}
