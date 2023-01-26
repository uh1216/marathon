import React from "react";
import style from "./Main.module.css";
import Main2 from "img/main_2.png";
import Main3 from "img/main_3.png";
import Main4 from "img/main_4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();
  return (
    <>
      <div className={style.main_banner}>
        <div className={style.main_banner_words}>
          <h2>화상 언어재활 서비스</h2>
          <h4>국가공인 자격증을 보유한 의사소통 전문가를</h4>
          <h4>1:1 맞춤 수업으로 집에서 편하게 만나보세요</h4>
          <button
            className={style.button}
            style={{ marginTop: "20px" }}
            onClick={() => {
              navigate("/consult-enroll");
            }}
          >
            무료 상담 신청하기
          </button>
        </div>
      </div>
      <div className="container">
        <div className="inner_container" style={{ fontSize: "1.2em" }}>
          <div className={style.main_color_board}>
            <h3>
              왜 <span style={{ color: "#52A068" }}>말</span>아톤 일까요?
            </h3>
            <p> 재활이란 멈추지 않는 꾸준한 마라톤과 같습니다. </p>
            <p>과정과정이 숨이차고 별로 나아가지 못한 것 같지만 </p>
            <p>도착점에서 돌아보면 정말 많은 점이 변화 했음을 깨닫게 됩니다.</p>
            <br />
            <p>
              저희 <span style={{ color: "#52A068" }}>말</span>아톤이 일상
              복귀로의 완주까지 곁에서 도와드리겠습니다.
            </p>
          </div>
          <div className={style.page_card + " " + style.fl}>
            <img className={style.card} src={Main2} alt="" />
            <h3 style={{ textAlign: "center" }}>혼자하는 단계별 재활 훈련</h3>
            <p>
              스스로 진단하면서 자신의 인지력과 기억력을 훈련하고 단계별로
              나누어 흥미를 잃지 않도록 구성했습니다.
            </p>
          </div>
          <div className={style.page_card + " " + style.fr}>
            <img className={style.card} src={Main2} alt="" />
            <h3 style={{ textAlign: "center" }}>반응성 높은 화상 재활</h3>
            <p>
              단순히 화상 연결에 그치지 않고 재활의 효율을 높일 수 있도록
              상호작용 할 수 있는 훈련용 도구들을 지원합니다.
            </p>
          </div>
          <div style={{ clear: "both" }} />
          <div className={style.main_img_board}>
            <img className={style.card2 + " " + style.fl} src={Main3} alt="" />
            <div className={style.card3 + " " + style.fl}>
              <h3>언어재활 대상자/보호자</h3>
              <div className={style.quoto_left}>
                <FontAwesomeIcon icon={faQuoteLeft} />
              </div>
              <div className={style.quoto_center}>
                <p>말아톤과 함께</p>
                <p>매일매일 부담없이</p>
                <p>재활을 받을 수 있어요!</p>
              </div>
              <div className={style.quoto_right}>
                <FontAwesomeIcon icon={faQuoteRight} />
              </div>
            </div>
          </div>
          <div style={{ clear: "both" }} />
          <div className={style.main_img_board}>
            <img className={style.card2 + " " + style.fr} src={Main4} alt="" />
            <div className={style.card3 + " " + style.fr}>
              <h3>언어 재활사</h3>
              <div className={style.quoto_left}>
                <FontAwesomeIcon icon={faQuoteLeft} />
              </div>
              <div className={style.quoto_center}>
                <p>더 많은 분들과</p>
                <p>더 제약없이 소통하고</p>
                <p>스스로의 실력도 쌓아가요!</p>
              </div>
              <div className={style.quoto_right}>
                <FontAwesomeIcon icon={faQuoteRight} />
              </div>
            </div>
          </div>
          <div style={{ clear: "both" }} />
          <hr style={{ fontWeight: "bold" }} />
          <div className={style.last_box}>
            <h3 style={{ color: "blue" }}>재활의 시작에서 사회복귀 까지</h3>
            <h3>성공적인 소통체계를 제공합니다</h3>
            <button
              className={style.button}
              style={{ marginTop: "20px" }}
              onClick={() => {
                navigate("/consult-enroll");
                window.scrollTo(0, 0);
              }}
            >
              무료 상담 신청하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
