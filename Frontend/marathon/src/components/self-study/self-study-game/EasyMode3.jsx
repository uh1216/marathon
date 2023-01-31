import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addRecord, resetRecord } from "stores/game.store";
import commonStyle from "./Game.module.css";
import style from "./EasyMode3.module.css";
import figure from "img/gitlab.png";

export default function EasyMode1() {
  /** 10단계 중 몇 번째 단계 게임을 하고 있는지 */
  const stage = useParams().stage;
  const gameState = useSelector((state) => state.gameState);

  const dispatch = useDispatch();

  useEffect(() => {
    /** 1단계라면 점수 기록을 초기화 */
    if (stage == 1) {
      dispatch(resetRecord());
    }
  }, [stage]);

  useEffect(() => {
    if (!gameState.isReady) {
      ////////////////////////////// 해당 코드 삭제하고 작업 시작해주세요
      if (stage != 3) dispatch(addRecord(true));
      else dispatch(addRecord(false));
      ////////////////////////////// 해당 코드 삭제하고 작업 시작해주세요

      ////////////////////////////// 정답을 채워주세요
      // if (---정답 조건---) dispatch(addRecord(true));
      // else dispatch(addRecord(false));
    }
  }, [gameState.isReady]);

  /// 드래그앤 드롭 관련 코드
  // https://lts0606.tistory.com/602
  ///

  if (gameState.isReady) {
    return (
      <>
        <div className={commonStyle.stage}>{stage} / 10</div>
        <div className={commonStyle.title}>
          도형의 위치를 기억해서 원래 위치로 가져다 놓으세요!
        </div>
        <div className={style.gameBoard}>
          <table className={style.table}>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div
            className={style.figure_box}
            //ref={draggingOverItemIndex}
            // onDrop={(e) => drop(e)}
            // onDragOver={(e) => dragOver(e)}
          >
            <img
              className={style.figure}
              src={figure}
              alt="도형"
              draggable="true"
              //ref={draggingItemIndex}
              // onDragStart={(e) => {
              //   drag(e);
              // }}
            />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={commonStyle.stage}>{stage} / 10</div>
        <div className={commonStyle.title}>
          도형의 위치를 기억해서 원래 위치로 가져다 놓으세요!
        </div>
        <div>--------여기에 정답을 제시해주세요--------</div>
      </>
    );
  }
}
