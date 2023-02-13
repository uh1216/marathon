import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecord, resetRecord } from "stores/game.store";
import commonStyle from "./Game.module.css";
import SelfStudyIntro from "../SelfStudyIntro";
import { setStage, setIsReady, setMode, setType } from "stores/game.store";
import GIF from "img/gif/game2_hard.gif";
import CARD_BACK from "img/card_back.jpg";
import style from "./Game2.module.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import clickSound from "sound/click.mp3";
import correctSound from "sound/correct.mp3";
import wrongSound from "sound/wrong.mp3";

export default function EasyMode1() {
  const gameState = useSelector((state) => state.gameState);
  const dispatch = useDispatch();
  const gameData = [
    {
      url: "https://cdn.pixabay.com/photo/2020/06/12/22/04/lion-5292016_960_720.jpg",
      answer: "사자",
    },
    {
      url: "https://gnews.gg.go.kr/OP_UPDATA/UP_DATA/_FILEZ/202112/20211227054431183687488.jpg",
      answer: "호랑이",
    },
    {
      url: "https://cdn.eyesmag.com/content/uploads/posts/2022/08/08/main-ad65ae47-5a50-456d-a41f-528b63071b7b.jpg",
      answer: "고양이",
    },
    {
      url: "https://dl0.creation.com/articles/p136/c13624/red-fox.jpg",
      answer: "여우",
    },
    {
      url: "https://dimg.donga.com/wps/NEWS/IMAGE/2020/11/16/103972000.1.jpg",
      answer: "돼지",
    },
    {
      url: "https://w.namu.la/s/205c45f193fed386e9d8e39869e3f2c6bebfb39bb8f7b45215fce800debeb34862fadc0c5dccdd79b7f88768a0680a0661216cce7771acbfe1cba7ae097583c91da1b7759224c805212c579783b3b1dd99263930007a97b0f0ca23696974eccf4febbd63b87c985cb026f9d5ce00ce0d",
      answer: "코끼리",
    },
    {
      url: "https://blog.kakaocdn.net/dn/pACiJ/btq6DS2UKIX/ArAcjFRTzA1eh2AEfD2LD0/img.jpg",
      answer: "원숭이",
    },
    {
      url: "https://cdn.gjdream.com/news/photo/old/news/contents/UPFILE/2019/20190707497381.jpg",
      answer: "토끼",
    },
    {
      url: "https://pds.joongang.co.kr//news/component/htmlphoto_mmdata/201712/30/f886d305-bd3e-4b18-9b13-6ee8766ee6dd.jpg",
      answer: "늑대",
    },
    {
      url: "https://w.namu.la/s/b8e7f427d377cdb94696db8eb193494f0f5b745abdf5e2577a89de80607e5aad0a8306842f9123eb6d265e72825c645c4f27c3c1fb6590cff420f50f473b650bf4b7f373801c029ea3ce36d9d661cb00cd31627f4e03c1da11cd744ba0653ebd",
      answer: "다람쥐",
    },
    {
      url: "https://img.seoul.co.kr/img/upload/2017/01/01/SSI_20170101181146.jpg",
      answer: "닭",
    },
  ];

  /** 인트로 단계에서 어떤 문제가 나올지 10문제를 저장한 배열*/
  const [quiz, setQuiz] = useState([]);

  /** 사용자가 입력한 정답을 기록*/
  const [selected, setSelected] = useState("");

  /** 선택이 맞았는지 틀렸는지를 기록*/
  const [stageResult, setStageResult] = useState("");

  /** 인트로 단계에서 어떤 문제를 고를지 세팅*/
  const craeteQuiz = () => {
    const quizList = [];
    for (let i = 0; i < 10; i++) {
      here: while (true) {
        const random = Math.floor(Math.random() * gameData.length);

        // 중복된 선지가 있는지 검사
        for (let j = 0; j < quizList.length; j++) {
          if (random === quizList[j]) {
            continue here;
          }
        }

        quizList.push(random);
        break;
      }
    }

    return quizList;
  };

  // 인트로 화면 띄울 때 세팅할 것
  useEffect(() => {
    dispatch(setType(2));
    dispatch(setMode("hard"));
    dispatch(setStage(0));
    dispatch(setIsReady(0));
    dispatch(resetRecord());
    setQuiz(craeteQuiz());
  }, []);

  /** 게임 스테이지 넘어갈때마다 새로운 선지 생성, 선택지, 정답결과 초기화 */
  useEffect(() => {
    if (gameState.stage !== 0) {
      setStageResult(false);
      setSelected("");
    }
  }, [gameState.stage]);

  /** 정답을 체점한다 */
  useEffect(() => {
    if (gameState.isReady == 2) {
      if (selected === gameData[quiz[gameState.stage - 1]].answer) {
        setStageResult(true);
        dispatch(addRecord(true));
      } else dispatch(addRecord(false));
    }
  }, [gameState.isReady]);

  // 인트로 화면
  if (gameState.stage === 0) {
    return (
      <SelfStudyIntro
        mode={"easy"}
        title="그림카드를 보고 알맞은 단어를 골라주세요"
        gif={GIF}
      />
    );
  } else if (gameState.isReady == 0) {
    return (
      <>
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        <div className={commonStyle.title}>
          그림카드를 보고 알맞은 단어를 골라주세요
        </div>
        <div>
          <div className={style.flip_outer}>
            <div className={style.flip_inner}>
              <img
                src={CARD_BACK}
                alt=""
                className={style.front}
                style={{ animation: "1s loadEffect1" }}
              />
            </div>
          </div>
          <div className={style.input}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="단어를 입력하세요!"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={selected}
                onChange={(e) => {
                  setSelected(e.target.value);
                }}
              />
            </InputGroup>
          </div>
        </div>
      </>
    );
  } else if (gameState.isReady == 1) {
    return (
      <>
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        <div className={commonStyle.title}>
          그림카드를 보고 알맞은 단어를 골라주세요
        </div>
        <div>
          <div className={style.flip_outer}>
            <div
              className={style.flip_inner}
              style={{ animation: "1s rotateCard" }}
            >
              <img src={CARD_BACK} alt="" className={style.front} />
              <img
                src={gameData[quiz[gameState.stage - 1]].url}
                style={{
                  borderRadius: "5px",
                  border: "2px solid black",
                  objectFit: "cover",
                }}
                alt=""
                className={style.back}
              />
            </div>
            <img
              src={gameData[quiz[gameState.stage - 1]].url}
              alt=""
              className={style.real_front}
              style={{
                animation: "1s rotateCard_opacity_no",
                objectFit: "cover",
              }}
            />
          </div>
          <div className={style.input}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="단어를 입력하세요!"
                aria-label="Username"
                value={selected}
                aria-describedby="basic-addon1"
                onChange={(e) => {
                  setSelected(e.target.value);
                }}
              />
            </InputGroup>
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
        <div className={commonStyle.stage}>{gameState.stage} / 10</div>
        <div className={commonStyle.title}>
          {stageResult ? (
            <span style={{ color: "green" }}>정답입니다😊</span>
          ) : (
            <span style={{ color: "red" }}>틀렸습니다😥</span>
          )}
        </div>
        <div>
          <div className={style.flip_outer}>
            <div
              className={style.flip_inner}
              style={{
                animation: "0.7s rotateCard2",
              }}
            >
              <img
                src={gameData[quiz[gameState.stage - 1]].url}
                style={{
                  borderRadius: "5px",
                  border: "2px solid black",
                  objectFit: "cover",
                }}
                alt=""
                className={style.front}
              />
              <div
                className={style.back}
                style={{
                  border: "2px solid black",
                  backfaceVisibility: "hidden",
                  paddingTop: "85px",
                }}
              >
                <h3>{gameData[quiz[gameState.stage - 1]].answer}</h3>
              </div>
            </div>
            <div
              className={style.real_front}
              style={{
                animation: "0.7s rotateCard_opacity_no",
                backgroundColor: "white",
                textAlign: "center",
                paddingTop: "85px",
              }}
            >
              <h3>{gameData[quiz[gameState.stage - 1]].answer}</h3>
            </div>
          </div>
          <div className={style.input}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="단어를 입력하세요!"
                disabled
                value={selected}
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => {
                  setSelected(e.target.value);
                }}
              />
            </InputGroup>
          </div>
        </div>
      </>
    );
  }
}
