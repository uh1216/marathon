import styled from "styled-components";
import style from "./TeacherSlider.module.css";

const NowSlider = styled.div`
  width: ${(props) => (props.check === "now" ? "20%" : "15%")};
  height: ${(props) => (props.check === "now" ? "400px" : "200px")};
  top: ${(props) => (props.check === "now" ? "55%" : "50%")};
  transform: translate(-50%, -50%);
  transition: all ease-in-out 0.5s;
  position: absolute;

  left: ${(props) =>
    (props.check === "now" && "50%") ||
    (props.check === "next" && "70%") ||
    (props.check === "prev" && "30%")};
`;

export default function TeacherSlider({ check, name, content, bg }) {
  return (
    <>
      {check !== "hidden" ? (
        <NowSlider check={check}>
          <div className={style.total}>
            <div className={style.info}>
              <img src={bg} alt="" className={style.teacher_img}></img>
              <h3 className={style.title}>
                {name}&nbsp;
                <span className={style.span}>재활사</span>
              </h3>
            </div>
            <div className={style.button}>
              <button
                className={style.button_design}
                disabled={check === "now" ? false : true}
              >
                예약하기
              </button>
            </div>
            <div className={style.content}>
              <h3>자기소개</h3>
              {content}
            </div>
          </div>
        </NowSlider>
      ) : null}
    </>
  );
}
