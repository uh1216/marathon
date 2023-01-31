import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMode, setStageNow } from "stores/game.store";

export default function SelfStudyIntro({ type, mode }) {
  const dispatch = useDispatch();

  /** 게임이 시작되면, 리덕스에 게임 모드(mode), 현재 단계(stateNow) 등을 넣어주기
   * mode : easy 또는 normal 또는 hard 값을 가진다.
   * stateNow : 0 (게임 설명) 1 ~ 10 (게임 단계) 11 (게임 결과)
   */
  useEffect(() => {
    dispatch(setMode(mode));
    dispatch(setStageNow(Number(0)));
  }, []);

  return (
    <>
      {type}번째 게임 - {mode}모드 - 도입 화면
    </>
  );
}
