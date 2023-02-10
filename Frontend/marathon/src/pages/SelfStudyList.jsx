import style from "./SelfStudyList.module.css";
import Game1 from "img/game1.png";
import Game2 from "img/game2.png";
import Game3 from "img/game3.png";

export default function SelfStudyList() {
  return (
    <>
      <div
        className={style.main_banner}
        style={{ animation: "1s ease-in-out loadEffect1" }}
      >
        <div
          className={style.main_banner_words}
          style={{ animation: "1s ease-in-out loadEffect2" }}
        >
          <h2>스스로 학습</h2>
          <h4>혼자서도 준비된 단계별의 재활게임을 통해서</h4>
          <h4>능률있는 재활훈련을 진행해 보세요</h4>
        </div>
      </div>
      <div className="container">
        <div className={"inner_container " + style.container_games}>
          <div
            className={style.container_game}
            style={{ animation: "1s ease-in-out loadEffect3" }}
          >
            <img className={style.img_game} src={Game1} alt="학습 이미지" />
            <div>
              <div className={style.container_title}>
                <div className={style.title}>색깔 위치 맞추기</div>
                <div>
                  <button
                    className={style.btn_difficulty}
                    style={{ backgroundColor: "#63F282" }}
                    onClick={() =>
                      (window.location.href = "/self-study/1/easy")
                    }
                  >
                    초급
                  </button>
                  <button
                    className={style.btn_difficulty}
                    style={{ backgroundColor: "#FBDB35" }}
                    onClick={() =>
                      (window.location.href = "/self-study/1/normal")
                    }
                  >
                    중급
                  </button>
                  <button
                    className={style.btn_difficulty}
                    style={{ backgroundColor: "#FF4218" }}
                    onClick={() =>
                      (window.location.href = "/self-study/1/hard")
                    }
                  >
                    고급
                  </button>
                </div>
              </div>
              <div>
                집중력과 단기 기억력을 훈련하기 위해서 적합한 훈련입니다. 충분한
                시간을 가지고 집중해서 정답이 칠해진 블록을 기억하신 뒤 주어진
                모양과 똑같은 칸을 색칠해 주세요
              </div>
            </div>
          </div>
          <div
            className={style.container_game + " " + style.reverse}
            style={{ animation: "1s ease-in-out loadEffect2" }}
          >
            <div>
              <div className={style.container_title}>
                <div className={style.title}>그림 카드 맞추기</div>
                <div>
                  <button
                    className={style.btn_difficulty}
                    style={{ backgroundColor: "#63F282" }}
                    onClick={() =>
                      (window.location.href = "/self-study/2/easy")
                    }
                  >
                    초급
                  </button>
                  <button
                    className={style.btn_difficulty}
                    style={{ backgroundColor: "#FBDB35" }}
                    onClick={() =>
                      (window.location.href = "/self-study/2/normal")
                    }
                  >
                    중급
                  </button>
                  <button
                    className={style.btn_difficulty}
                    style={{ backgroundColor: "#FF4218" }}
                    onClick={() =>
                      (window.location.href = "/self-study/2/hard")
                    }
                  >
                    고급
                  </button>
                </div>
              </div>
              <div>
                단어 실어증을 해결하기 위한 솔루션입니다. 와병이후 분명히 아는
                단어이지만 머리속에 연결이 되지 않으시죠? 연습 그리고 또
                연습만이 정답입니다! 단계별로 차근차근 단어를 연상시키는 훈련을
                해 보아요
              </div>
            </div>
            <img className={style.img_game} src={Game2} alt="학습 이미지" />
          </div>
          <div
            className={style.container_game}
            style={{ animation: "1s ease-in-out loadEffect3" }}
          >
            <img className={style.img_game} src={Game3} alt="학습 이미지" />
            <div>
              <div className={style.container_title}>
                <div className={style.title}>동물 위치 맞추기</div>
                <div>
                  <button
                    className={style.btn_difficulty}
                    style={{ backgroundColor: "#63F282" }}
                    onClick={() =>
                      (window.location.href = "/self-study/3/easy")
                    }
                  >
                    초급
                  </button>
                  <button
                    className={style.btn_difficulty}
                    style={{ backgroundColor: "#FBDB35" }}
                    onClick={() =>
                      (window.location.href = "/self-study/3/normal")
                    }
                  >
                    중급
                  </button>
                  <button
                    className={style.btn_difficulty}
                    style={{ backgroundColor: "#FF4218" }}
                    onClick={() =>
                      (window.location.href = "/self-study/3/hard")
                    }
                  >
                    고급
                  </button>
                </div>
              </div>
              <div>
                단순히 맞는 칸을 칠하는 것을 넘어서 특정한 칸으로 특정한 모양을
                똑같이 옮기는 훈련입니다! 난이도가 상당하기 때문에 처음에는
                어려움을 겪으실 수도 있겠지만 재활도 진전이 있었고 이제 충분히
                자신감이 붙으셨다면 도전해 보세요!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
