import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsReady, setMode, setStageNow } from "stores/game.store";
import style from "./SelfStudyIntro.module.css";

export default function SelfStudyIntro({ mode, title, gif }) {
  const dispatch = useDispatch();

  /** 게임이 시작되면, 리덕스에 게임 모드(mode), 현재 단계(stateNow) 등을 넣어주기
   * mode : easy 또는 normal 또는 hard 값을 가진다.
   * stateNow : 0 (게임 설명) 1 ~ 10 (게임 단계) 11 (게임 결과)
   */
  useEffect(() => {
    dispatch(setIsReady(true));
    dispatch(setMode(mode));
    dispatch(setStageNow(Number(0)));
  }, [mode]);

  // {type}번째 게임 - {mode}모드 - 도입 화면
  return (
    <div className={style.container}>
      <div className={style.title}>{title}</div>

      <img className={style.gif} src={gif} alt="인트로 gif" />
    </div>
  );
}
