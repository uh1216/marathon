import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Header.module.css";
import logo from "img/logoMain.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import { changeNowSideNav } from "stores/toggle.store";
import { useDispatch } from "react-redux";

export default function Header() {
  const [isToggled, setIsToggled] = useState(false);
  const [isUserToggled, setIsUserToggled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      style={{
        boxShadow: "0px 3px 4px 1px rgb(67, 67, 65, 50%)",
        backgroundColor: "white",
        position: "relative",
        zIndex: "1",
      }}
    >
      <div className={style.header}>
        <div
          className={style.toggle}
          onClick={() => {
            setIsToggled(!isToggled);
          }}
        >
          <div style={{ width: "10px" }}>
            <FontAwesomeIcon
              className={style.clickable}
              icon={!isToggled ? faBars : faTimes}
            />
          </div>
        </div>

        <div className={style.logo}>
          <img onClick={() => navigate("/")} src={logo} alt="" />
        </div>

        <div
          className={style.user}
          onClick={() => {
            setIsUserToggled(!isUserToggled);
          }}
        >
          <div style={{ width: "30px" }}>
            <FontAwesomeIcon
              className={style.clickable}
              icon={!isUserToggled ? faUser : faTimes}
            />
          </div>
        </div>

        <ul
          className={
            isToggled
              ? style.header__menulist
              : style.header__menulist + " " + style.menulist_on
          }
        >
          <li
            onClick={() => {
              if (isToggled) setIsToggled(!isToggled);
              navigate("/consult-enroll");
            }}
          >
            <span>상담신청</span>
          </li>
          <li>
            <span
              onClick={() => {
                if (isToggled) setIsToggled(!isToggled);
                dispatch(changeNowSideNav("서비스 정보"));
                navigate("/guide");
              }}
            >
              서비스 안내
            </span>
            <div className={style.sub_menu}>
              <dl
                onClick={() => {
                  if (isToggled) setIsToggled(!isToggled);
                  dispatch(changeNowSideNav("서비스 정보"));
                  navigate("/guide");
                }}
              >
                서비스 정보
              </dl>
              <dl
                onClick={() => {
                  if (isToggled) setIsToggled(!isToggled);
                  dispatch(changeNowSideNav("파트너 재활사 소개"));
                  navigate("/guide/partners");
                }}
              >
                파트너 재활사 소개
              </dl>
              <dl
                onClick={() => {
                  if (isToggled) setIsToggled(!isToggled);
                }}
              >
                지정병원 소개
              </dl>
            </div>
          </li>
          <li
            onClick={() => {
              if (isToggled) setIsToggled(!isToggled);
              navigate("/notice");
            }}
          >
            <span>공지사항</span>
          </li>
          <li>
            <span
              onClick={() => {
                if (isToggled) setIsToggled(!isToggled);
              }}
            >
              스스로 학습
            </span>
            <div className={style.sub_menu}>
              <dl
                onClick={() => {
                  if (isToggled) setIsToggled(!isToggled);
                }}
              >
                색깔 위치 맞추기
              </dl>
              <dl
                onClick={() => {
                  if (isToggled) setIsToggled(!isToggled);
                }}
              >
                그림 카드 맞추기
              </dl>
              <dl
                onClick={() => {
                  if (isToggled) setIsToggled(!isToggled);
                }}
              >
                도형 위치 맞추기
              </dl>
            </div>
          </li>
          <li
            onClick={() => {
              if (isToggled) setIsToggled(!isToggled);
              navigate("/treat-enroll");
            }}
          >
            <span>수업 예약</span>
          </li>
        </ul>

        <div className={style.header_eatspace}></div>
        <ul
          className={
            isUserToggled
              ? style.header__right
              : style.header__right + " " + style.header_right_on
          }
        >
          <li
            onClick={() => {
              if (isUserToggled) setIsUserToggled(!isUserToggled);
              navigate("/user/login");
            }}
          >
            <span>로그인</span>
          </li>
          <li
            onClick={() => {
              if (isUserToggled) setIsUserToggled(!isUserToggled);
              navigate("/user/sign-up-type");
            }}
          >
            <span>회원가입</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
