import { React, useEffect } from "react";
import style from "./ServicePartner.module.css";
import Doctor1 from "img/doctor_1.jpg";
import Doctor2 from "img/doctor_2.jpg";
import Doctor3 from "img/doctor_3.jpg";
import { changeNowSideNav } from "stores/toggle.store";
import { useDispatch } from "react-redux";

export default function ServicePartner() {
  const dispatch = useDispatch();

  // 처음 해당 컴포넌트를 불러올 때 단 한번만 NowSideNav를 업데이트 한다.
  useEffect(() => {
    dispatch(changeNowSideNav("파트너 재활사 소개"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={style.side_right_board}>
        <h4 style={{ fontWeight: "bold" }}>파트너 재활사 소개</h4>
        <hr />
        <div className={style.card_box}>
          <div className={style.card_img + " " + style.fl}>
            <img src={Doctor1} alt="" />
          </div>
          <div className={style.card_text + " " + style.fl}>
            <h4>이연학 언어재활사</h4>
            <p>
              &nbsp;젊고 건강한 분들도 영양제를 매일 챙겨 먹고 운동을 하며 몸을
              꾸준히 관리하듯이, 재활 또한 단기간이 아닌 일상 속에서의 꾸준한
              관리가 필요하다고 생각합니다. 단순히 재활 수업에만 집중하는 것이
              아니라 파트너로 다가가겠습니다.
            </p>
          </div>
          <div style={{ clear: "both" }} />
          <hr />
        </div>
        <div className={style.card_box}>
          <div className={style.card_img + " " + style.fr}>
            <img src={Doctor2} style={{ left: "15px" }} alt="" />
          </div>
          <div className={style.card_text + " " + style.fr}>
            <h4>최준아 언어재활사</h4>
            <p>
              &nbsp;체력적, 시간상으로 재활을 꾸준히 받기 힘드신 분들도 장소에
              구애받지 않고 전자기기만 있으면 손쉽게 반복해서 복습을 할 수
              있다는 건 큰 이점 입니다! 저도 이 안에서 앞으로도 더 잘하고 싶은
              욕심이 있고 적극적으로 소통하겠습니다.
            </p>
          </div>
          <div style={{ clear: "both" }} />
          <hr />
        </div>
        <div className={style.card_box}>
          <div className={style.card_img + " " + style.fl}>
            <img src={Doctor3} alt="" />
          </div>
          <div className={style.card_text + " " + style.fl}>
            <h4>김정수 언어재활사</h4>
            <p>
              &nbsp;수업이 화상으로 진행되다 보니 가끔 환자분들의 미세한
              표정이나 상태들이 잘 보이지 않아 어려운 점은 있습니다. 하지만
              그것보다 훨씬 많은 이점이 있다고 생각합니다. 높은 상호작용으로
              대면과 같은 효과를 만들어 나가겠습니다!
            </p>
          </div>
          <div style={{ clear: "both" }} />
          <hr />
        </div>
        <div className={style.partner_color_board}>
          <h4 style={{ fontWeight: "bold" }}>
            💡 현재 20명이 넘는 재활사 분들이
            <span style={{ color: "#52A068" }}>말</span>아톤과 함께하고
            계십니다!
          </h4>
          <p style={{ marginTop: "40px" }}>
            &nbsp;저희 말아톤은 플렛폼 접근을 통해서 재활의 지평을 넓히려는
            목적으로 설립되었습니다. 환자분들 뿐만이 아니라 재활사 분들 역시
            동반으로 성장하는 가치를 추구합니다. 출근이나 여러 변수로 어려움을
            겪지 않고 재활이라는 본질에만 집중 할 수 있는 환경을 구축하려고
            노력하고 있습니다.
          </p>
        </div>
      </div>
    </>
  );
}
