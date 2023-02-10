/* eslint-disable */
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

export default function Consult() {
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

  return (
    <div className={style.wrapper}>
      <div className={style.main_container}>여기에 화상화면 4개 들어감</div>
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
