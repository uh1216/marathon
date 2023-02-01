import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import style from "./TreatmentDetail.module.css";

export default function TreatmentDetail({ setIsModalOpen }) {
  const [isInput, setIsInput] = useState(false);
  const state = useSelector((state) => state);
  const no = useParams();
  const toggleToInput = () => {
    setIsInput(!isInput);
  };

  const personData = {
    profile:
      "https://img.hankyung.com/photo/202112/AKR20211208053400055_01_i_P4.jpg",
    name: "김옥분",
    phone1: "010-1234-5678",
    phone2: "010-1234-5678",
  };

  const treatmentData = {
    date: "2023.01.12(월) 15:00",
    video:
      "http://developer-salieri.tistory.com/attachment/cfile8.uf@9929743F5B47D96E19DF43.mp4",
  };

  const [content, setContent] = useState(
    "3회차 언어재활 수업을 완료했습니다.\n옥분님의 인지능력이 첫 수업 때보다 많이 개선되었음을 \n확인할 수 있습니다.\n그림을 보고 설명할 수 있는 어휘의 정보가 많아졌습니다.\n끝말잇기 수업 진행 시 새로운 단어를 떠올리기까지 시간이 상당히 단축되었습니다. \n본인의 질문에 관한 대답을 할 때 전보다 버벅거림이 많이 사라졌고\n 다양한 어휘표현을 사용할 수 있게 되셨습니다."
  );

  return (
    <>
      <h2>수업 기록</h2>
      <div className={style.container}>
        <div className={style.left}>
          <div className={style.profile_box}>
            <div className={style.profile_left}>
              <img className={style.profile} src={personData.profile} alt="" />
              <p>
                <span>{personData.name}</span>
                <span>
                  {state.loginUser.userRole === "patient" ? " 선생님 " : " 님 "}
                </span>
              </p>
            </div>
            <div className={style.line}></div>
            <div className={style.profile_right}>
              <div>
                <div className={style.sub_title}>수업 일자</div>
                <div className={style.sub_content}>{treatmentData.date}</div>
              </div>
              <div>
                <div className={style.sub_title}>
                  {state.loginUser.userRole === "doctor" && <>주</>} 연락처
                </div>
                <div className={style.sub_content}>{personData.phone1}</div>
              </div>
              <div>
                {state.loginUser.userRole === "doctor" && (
                  <>
                    <div className={style.sub_title}>비상 연락처</div>
                    <div className={style.sub_content}>{personData.phone2}</div>
                  </>
                )}
              </div>
            </div>
          </div>
          <video className={style.video} controls>
            <source src={treatmentData.video} type="video/mp4"></source>
            <source src={treatmentData.video} type="video/ogg"></source>
          </video>
        </div>
        <div className={style.right}>
          <div className={style.right_title}>
            <h2>수업 내용</h2>
            {state.loginUser.userRole === "doctor" && isInput && (
              <button
                className={style.btn}
                onClick={() => {
                  toggleToInput();
                }}
              >
                수정완료
              </button>
            )}
            {state.loginUser.userRole === "doctor" && !isInput && (
              <button
                className={style.btn}
                onClick={() => {
                  toggleToInput();
                }}
              >
                수정하기
              </button>
            )}
          </div>
          <hr />
          {isInput ? (
            <>
              <textarea
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                className={style.textarea}
                type="text"
                value={content}
              ></textarea>
            </>
          ) : (
            <div className={style.content}>{content}</div>
          )}
        </div>
      </div>
    </>
  );
}
