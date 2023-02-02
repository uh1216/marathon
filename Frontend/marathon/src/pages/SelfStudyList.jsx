import { useNavigate } from "react-router-dom";
import style from "./SelfStudyList.module.css";

export default function SelfStudyList() {
  const navigate = useNavigate();
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
          <h4>국가공인 자격증을 보유한 의사소통 전문가를</h4>
          <h4>1:1 맞춤 수업으로 집에서 편하게 만나보세요</h4>
        </div>
      </div>
      <div className="container">
        <div className={"inner_container " + style.container_games}>
          <div
            className={style.container_game}
            style={{ animation: "1s ease-in-out loadEffect3" }}
          >
            <img
              className={style.img_game}
              src="https://blog.kakaocdn.net/dn/bSC1F2/btqKwQF1fX6/KpWl8bFYn5HmzlLVRJhFk1/img.jpg"
              alt="학습 이미지"
            />
            <div>
              <div className={style.container_title}>
                <div className={style.title}>색깔 위치 맞추기</div>
                <div>
                  <button
                    className={style.btn_difficulty}
                    style={{ backgroundColor: "#63F282" }}
                    onClick={() => navigate(`/self-study/1/easy`)}
                  >
                    초급
                  </button>
                  <button
                    className={style.btn_difficulty}
                    style={{ backgroundColor: "#FBDB35" }}
                    onClick={() => navigate(`/self-study/1/normal`)}
                  >
                    중급
                  </button>
                  <button
                    className={style.btn_difficulty}
                    style={{ backgroundColor: "#FF4218" }}
                    onClick={() => navigate(`/self-study/1/hard`)}
                  >
                    고급
                  </button>
                </div>
              </div>
              <div>
                이것은 게임이다. 이것은 게임이다. 이것은 게임이다. 이것은
                게임이다. 이것은 게임이다. 이것은 게임이다. 이것은 게임이다.
                이것은 게임이다. 이것은 게임이다. 이것은 게임이다. 이것은
                게임이다. 이것은 게임이다.
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
                    onClick={() => navigate(`/self-study/2/easy`)}
                  >
                    초급
                  </button>
                  <button
                    className={style.btn_difficulty}
                    style={{ backgroundColor: "#FBDB35" }}
                    onClick={() => navigate(`/self-study/2/normal`)}
                  >
                    중급
                  </button>
                  <button
                    className={style.btn_difficulty}
                    style={{ backgroundColor: "#FF4218" }}
                    onClick={() => navigate(`/self-study/2/hard`)}
                  >
                    고급
                  </button>
                </div>
              </div>
              <div>
                이것은 게임이다. 이것은 게임이다. 이것은 게임이다. 이것은
                게임이다. 이것은 게임이다. 이것은 게임이다. 이것은 게임이다.
                이것은 게임이다. 이것은 게임이다. 이것은 게임이다. 이것은
                게임이다. 이것은 게임이다.
              </div>
            </div>
            <img
              className={style.img_game}
              src="https://blog.kakaocdn.net/dn/bSC1F2/btqKwQF1fX6/KpWl8bFYn5HmzlLVRJhFk1/img.jpg"
              alt="학습 이미지"
            />
          </div>
          <div
            className={style.container_game}
            style={{ animation: "1s ease-in-out loadEffect3" }}
          >
            <img
              className={style.img_game}
              src="https://blog.kakaocdn.net/dn/bSC1F2/btqKwQF1fX6/KpWl8bFYn5HmzlLVRJhFk1/img.jpg"
              alt="학습 이미지"
            />
            <div>
              <div className={style.container_title}>
                <div className={style.title}>도형 위치 맞추기</div>
                <div>
                  <button
                    className={style.btn_difficulty}
                    style={{ backgroundColor: "#63F282" }}
                    onClick={() => navigate(`/self-study/3/easy`)}
                  >
                    초급
                  </button>
                  <button
                    className={style.btn_difficulty}
                    style={{ backgroundColor: "#FBDB35" }}
                    onClick={() => navigate(`/self-study/3/normal`)}
                  >
                    중급
                  </button>
                  <button
                    className={style.btn_difficulty}
                    style={{ backgroundColor: "#FF4218" }}
                    onClick={() => navigate(`/self-study/3/hard`)}
                  >
                    고급
                  </button>
                </div>
              </div>
              <div>
                이것은 게임이다. 이것은 게임이다. 이것은 게임이다. 이것은
                게임이다. 이것은 게임이다. 이것은 게임이다. 이것은 게임이다.
                이것은 게임이다. 이것은 게임이다. 이것은 게임이다. 이것은
                게임이다. 이것은 게임이다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
