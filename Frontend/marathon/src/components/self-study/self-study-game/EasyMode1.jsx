import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecord, resetRecord, setType } from "stores/game.store";
import commonStyle from "./Game.module.css";
import style from "./EasyMode1.module.css";
import SelfStudyIntro from "../SelfStudyIntro";
import { setStage, setIsReady, setMode } from "stores/game.store";
import GIF from "img/gif/game1_easy.gif";
import { v4 as uuidv4 } from "uuid";

import clickSound from "sound/click.mp3";
import correctSound from "sound/correct.mp3";
import wrongSound from "sound/wrong.mp3";

export default function EasyMode1() {
  const gameState = useSelector((state) => state.gameState);
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [mySelect, setMySelect] = useState([
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ]);
  const refClickSound = useRef();

  /** 클릭 시 효과음 */
  const playClickSound = () => {
    refClickSound.current.play();
  };

  // 인트로 화면 띄울 때 세팅할 것
  useEffect(() => {
    dispatch(setType(1));
    dispatch(setMode("easy"));
    dispatch(setStage(0));
    dispatch(setIsReady(0));
    dispatch(resetRecord());
  }, []);

  useEffect(() => {
    if (gameState.isReady === 2) {
      /** 정답 채우기 */
      if (JSON.stringify(quiz) === JSON.stringify(mySelect)) {
        dispatch(addRecord(true));
      } else dispatch(addRecord(false));
    }
  }, [gameState.isReady]);

  /** 게임 스테이지 넘어갈때마다 새로운 문제 생성 */
  useEffect(() => {
    setQuiz(craeteQuiz());
    setMySelect(["0", "0", "0", "0", "0", "0", "0", "0", "0"]);
  }, [gameState.stage]);

  /** 초기 문제 생성 위한 코드*/
  const craeteQuiz = () => {
    const quizList = ["0", "0", "0", "0", "0", "0", "0", "0", "0"];
    for (let i = 0; i < 5; i++) {
      while (1) {
        const rand = Math.round(Math.random() * 8);
        if (quizList[rand] === "0") {
          quizList[rand] = "1";
          break;
        }
      }
    }
    return quizList;
  };

  /** 버튼 클릭 시 상태 바뀌는 함수 */
  const onChange = (e) => {
    playClickSound();
    let index = e.target.value;
    let arr = [...mySelect];
    index[index.length - 1] === "0"
      ? (arr[Number(index.slice(0, -1))] = "1")
      : (arr[Number(index.slice(0, -1))] = "0");
    setMySelect(arr);
  };

  if (gameState.stage === 0) {
    return (
      <SelfStudyIntro
        mode={"easy"}
        title="주어진 화면에서 색칠된 부분을 기억해서 맞추는 게임입니다."
        gif={GIF}
      />
    );
  } else if (gameState.isReady === 0) {
    const button_arr = [];
    quiz.forEach((ans, index) => {
      ans === "1"
        ? button_arr.push(
            <button
              key={uuidv4()}
              className={style.button_answer}
              value={index.toString() + ans}
              disabled
            ></button>
          )
        : button_arr.push(
            <button
              key={uuidv4()}
              className={style.button_blank}
              value={index.toString() + ans}
              disabled
            ></button>
          );
    });

    return (
      <>
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        <div className={style.title}>색칠된 부분을 기억하세요</div>
        <div className={style.content}>
          <div className={style.board}>{button_arr}</div>
        </div>
      </>
    );
  } else if (gameState.isReady === 1) {
    const button_arr2 = [];
    mySelect.forEach((val, index) => {
      val.toString() === "1"
        ? button_arr2.push(
            <button
              key={uuidv4()}
              className={style.button_selected}
              value={index.toString() + val}
              onClick={onChange}
            ></button>
          )
        : button_arr2.push(
            <button
              key={uuidv4()}
              className={style.button_blank}
              value={index.toString() + val}
              onClick={onChange}
            ></button>
          );
    });
    return (
      <>
        <audio ref={refClickSound} src={clickSound} />
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        <div className={style.title}>색칠되었던 곳을 클릭해주세요</div>
        <div className={style.content}>
          <div className={style.board}>{button_arr2}</div>
        </div>
      </>
    );
  } else {
    const button_arr3 = [];
    quiz.forEach((ans, index) => {
      /** 정답 칸을 클릭 안한 경우 */
      if (quiz[index] === "1" && mySelect[index] !== quiz[index]) {
        button_arr3.push(
          <button
            key={uuidv4()}
            className={style.button_answer_noselect}
            value={index.toString() + 3}
            disabled
          ></button>
        );
        /** 오답 칸을 클릭 한 경우 */
      } else if (quiz[index] !== mySelect[index]) {
        button_arr3.push(
          <button
            key={uuidv4()}
            className={style.button_incorrect}
            value={index.toString() + 3}
            disabled
          ></button>
        );
        /** 정답 칸을 클릭한 경우 */
      } else if (mySelect[index] === "1" && quiz[index] === mySelect[index]) {
        button_arr3.push(
          <button
            key={uuidv4()}
            className={style.button_correct}
            value={index.toString() + 2}
            disabled
          ></button>
        );
      } else {
        button_arr3.push(
          <button
            key={uuidv4()}
            className={style.button_blank}
            value={index.toString() + 0}
            disabled
          ></button>
        );
      }
    });

    return (
      <>
        {JSON.stringify(quiz) === JSON.stringify(mySelect) ? (
          <audio src={correctSound} autoPlay />
        ) : (
          <audio src={wrongSound} autoPlay />
        )}
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        {JSON.stringify(quiz) === JSON.stringify(mySelect) ? (
          <div className={style.title}>
            <span className={style.correct_text}>정답</span> 입니다
          </div>
        ) : (
          <div className={style.title}>
            <span className={style.incorrect_text}>오답</span> 입니다
          </div>
        )}

        <div className={style.content}>
          <div className={style.board}>{button_arr3}</div>
        </div>
      </>
    );
  }
}
