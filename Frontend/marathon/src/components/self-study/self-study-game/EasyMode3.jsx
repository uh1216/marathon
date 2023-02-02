import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecord, resetRecord } from "stores/game.store";
import commonStyle from "./Game.module.css";
import SelfStudyIntro from "../SelfStudyIntro";
import { setStage, setIsReady, setMode } from "stores/game.store";
import GIF from "img/gif/11.gif";
import style from "./EasyMode3.module.css";
import figure from "img/gitlab.png";

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
    dispatch(setMode("easy"));
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

  ///////////////////////////// 드래그 앤 드롭 start /////////////////////////////
  // const draggables = document.querySelectorAll(".draggable");
  // const containers = document.querySelectorAll(".drag_container");

  const dragStart = (e) => {
    console.log(e);
    e.target.classList.add("dragging");
  };
  const dragEnd = (e) => {
    e.target.classList.remove("dragging");
  };
  const dragOver = (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(e.target, e.clientX);
    const draggable = document.querySelector(".dragging");
    if (afterElement === undefined) {
      e.target.appendChild(draggable);
    } else {
      e.target.insertBefore(draggable, afterElement);
    }
  };

  const getDragAfterElement = (container, x) => {
    const draggableElements = [
      ...container.querySelectorAll(".draggable:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        // console.log(offset);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  };

  ///////////////////////////// 드래그 앤 드롭 end /////////////////////////////

  /////////////////

  const row = 4;
  const col = 4;

  /** 테이블을 그려주는 함수 */
  const renderingTable = () => {
    const result = [];
    for (let y = 0; y < row; y++) {
      result.push(<tr key={y}>{renderingCol()}</tr>);
    }
    return result;
  };

  /** 테이블 안의 컬럼을 그려주는 함수 */
  const renderingCol = () => {
    const result = [];
    for (let x = 0; x < col; x++) {
      result.push(<td onDragOver={(e) => dragOver(e)} key={x}></td>);
    }
    return result;
  };

  /////////////////

  if (gameState.stage == 0) {
    return (
      <SelfStudyIntro
        mode={"easy"}
        title="도형의 위치를 기억해서 원래 위치로 가져다 놓는 게임입니다."
        gif={GIF}
      />
    );
  } else if (gameState.isReady) {
    return (
      <>
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        <div className={commonStyle.title}>
          원래 위치로 도형을 가져다 놓으세요!
        </div>
        <div className={style.gameBoard}>
          <table className={style.table}>
            <tbody>{renderingTable()}</tbody>
          </table>
          <div onDragOver={(e) => dragOver(e)}>
            <div
              onDragStart={(e) => dragStart(e)}
              onDragEnd={(e) => dragEnd(e)}
              draggable="true"
            >
              🦊
            </div>
            <div
              onDragStart={(e) => dragStart(e)}
              onDragEnd={(e) => dragEnd(e)}
              draggable="true"
            >
              🐸
            </div>
            <div
              onDragStart={(e) => dragStart(e)}
              onDragEnd={(e) => dragEnd(e)}
              draggable="true"
            >
              🐶
            </div>
            <div
              onDragStart={(e) => dragStart(e)}
              onDragEnd={(e) => dragEnd(e)}
              draggable="true"
            >
              🐱
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        <div className={commonStyle.title}>
          도형의 위치를 기억해서 원래 위치로 가져다 놓으세요!
        </div>
        <div>--------여기에 정답을 제시해주세요--------</div>
      </>
    );
  }
}
