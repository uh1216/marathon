import React, { useState } from "react";
import styled from "styled-components";
import style from "./DoctorSlider.module.css";
import Modal from "components/common/Modal";
import SelectSchedule from "./SelectSchedule";

const NowSlider = styled.div`
  width: ${(props) =>
    (props.check === "now" && "30%") ||
    (props.check === "next" && "25%") ||
    (props.check === "prev" && "25%") ||
    (props.check.includes("hidden") && "25%")};
  height: ${(props) => (props.check === "now" ? "450px" : "400px")};
  top: ${(props) => (props.check === "now" ? "90px" : "85px")};
  visibility: ${(props) =>
    props.check.includes("hidden") ? "hidden" : "visible"};
  opacity: ${(props) => (props.check.includes("hidden") ? "0" : "1")};
  border: 1px solid #c0c0c0;
  border-radius: 5%;
  background-image: ${(props) =>
    props.check === "now"
      ? "linear-gradient(to bottom, white 40%, #F3F7FF 40%)"
      : "linear-gradient(to bottom, white 45%, #F3F7FF 45%)"};
  transform: translate(-50%, -50%);

  position: absolute;

  left: ${(props) =>
    (props.check === "now" && "50%") ||
    (props.check === "next" && "80%") ||
    (props.check === "prev" && "20%") ||
    (props.check === "hidden_next" && "95%") ||
    (props.check === "hidden_prev" && "5%")};
`;

export default function DoctorSlider({
  check,
  seq,
  name,
  introduce,
  img,
  animation,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  /** 모달창 오픈 함수 */
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <NowSlider check={check} style={{ transition: animation }}>
        <div className={style.total}>
          <div className={style.info}>
            <img src={img} alt="" className={style.doctor_img}></img>
            <h3 className={style.title}>
              {name}&nbsp;
              <span className={style.span}>재활사</span>
            </h3>
          </div>
          <div className={style.button}>
            <button
              className={style.button_design}
              disabled={check === "now" ? false : true}
              onClick={showModal}
            >
              예약하기
            </button>
          </div>
          <div className={style.introduce}>
            <h3 className={style.introduce_title}>자기소개</h3>
            {introduce}
          </div>
        </div>
      </NowSlider>
      {isModalOpen && (
        <Modal setModalOpen={setIsModalOpen}>
          <SelectSchedule setModalOpen={setIsModalOpen} seq={seq} />
        </Modal>
      )}
    </>
  );
}
