import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecord, resetRecord } from "stores/game.store";
import commonStyle from "./Game.module.css";
import SelfStudyIntro from "../SelfStudyIntro";
import { setStage, setIsReady, setMode } from "stores/game.store";
import GIF from "img/gif/11.gif";
import style from "./EasyMode3.module.css";
import figure from "img/gitlab.png";

export default function EasyMode1() {
  const gameState = useSelector((state) => state.gameState);
  const dispatch = useDispatch();

  // 인트로 화면 띄울 때 세팅할 것
  useEffect(() => {
    dispatch(setMode("easy"));
    dispatch(setStage(0));
    dispatch(setIsReady(0));
  }, []);

  useEffect(() => {
    /** 1단계라면 점수 기록을 초기화 */
    if (gameState.stage == 1 && gameState.isReady == 0) {
      dispatch(resetRecord());
    }

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
  useEffect(() => {
    if (gameState.isReady == 1) {
      const draggables = document.querySelectorAll(".draggable");
      const containers = document.querySelectorAll(".drag_container");

      draggables.forEach((draggable) => {
        draggable.addEventListener("dragstart", () => {
          draggable.classList.add("dragging");
        });

        draggable.addEventListener("dragend", () => {
          draggable.classList.remove("dragging");
        });
      });

      containers.forEach((container) => {
        container.addEventListener("dragover", (e) => {
          e.preventDefault();
          const afterElement = getDragAfterElement(container, e.clientX);
          const draggable = document.querySelector(".dragging");
          if (afterElement === undefined) {
            container.appendChild(draggable);
          } else {
            container.insertBefore(draggable, afterElement);
          }
        });
      });

      function getDragAfterElement(container, x) {
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
      }
    }
  }, [gameState.isReady]);
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
      result.push(<td className="drag_container" key={x}></td>);
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
          원래 위치로 도형을 가져다 놓으세요!
        </div>
        <div className={style.gameBoard}>
          <table className={style.table}>
            <tbody>{renderingTable()}</tbody>
          </table>
          <div className={style.figure_box + " drag_container"}>
            <button className="draggable" draggable="true">
              🦊
            </button>
            <button className="draggable" draggable="true">
              🐸
            </button>

            <button className="draggable" draggable="true">
              🐶
            </button>
            <button className="draggable" draggable="true">
              🐱
            </button>
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
