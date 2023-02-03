import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecord, resetRecord } from "stores/game.store";
import commonStyle from "./Game.module.css";
import SelfStudyIntro from "../SelfStudyIntro";
import { setStage, setIsReady, setMode } from "stores/game.store";
import GIF from "img/gif/11.gif";
import style from "./Game3.module.css";

export default function NormalMode3() {
  const gameState = useSelector((state) => state.gameState);
  const dispatch = useDispatch();
  const row = 4; // 행 수
  const col = 4; // 열 수
  const size = 4; // 동물의 수
  const [answer, setAnswer] = useState([]);
  const [stageResult, setStageResult] = useState();

  /** (min <= 값 < max) 랜덤숫자 뽑기 */
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  /** 정답 확인 */
  const chkAnswer = (myAnswer) => {
    for (let y = 0; y < row; y++) {
      for (let x = 0; x < col; x++) {
        if (answer[y][x] !== myAnswer[y][x]) {
          setStageResult(false);
          dispatch(addRecord(false));
          return;
        }
      }
    }
    setStageResult(true);
    dispatch(addRecord(true));
  };

  /** 테이블을 그려주는 함수 */
  const renderingTable = (idx) => {
    if (answer.length === 0) return;

    const result = [];
    for (let y = 0; y < row; y++) {
      result.push(<tr key={y}>{renderingCol(y, idx)}</tr>);
    }
    return result;
  };

  /** 테이블 안의 컬럼을 그려주는 함수 */
  const renderingCol = (y, idx) => {
    const result = [];

    // 문제 풀기 세팅
    if (idx === 1) {
      for (let x = 0; x < col; x++) {
        result.push(<td className="drag_container" y={y} x={x} key={x}></td>);
      }
    }
    // 문제 세팅
    else {
      for (let x = 0; x < col; x++) {
        if (answer[y][x] === 0)
          result.push(<td className="drag_container" y={y} x={x} key={x}></td>);
        else if (answer[y][x] === 1)
          result.push(
            <td
              className={"drag_container " + style.draggable}
              y={y}
              x={x}
              key={x}
            >
              🦊
            </td>
          );
        else if (answer[y][x] === 2)
          result.push(
            <td
              className={"drag_container " + style.draggable}
              y={y}
              x={x}
              key={x}
            >
              🐸
            </td>
          );
        else if (answer[y][x] === 3)
          result.push(
            <td
              className={"drag_container " + style.draggable}
              y={y}
              x={x}
              key={x}
            >
              🐶
            </td>
          );
        else if (answer[y][x] === 4)
          result.push(
            <td
              className={"drag_container " + style.draggable}
              y={y}
              x={x}
              key={x}
            >
              🐱
            </td>
          );
      }
    }

    return result;
  };

  // 인트로 화면 띄울 때 세팅할 것
  useEffect(() => {
    dispatch(setMode("normal"));
    dispatch(setStage(0));
    dispatch(setIsReady(0));
    dispatch(resetRecord());
  }, []);

  /** 문제 세팅 */
  useEffect(() => {
    if (0 < gameState.stage && gameState.stage < 11) {
      // 랜덤 좌표가 들어갈 리스트
      let list = [];

      for (let i = 0; i < size; i++) {
        let newRow = -1;
        let newCol = -1;

        do {
          // 랜덤 좌표 뽑기
          newRow = random(0, row);
          newCol = random(0, col);

          // 이미 뽑은 좌표인지 확인하기
          let i = 0;
          for (; i < list.length; i++) {
            if (list[i][0] === newRow && list[i][1] === newCol) {
              break;
            }
          }

          // 이미 뽑은 적 없는 좌표임
          if (i === list.length) break;
        } while (true);

        list.push([newRow, newCol]);
      }

      // 이번 stage의 정답
      let tmp = Array.from(new Array(col), () => new Array(row).fill(0));

      for (let i = 0; i < size; i++) {
        let y = list[i][0];
        let x = list[i][1];

        tmp[y][x] = i + 1;
      }

      setAnswer(tmp);
    }
  }, [gameState.stage]);

  /** 드래그 앤 드롭 */
  useEffect(() => {
    if (gameState.isReady === 1) {
      let isFilled = Array.from(new Array(col), () => new Array(row).fill(0));
      const draggables = document.querySelectorAll(".draggable");
      const containers = document.querySelectorAll(".drag_container");

      let now_y = -1;
      let now_x = -1;

      draggables.forEach((draggable) => {
        /** 드래그 시작할 때 */
        draggable.addEventListener("dragstart", () => {
          draggable.classList.add("dragging");
        });

        /** 드래그 놓았을 때 */
        draggable.addEventListener("dragend", () => {
          draggable.classList.remove("dragging");
          let k = Number(draggable.getAttribute("k"));
          let pre_y = Number(draggable.getAttribute("pre_y"));
          let pre_x = Number(draggable.getAttribute("pre_x"));
          draggable.setAttribute("pre_y", now_y);
          draggable.setAttribute("pre_x", now_x);

          // 새로 이동한 좌표 표시
          isFilled[now_y][now_x] = k;
          // 예전에 있던 좌표 비우기
          if (pre_y !== -1 && pre_x !== -1) isFilled[pre_y][pre_x] = 0;
        });
      });

      containers.forEach((container) => {
        container.addEventListener("dragover", (e) => {
          const y = container.getAttribute("y");
          const x = container.getAttribute("x");

          e.preventDefault();
          // 해당 container에 들어있는 dragable 요소들 중, 제일 가까운 요소 말하는 듯
          const afterElement = getDragAfterElement(container, e.clientX);
          const draggable = document.querySelector(".dragging");

          // 최초 container라면
          if (!container.hasAttribute("y")) {
            // 해당 container에 들어있는 dragable 요소의 앞에 appendChild
            container.insertBefore(draggable, afterElement);
          }
          // 최초 container가 아니고, 해당 칸이 비어있다면 appendChild
          else if (afterElement === undefined && isFilled[y][x] === 0) {
            container.appendChild(draggable);
            now_y = y;
            now_x = x;
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
      return async () => {
        chkAnswer(isFilled);
      };
    }
  }, [gameState.isReady]);

  if (gameState.stage === 0) {
    return (
      <SelfStudyIntro
        mode={"normal"}
        title="도형의 위치를 기억해서 원래 위치로 가져다 놓는 게임입니다."
        gif={GIF}
      />
    );
  } else if (gameState.isReady === 0) {
    return (
      <>
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        <div className={commonStyle.title}>도형의 위치를 잘 기억해두세요.</div>
        <div className={style.gameBoard}>
          <table className={style.table + " game_3_table"}>
            <tbody>{renderingTable(0)}</tbody>
          </table>
        </div>
      </>
    );
  } else if (gameState.isReady === 1) {
    return (
      <>
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        <div className={commonStyle.title}>
          원래 위치로 도형을 가져다 놓으세요!
        </div>
        <div className={style.gameBoard}>
          <table className={style.table + " game_3_table"}>
            <tbody>{renderingTable(1)}</tbody>
          </table>
          <div className={style.figure_box + " drag_container"}>
            <button
              className={"draggable " + style.draggable}
              k="1"
              draggable
              pre_y="-1"
              pre_x="-1"
            >
              🦊
            </button>
            <button
              className={"draggable " + style.draggable}
              k="2"
              draggable
              pre_y="-1"
              pre_x="-1"
            >
              🐸
            </button>
            <button
              className={"draggable " + style.draggable}
              k="3"
              draggable
              pre_y="-1"
              pre_x="-1"
            >
              🐶
            </button>
            <button
              className={"draggable " + style.draggable}
              k="4"
              draggable
              pre_y="-1"
              pre_x="-1"
            >
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
          {stageResult ? "정답입니다😊" : "틀렸습니다😥"}
        </div>
        {/* <div className={style.gameBoard}>
          <table className={style.table + " game_3_table"}>
            <tbody>{renderingTable(0)}</tbody>
          </table>
        </div> */}
      </>
    );
  }
}
