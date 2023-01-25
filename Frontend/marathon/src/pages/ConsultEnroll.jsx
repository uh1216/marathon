import React from "react";
import style from "./ConsultEnroll.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faCalendarCheck,
} from "@fortawesome/free-regular-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export default function ConsultEnroll() {
  return (
    <div className="container">
      <div className="inner_container">
        <div className={style.color_box}>
          <div className={style.title_box}>신청절차</div>
          <h4>
            먼저 상담을 통해서 환자의 상태와 원격 재활이 가능한 지 논의해
            보세요!
          </h4>
          <div className={style.icon_contain_box}>
            <div>
              <FontAwesomeIcon className={style.icon_box} icon={faFileLines} />
              <h5>상담 신청서 제출</h5>
            </div>
            <div>
              <FontAwesomeIcon className={style.icon_box} icon={faCamera} />
              <h5>부담없는 화상 상담</h5>
            </div>
            <div>
              <FontAwesomeIcon
                className={style.icon_box}
                icon={faCalendarCheck}
              />
              <h5>재활사 선택 / 예약 확정</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
