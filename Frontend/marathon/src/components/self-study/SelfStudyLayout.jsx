import { useNavigate } from "react-router-dom";
import style from "./SelfStudyLayout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setStage, setIsReady } from "stores/game.store";
import { useEffect } from "react";

export default function SelfStudyLayout({ type, children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const gameState = useSelector((state) => state.gameState);

  const games = [
    { title: "색깔 위치 맞추기" },
    { title: "그림 카드 맞추기" },
    { title: "동물 위치 맞추기" },
  ];

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

  return (
    <div className={style.main_container}>
      <div className={style.title_container}>
        <h2 style={{ maxWidth: "33%" }}>{games[type - 1].title}</h2>
        <div className={style.btns_container}>
          <div>
            <button
              className={
                gameState.mode === "easy"
                  ? style.btn_selected + " " + style.btn_difficulty
                  : style.btn_difficulty
              }
              style={{ backgroundColor: "#63F282" }}
              onClick={() => {
                window.location.href = `/self-study/${type}/easy`;
              }}
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
              onClick={() => {
                window.location.href = `/self-study/${type}/normal`;
              }}
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
              onClick={() => {
                window.location.href = `/self-study/${type}/hard`;
              }}
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
            {state.loginUser.userRole === "patient" ? (
              <button
                className={style.btn_etc}
                onClick={() => navigate("/mypage/statistics/1")}
              >
                기록보기
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className={style.game_container}>{children}</div>
      <div className={style.btn_container}>
        {gameState.stage < 1 ? (
          <button
            className={style.btn_main}
            onClick={() => {
              dispatch(setIsReady(0));
              dispatch(setStage(1));
            }}
          >
            시 작
          </button>
        ) : gameState.stage <= 10 && gameState.isReady === 0 ? (
          <button
            className={style.btn_main}
            onClick={() => {
              dispatch(setIsReady(1));
            }}
          >
            도 전
          </button>
        ) : gameState.stage <= 10 && gameState.isReady === 1 ? (
          <button
            className={style.btn_main}
            onClick={() => {
              dispatch(setIsReady(2));
            }}
          >
            정답 보기
          </button>
        ) : gameState.stage < 10 && gameState.isReady === 2 ? (
          <button
            className={style.btn_main}
            onClick={() => {
              dispatch(setStage(Number(gameState.stage) + 1));
              dispatch(setIsReady(0));
            }}
          >
            다 음
          </button>
        ) : gameState.stage === 10 && gameState.isReady === 2 ? (
          <button
            className={style.btn_main}
            onClick={() => {
              navigate(`/self-study/${type}/result`);
              dispatch(setStage(Number(gameState.stage) + 1));
              dispatch(setIsReady(0));
            }}
          >
            다 음
          </button>
        ) : (
          <button
            className={style.btn_main}
            onClick={() => {
              navigate(`/self-study/${type}/${gameState.mode}`);
              dispatch(setStage(0));
              dispatch(setIsReady(0));
            }}
          >
            다시 하기
          </button>
        )}
      </div>
    </div>
  );
}
