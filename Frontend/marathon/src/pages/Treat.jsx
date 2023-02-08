import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareFromSquare,
  faComment,
  faXmark,
  faVideo,
  faVideoSlash,
  faMicrophone,
  faMicrophoneSlash,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faComment as faCommentBlank } from "@fortawesome/free-regular-svg-icons";
import style from "./Treat.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chatting from "components/treat/Chatting";

import QuestionBoard from "components/treat/QuestionBoard";
import SketchBoard from "components/treat/SketchBoard";
import ImageBoard from "components/treat/ImageBoard";
import WordChainBoard from "components/treat/WordChainBoard";

const interactionTitle = [
  "스케치 보드",
  "끝말잇기 보드",
  "그림 보드",
  "무작위질문 보드",
];

export default function Treat() {
  const navigate = useNavigate();
  const [isVideo, setIsVideo] = useState(false);
  const [isMic, setIsMic] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [isPreset0, setIsPreset0] = useState(false);
  const [isPreset1, setIsPreset1] = useState(false);
  const [isPreset2, setIsPreset2] = useState(false);
  const [isPreset3, setIsPreset3] = useState(false);
  const [isPreset4, setIsPreset4] = useState(false);
  const [isPreset5, setIsPreset5] = useState(false);
  const [interactionMode, SetInteractionMode] = useState(0);

  /** 비디오 켜기 */
  const turnOnVideo = () => {
    setIsVideo(true);
  };
  /** 비디오 끄기 */
  const turnOffVideo = () => {
    setIsVideo(false);
  };
  /** 마이크 켜기 */
  const turnOnMic = () => {
    setIsMic(true);
  };
  /** 마이크 끄기 */
  const turnOffMic = () => {
    setIsMic(false);
  };
  /** 채팅창 보이기 or 끄기 */
  const showChatting = () => {
    setIsChatting(!isChatting);
  };
  /** 방 나가기 */
  const exitRoom = () => {
    if (window.confirm("정말로 나가시겠습니까?")) navigate("/");
  };
  /** 상호작용 보드 바꾸기
   * idx : 몇 번째 상호작용 보드를 골랐는지
   */
  const changeInteraction = (idx) => {
    SetInteractionMode(idx);
  };
  /** 프리셋 클릭
   * idx : 몇 번째 프리셋을 클릭했는지
   */
  const alertPreset = (idx) => {
    switch (idx) {
      case 0:
        setIsPreset0(true);
        setTimeout(() => {
          setIsPreset0(false);
        }, 3000);
        break;
      case 1:
        setIsPreset1(true);
        setTimeout(() => {
          setIsPreset1(false);
        }, 3000);
        break;
      case 2:
        setIsPreset2(true);
        setTimeout(() => {
          setIsPreset2(false);
        }, 3000);
        break;
      case 3:
        setIsPreset3(true);
        setTimeout(() => {
          setIsPreset3(false);
        }, 3000);
        break;
      case 4:
        setIsPreset4(true);
        setTimeout(() => {
          setIsPreset4(false);
        }, 3000);
        break;
      case 5:
        setIsPreset5(true);
        setTimeout(() => {
          setIsPreset5(false);
        }, 3000);
        break;
      default:
        break;
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.main_container}>
        <div className={style.left_container}>
          <img
            style={{
              width: "100%",
              height: "550px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            src="https://pickcon.co.kr/site/data/img_dir/2022/06/29/2022062980010_0.jpg"
            alt="임시 이미지"
          />
          <div className={style.alert_emoji_box}>
            {isPreset0 && <div className={style.alert_emoji}>⏰</div>}
            {isPreset1 && <div className={style.alert_emoji}>😂</div>}
            {isPreset2 && <div className={style.alert_emoji}>🎧</div>}
            {isPreset3 && <div className={style.alert_emoji}>💡</div>}
            {isPreset4 && <div className={style.alert_emoji}>❓</div>}
            {isPreset5 && <div className={style.alert_emoji}>😴</div>}
          </div>
        </div>
        <div className={style.right_container}>
          <div className={style.right_up_container}>
            <div className={style.interaction_nav}>
              <span>{interactionTitle[interactionMode]}</span>
              <span className={style.dropdown}>
                <FontAwesomeIcon
                  icon={faBars}
                  className={style.bars}
                  style={{ fontSize: "1.4em" }}
                />
                <div className={style.blank_box}></div>
                <div className={style.interaction_menu}>
                  <div
                    onClick={() => {
                      changeInteraction(0);
                    }}
                  >
                    {interactionTitle[0]}
                  </div>
                  <div
                    onClick={() => {
                      changeInteraction(1);
                    }}
                  >
                    {interactionTitle[1]}
                  </div>
                  <div
                    onClick={() => {
                      changeInteraction(2);
                    }}
                  >
                    {interactionTitle[2]}
                  </div>
                  <div
                    onClick={() => {
                      changeInteraction(3);
                    }}
                  >
                    {interactionTitle[3]}
                  </div>
                </div>
              </span>
            </div>
            {/* <div className={style.interaction_box}></div> */}
            {interactionMode === 0 && <SketchBoard />}
            {interactionMode === 1 && <WordChainBoard />}
            {interactionMode === 2 && <ImageBoard />}
            {interactionMode === 3 && <QuestionBoard />}
          </div>
          <div className={style.right_bottom_container}>
            <div>
              <img
                style={{
                  width: "190px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                src="https://pickcon.co.kr/site/data/img_dir/2022/06/29/2022062980010_0.jpg"
                alt="임시 이미지"
              />
            </div>
            <div className={style.preset_container}>
              <div
                className={style.preset + " " + (isPreset0 && style.blink)}
                onClick={() => {
                  alertPreset(0);
                }}
              >
                <span className={style.emoji}>⏰&nbsp;</span> 조금만 시간을
                주세요
              </div>
              <div
                className={style.preset + " " + (isPreset1 && style.blink)}
                onClick={() => {
                  alertPreset(1);
                }}
              >
                <span className={style.emoji}>😂&nbsp;</span>천천히 / 다시
                말해주세요
              </div>
              <div
                className={style.preset + " " + (isPreset2 && style.blink)}
                onClick={() => {
                  alertPreset(2);
                }}
              >
                <span className={style.emoji}>🎧&nbsp;</span>소리가 잘 안들려요
              </div>
              <div
                className={style.preset + " " + (isPreset3 && style.blink)}
                onClick={() => {
                  alertPreset(3);
                }}
              >
                <span className={style.emoji}>💡&nbsp;</span>생각이 나지 않아요
              </div>
              <div
                className={style.preset + " " + (isPreset4 && style.blink)}
                onClick={() => {
                  alertPreset(4);
                }}
              >
                <span className={style.emoji}>❓&nbsp;</span>잘 모르겠어요
              </div>
              <div
                className={style.preset + " " + (isPreset5 && style.blink)}
                onClick={() => {
                  alertPreset(5);
                }}
              >
                <span className={style.emoji}>😴&nbsp;</span>잠시 쉬고 싶어요
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.btn_container}>
        {!isVideo && (
          <button className={style.btn_video} onClick={turnOnVideo}>
            <FontAwesomeIcon
              icon={faVideoSlash}
              style={{ fontSize: "1.4em" }}
            />
            &nbsp; 비디오 시작
          </button>
        )}
        {isVideo && (
          <button className={style.btn_video} onClick={turnOffVideo}>
            <FontAwesomeIcon icon={faVideo} style={{ fontSize: "1.4em" }} />
            &nbsp; 비디오 중지
          </button>
        )}
        {!isMic && (
          <button className={style.btn_mic} onClick={turnOnMic}>
            <FontAwesomeIcon
              icon={faMicrophoneSlash}
              style={{ fontSize: "1.4em" }}
            />
            &nbsp; 음소거 해제
          </button>
        )}
        {isMic && (
          <button className={style.btn_mic} onClick={turnOffMic}>
            <FontAwesomeIcon
              icon={faMicrophone}
              style={{ fontSize: "1.4em" }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;음&nbsp;&nbsp;소&nbsp;&nbsp;거
          </button>
        )}

        <button className={style.btn_share}>
          <FontAwesomeIcon icon={faShareFromSquare} />
        </button>
        <button className={style.btn_comment} onClick={showChatting}>
          {!isChatting && <FontAwesomeIcon icon={faComment} />}
          {isChatting && <FontAwesomeIcon icon={faCommentBlank} />}
        </button>
        <button className={style.btn_x} onClick={exitRoom}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      {isChatting && <Chatting />}
    </div>
  );
}
