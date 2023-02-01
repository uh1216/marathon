import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecord, resetRecord } from "stores/game.store";
import commonStyle from "./Game.module.css";
import SelfStudyIntro from "../SelfStudyIntro";
import { setStage, setIsReady, setMode } from "stores/game.store";
import GIF from "img/gif/11.gif";

export default function EasyMode1() {
  /** 10단계 중 몇 번째 단계 게임을 하고 있는지 */
  const gameState = useSelector((state) => state.gameState);

  const dispatch = useDispatch();

  const preventGoBack = (e) => {
    console.log(e);
    //let isGoBack = window.confirm("종료하기를 눌러주세요 :D");
    // if (!isGoBack) {
    //   window.history.pushState(null, "", "");
    // }
    // if (isGoBack) {
    //   window.history.popState();
    // }
  };

  // 새로고침 막기 변수
  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = ""; // chrome에서는 설정이 필요해서 넣은 코드
  };

  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    (() => {
      //window.history.pushState(null, "", "");
      window.addEventListener("popstate", preventGoBack);
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("popstate", preventGoBack);
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  useEffect(() => {
    dispatch(setIsReady(true));
    dispatch(setMode("hard"));
    dispatch(setStage(Number(0)));
  }, []);

  useEffect(() => {
    /** 1단계라면 점수 기록을 초기화 */
    if (gameState.stage == 1 && gameState.isReady) {
      dispatch(resetRecord());
    }
  }, [gameState.stage]);

  useEffect(() => {
    if (!gameState.isReady) {
      ////////////////////////////// 해당 코드 삭제하고 작업 시작해주세요
      if (gameState.stage != 3) dispatch(addRecord(true));
      else dispatch(addRecord(false));
      ////////////////////////////// 해당 코드 삭제하고 작업 시작해주세요

      ////////////////////////////// 정답을 채워주세요
      // if (---정답 조건---) dispatch(addRecord(true));
      // else dispatch(addRecord(false));
    }
  }, [gameState.isReady]);

  if (gameState.stage == 0) {
    return (
      <SelfStudyIntro mode={"hard"} title="---안내문구 hard---" gif={GIF} />
    );
  } else if (gameState.isReady) {
    return (
      <>
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        <div className={commonStyle.title}>
          -------여기에 가이드 문구를 입력해주세요-------
        </div>
        <div>--------여기에 문제를 제시해주세요--------</div>
      </>
    );
  } else {
    return (
      <>
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        <div className={commonStyle.title}>
          -------여기에 가이드 문구를 입력해주세요-------
        </div>
        <div>--------여기에 정답을 제시해주세요--------</div>
      </>
    );
  }
}
