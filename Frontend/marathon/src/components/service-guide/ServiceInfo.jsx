import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import style from "./ServiceInfo.module.css";
import Consult1 from "img/consult_1.png";
import { changeNowSideNav } from "stores/store";
import { useDispatch } from "react-redux";

export default function ServiceInfo() {
  const [isHidden1, setIsHidden1] = useState(true);
  const [isHidden2, setIsHidden2] = useState(true);
  const [isHidden3, setIsHidden3] = useState(true);
  const [isHidden4, setIsHidden4] = useState(true);
  const dispath = useDispatch();

  // 처음 해당 컴포넌트를 불러올 때 단 한번만 NowSideNav를 업데이트 한다.
  useEffect(() => {
    dispath(changeNowSideNav("서비스 정보"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.side_right_board}>
      <h1>언어 재활이 필요한 대상</h1>
      <hr />
      <h4 style={{ fontWeight: "bold" }}>신경언어장애</h4>
      <p style={{ color: "gray" }}>
        Acquired neurogenic communication disorders
      </p>
      <div style={{ margin: "20px 0px" }}>
        <p>
          뇌졸중이나 뇌종양, 퇴행성 뇌질환(예: 파킨슨병, 알츠하이머), 사고 등의
          이유로 뇌손상이 발생하여 의사소통에 어려움을 겪는 증상입니다.
          말·언어문제가 일시적으로 나타나거나 점진적으로 퇴행할 수 있습니다.
          단어·문장을 이해하지 못하거나 의사표현을 자유롭게 하지 못하는 실어증,
          발음이 어눌하거나 자신의 생각대로 말소리가 산출되지 않는 마비말장애와
          말실행증, 인지기능의 저하로 의사전달이 어려운 인지- 의사소통 장애까지
          다양한 증상을 동반합니다.
        </p>
      </div>
      <hr />
      <div className={style.exp_box}>
        <div>
          <h4>실어증</h4>
          <span>Aphasia</span>
        </div>
        <div
          className={style.arrow_box}
          onClick={() => {
            setIsHidden1(!isHidden1);
          }}
        >
          {isHidden1 ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
        </div>
      </div>
      <hr />
      <div
        className={
          isHidden1
            ? style.content_box_hiden
            : style.content_box_hiden + " " + style.content_box_opened
        }
      >
        뇌손상으로 인해 언어를 이해·표현하는데 어려움을 보이는 후천적인 의사소통
        장애입니다. 지적·발달장애로 인한 언어장애와는 구별되며 뇌손상 전에는
        원활한 의사소통이 가능했던 경우입니다. 듣기, 말하기, 읽기, 쓰기 중 한
        가지 이상의 영역에서 제한을 보이며, 상대방의 말을 이해하기 어렵거나
        단어가 떠오르지 않아 의사표현이 힘든 경우, 글자를 읽거나 받아쓰기, 글로
        표현할 때 문제를 보일 수 있습니다.
      </div>
      <hr />
      <div className={style.exp_box}>
        <div>
          <h4>마비말장애</h4>
          <span>Dysarthria</span>
        </div>
        <div
          className={style.arrow_box}
          onClick={() => {
            setIsHidden2(!isHidden2);
          }}
        >
          {isHidden2 ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
        </div>
      </div>
      <hr />
      <div
        className={
          isHidden2
            ? style.content_box_hiden
            : style.content_box_hiden + " " + style.content_box_opened
        }
      >
        말소리 산출에 관여하는 뇌신경 손상에 의해 나타나는 구음장애입니다. 얼굴,
        입술, 혀, 연구개 등 구강 근육의 마비 또는 약화로 인해 구어 운동성 및
        협응이 제한되어 호흡이 짧아지고, 쉬거나 쥐어짜는 듯한 목소리 산출,
        콧소리, 어눌한 발음, 불규칙적이거나 느려지는 말속도 등 말이 명료하지
        않은 증상을 보입니다.
      </div>
      <hr />
      <div className={style.exp_box}>
        <div>
          <h4>말실행증</h4>
          <span>Apraxia of speech</span>
        </div>
        <div
          className={style.arrow_box}
          onClick={() => {
            setIsHidden3(!isHidden3);
          }}
        >
          {isHidden3 ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
        </div>
      </div>
      <hr />
      <div
        className={
          isHidden3
            ? style.content_box_hiden
            : style.content_box_hiden + " " + style.content_box_opened
        }
      >
        후천적인 뇌손상으로 인해 구강근육의 마비나 약화가 없음에도 말소리(음소나
        단어)를 정확하게 발음하는데 어려움을 겪는 증상입니다. 머릿속으로 단어를
        알고 있지만 자신의 의지대로 자동화 된 말 산출의 순서가 계획/프로그래밍
        되지 않아 말을 유창하게 구사하기 어려운 증상으로 이는 실어증과
        마비말장애를 함께 동반될 수 있습니다.
      </div>
      <hr />
      <div className={style.exp_box}>
        <div>
          <h4>인지-의사소통 장애</h4>
          <span>Cognitive-communication disorders</span>
        </div>
        <div
          className={style.arrow_box}
          onClick={() => {
            setIsHidden4(!isHidden4);
          }}
        >
          {isHidden4 ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
        </div>
      </div>
      <hr />
      <div
        className={
          isHidden4
            ? style.content_box_hiden
            : style.content_box_hiden + " " + style.content_box_opened
        }
      >
        원활한 의사소통을 위해서는 생각하고, 말하고자 하는 요지와 의도를
        유지하며 전달할 수 있어야 합니다. 뇌졸중이나 사고, 퇴행성 질환(예:
        치매)으로 인해 발생할 수 있는 인지-의사소통 장애는 기억력이나 지각,
        문제해결, 추론 및 사고, 비유적 표현의 이해, 언어 기능에 어려움을
        초래하고, 이로 인해 의사소통에 어려움을 보입니다.
        <hr />
      </div>
      <div className={style.bottom_box}>
        <img src={Consult1} alt="" />
        <div className={style.inner_bottom_box}>
          <h3>
            <span style={{ color: "#239C3A" }}>말</span>아톤과 함께 달려요!
          </h3>
          <h4 style={{ fontWeight: "100" }}>선택의 저평을 넓히는 화상 재활</h4>
          <div style={{ flexGrow: "1" }} />
          <p style={{ marginBottom: "10%" }}>
            통원치료에 제약이 있는 분, 운동능력은 양호하나 상대적으로 언어/인지
            문제가 있는 분, 한국인 언어재활사를 만나기 어려운 해외교민에게는
            화상 언어재활이 더욱 적합할 수 있습니다.
          </p>
          <p>
            뇌졸중 후 언어재활의 효과를 극대화하기 위해서는 높은 수준(quality)의
            치료와 강도 높은(intensity) 치료가 결정적입니다. 보다 합리적인
            비용으로 더 자주 언어재활 받으세요.
          </p>
        </div>
      </div>
    </div>
  );
}
