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
import style from "./Treat.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chatting from "components/treat/Chatting";
import VideoCom from "components/webRTC/VideoCom";

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
  const changeInteraction = (idx) => {
    alert(interactionTitle[idx]);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.main_container}>
        <div className={style.left_container}>
          <VideoCom />
          <img
            style={{
              width: "460px",
              height: "550px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            src="https://pickcon.co.kr/site/data/img_dir/2022/06/29/2022062980010_0.jpg"
            alt="임시 이미지"
          />
        </div>
        <div className={style.right_container}>
          <div className={style.right_up_container}>
            <div className={style.interaction_nav}>
              <span>{interactionTitle[0]}</span>
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
            <div className={style.interaction_box}></div>
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
              <div className={style.preset}>
                <span className={style.emoji}>⏰&nbsp;</span> 조금만 시간을
                주세요
              </div>
              <div className={style.preset}>
                <span className={style.emoji}>😂&nbsp;</span>천천히 / 다시
                말해주세요
              </div>
              <div className={style.preset}>
                <span className={style.emoji}>🎧&nbsp;</span>소리가 잘 안들려요
              </div>
              <div className={style.preset}>
                <span className={style.emoji}>💡&nbsp;</span>생각이 나지 않아요
              </div>
              <div className={style.preset}>
                <span className={style.emoji}>❓&nbsp;</span>잘 모르겠어요
              </div>
              <div className={style.preset}>
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
          <FontAwesomeIcon icon={faComment} />
        </button>
        <button className={style.btn_x} onClick={exitRoom}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      {isChatting && <Chatting />}
    </div>
  );
}
