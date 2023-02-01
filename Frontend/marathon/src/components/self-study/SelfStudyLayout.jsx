import { useNavigate } from "react-router-dom";
import style from "./SelfStudyLayout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setStage, setType, setIsReady } from "stores/game.store";
import { useEffect } from "react";

export default function SelfStudyLayout({ type, children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gameState = useSelector((state) => state.gameState);

  const games = [
    { title: "색깔 위치 맞추기" },
    { title: "그림 카드 맞추기" },
    { title: "도형 위치 맞추기" },
  ];

  useEffect(() => {
    dispatch(setType(type));
  }, []);

  return (
    <div className={style.main_container}>
      <div className={style.title_container}>
        <h2>{games[type - 1].title}</h2>
        <div className={style.btns_container}>
          <div>
            <button
              className={
                gameState.mode === "easy"
                  ? style.btn_selected + " " + style.btn_difficulty
                  : style.btn_difficulty
              }
              style={{ backgroundColor: "#63F282" }}
              onClick={() => navigate(`/self-study/${type}/easy/intro`)}
            >
              초급
            </button>
            <button
              className={
                gameState.mode === "normal"
                  ? style.btn_selected + " " + style.btn_difficulty
                  : style.btn_difficulty
              }
              style={{ backgroundColor: "#FBDB35" }}
              onClick={() => navigate(`/self-study/${type}/normal/intro`)}
            >
              중급
            </button>
            <button
              className={
                gameState.mode === "hard"
                  ? style.btn_selected + " " + style.btn_difficulty
                  : style.btn_difficulty
              }
              style={{ backgroundColor: "#FF4218" }}
              onClick={() => navigate(`/self-study/${type}/hard/intro`)}
            >
              고급
            </button>
          </div>
          <div>
            <button
              className={style.btn_etc}
              onClick={() => navigate("/self-study-list")}
            >
              목록보기
            </button>
            <button
              className={style.btn_etc}
              onClick={() => navigate("/mypage/statistics")}
            >
              기록보기
            </button>
          </div>
        </div>
      </div>
      <div className={style.game_container}>{children}</div>
      <div className={style.btn_container}>
        {gameState.stage < 1 ? (
          <button
            className={style.btn_main}
            onClick={() => {
              navigate(`/self-study/${type}/${gameState.mode}/game`);
              dispatch(setStage(1));
            }}
          >
            시 작
          </button>
        ) : gameState.stage <= 10 && gameState.isReady ? (
          <button
            className={style.btn_main}
            onClick={() => {
              dispatch(setIsReady(false));
            }}
          >
            도 전
          </button>
        ) : gameState.stage < 10 && !gameState.isReady ? (
          <button
            className={style.btn_main}
            onClick={() => {
              dispatch(setStage(Number(gameState.stage) + 1));
              dispatch(setIsReady(true));
            }}
          >
            다 음
          </button>
        ) : gameState.stage === 10 && !gameState.isReady ? (
          <button
            className={style.btn_main}
            onClick={() => {
              navigate(`/self-study/${type}/result`);
              dispatch(setStage(Number(gameState.stage) + 1));
            }}
          >
            다 음
          </button>
        ) : (
          <button
            className={style.btn_main}
            onClick={() => {
              navigate(`/self-study/${type}/${gameState.mode}/game`);
              dispatch(setStage(1));
            }}
          >
            다시 하기
          </button>
        )}
      </div>
    </div>
  );
}
