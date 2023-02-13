import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addRecord, resetRecord, setType } from "stores/game.store";
import commonStyle from "./Game.module.css";
import SelfStudyIntro from "../SelfStudyIntro";
import { setStage, setIsReady, setMode } from "stores/game.store";
import GIF from "img/gif/game3_easy.gif";
import style from "./Game3.module.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import clickSound from "sound/click.mp3";
import correctSound from "sound/correct.mp3";
import wrongSound from "sound/wrong.mp3";

export default function EasyMode1() {
  const gameState = useSelector((state) => state.gameState);
  const dispatch = useDispatch();
  const row = 3; // 행 수
  const col = 3; // 열 수
  const size = 3; // 동물의 수
  const animals = ["", "🦊", "🐸", "🐶", "🐱"];
  const [answer, setAnswer] = useState([]);
  const [myAnswer, setMyAnswer] = useState([]);
  const [stageResult, setStageResult] = useState();
  const navigate = useNavigate();

  // 모바일일때 돌아가게 만들기
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  /** (min <= 값 < max) 랜덤숫자 뽑기 */
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  /** 정답 확인 */
  const chkAnswer = () => {
    for (let y = 0; y < row; y++) {
      for (let x = 0; x < col; x++) {
        // 틀렸음
        if (answer[y][x] !== myAnswer[y][x]) {
          setStageResult(false);
          dispatch(addRecord(false));
          return;
        }
      }
    }
    // 맞았음
    setStageResult(true);
    dispatch(addRecord(true));
  };

  /** 테이블을 그려주는 함수
   * idx == 0 이면 문제(정답) 세팅
   * idx == 1 이면 그냥 비어있는 테이블 세팅
   * idx == 2 이면 정답이랑 내 정답 비교한 테이블 세팅
   */
  const renderingTable = (idx) => {
    if (answer.length === 0) return;

    const result = [];
    for (let y = 0; y < row; y++) {
      result.push(<tr key={uuidv4()}>{renderingCol(y, idx)}</tr>);
    }
    return result;
  };

  /** 테이블 안의 컬럼을 그려주는 함수 */
  const renderingCol = (y, idx) => {
    const result = [];

    // 문제 풀기 세팅
    if (idx === 1) {
      for (let x = 0; x < col; x++) {
        result.push(
          <td className="drag_container" y={y} x={x} key={uuidv4()}></td>
        );
      }
    }
    // 문제 세팅
    else if (idx === 0) {
      for (let x = 0; x < col; x++) {
        result.push(
          <td
            className="drag_container"
            style={{ fontSize: "40px" }}
            y={y}
            x={x}
            key={uuidv4()}
          >
            {animals[answer[y][x]]}
          </td>
        );
      }
    }
    // 정답 vs 내정답 세팅
    else if (idx === 2) {
      for (let x = 0; x < col; x++) {
        if (answer[y][x] === 0) {
          // 비어있어야 정답인데, 비어있지 않음
          if (myAnswer[y][x] !== 0) {
            result.push(
              <td
                className="drag_container"
                style={{ fontSize: "40px", position: "relative" }}
                y={y}
                x={x}
                key={uuidv4()}
              >
                {animals[answer[y][x]]}
                <div className={style.result}>❌</div>
              </td>
            );
          }
          // 비어있어야 정답이고, 비어있음
          else {
            result.push(
              <td className="drag_container" y={y} x={x} key={uuidv4()}></td>
            );
          }
        } else {
          // 동물이 들어있는게 정답인데, 동물이 없음
          if (myAnswer[y][x] === 0) {
            result.push(
              <td
                className="drag_container"
                style={{
                  fontSize: "40px",
                  position: "relative",
                  opacity: "50%",
                }}
                y={y}
                x={x}
                key={uuidv4()}
              >
                {animals[answer[y][x]]}
              </td>
            );
          }
          // 동물이 들어있는게 정답인데, 동물이 다름
          else if (myAnswer[y][x] !== answer[y][x]) {
            result.push(
              <td
                className="drag_container"
                style={{ fontSize: "40px", position: "relative" }}
                y={y}
                x={x}
                key={uuidv4()}
              >
                {animals[myAnswer[y][x]]}
                <div className={style.result}>❌</div>
              </td>
            );
          }
          // 동물이 들어있는게 정답이고, 동물이 일치함
          else {
            result.push(
              <td
                className="drag_container"
                style={{ fontSize: "40px", position: "relative" }}
                y={y}
                x={x}
                key={uuidv4()}
              >
                {animals[myAnswer[y][x]]}
                <div className={style.result}>⭕</div>
              </td>
            );
          }
        }
      }
    }

    return result;
  };

  useEffect(() => {
    if (isMobile()) {
      Swal.fire({
        icon: "warning",
        title: "",
        text: "모바일에서는 지원하지 않는 게임입니다. 빠르게 기능을 업데이트 하도록 하겠습니다!",
        confirmButtonText: "닫기",
      });
      navigate("/self-study-list");
    }
  }, []);

  // 인트로 화면 띄울 때 세팅할 것
  useEffect(() => {
    dispatch(setType(3));
    dispatch(setMode("easy"));
    dispatch(setStage(0));
    dispatch(setIsReady(0));
    dispatch(resetRecord());
  }, []);

  /** 문제 세팅 */
  useEffect(() => {
    // 나의 정답 초기화
    setMyAnswer(Array.from(new Array(row), () => new Array(col).fill(0)));

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
      let tmp = Array.from(new Array(row), () => new Array(col).fill(0));

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
          myAnswer[now_y][now_x] = k;
          // 예전에 있던 좌표 비우기
          if (pre_y !== -1 && pre_x !== -1) myAnswer[pre_y][pre_x] = 0;
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
          else if (afterElement === undefined && myAnswer[y][x] === 0) {
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
            const offset = x - box.left - (box.width / 11) * 2;
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
      return () => {
        chkAnswer();
      };
    }
  }, [gameState.isReady]);

  if (gameState.stage === 0) {
    return (
      <SelfStudyIntro
        mode={"easy"}
        title="동물의 위치를 기억해서 원래 위치로 가져다 놓는 게임입니다."
        gif={GIF}
      />
    );
  } else if (gameState.isReady === 0) {
    return (
      <>
        <div className={commonStyle.stage}>{gameState.stage} /10</div>
        <div className={commonStyle.title}>동물의 위치를 잘 기억해두세요.</div>
        <div className={style.gameBoard + " " + style.marginTop}>
          <table className={style.table + " game_3_table"}>
            <tbody>{renderingTable(0)}</tbody>
          </table>
        </div>
      </>
    );
  } else if (gameState.isReady === 1) {
    return (
      <>
        <div className={commonStyle.stage}>{gameState.stage} /10</div>
        <div className={commonStyle.title}>
          원래 위치로 동물을 가져다 놓으세요!
        </div>
        <div className={style.gameBoard + " " + style.marginTop}>
          <table className={style.table + " game_3_table"}>
            <tbody>{renderingTable(1)}</tbody>
          </table>
          <div className={style.figure_box + " drag_container"}>
            {[1, 2, 3].map((i) => (
              <button
                className={"draggable " + style.draggable}
                key={i}
                k={i}
                draggable
                pre_y="-1"
                pre_x="-1"
              >
                {animals[i]}
              </button>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {stageResult ? (
          <audio src={correctSound} autoPlay />
        ) : (
          <audio src={wrongSound} autoPlay />
        )}
        <div className={commonStyle.stage}>{gameState.stage} /10</div>
        <div className={commonStyle.title}>
          {stageResult ? "정답입니다 😊" : "틀렸습니다 😥"}
        </div>
        <div className={style.gameBoard + " " + style.marginTop}>
          <table className={style.table + " game_3_table"}>
            <tbody>{renderingTable(2)}</tbody>
          </table>
        </div>
      </>
    );
  }
}
