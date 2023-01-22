import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "img/logoMain.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [isToggled, setIsToggled] = useState(false);
  const [isUserToggled, setIsUserToggled] = useState(false);
  const navigate = useNavigate();

  const Header = styled.div`
    max-width: 1600px;
    height: 65px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    font-size: 16px;
    position: relative;

    .clickable {
      cursor: pointer;
    }
    .logo {
      margin-left: 16px;
    }

    .logo img {
      display: block;
      height: 58px;
      cursor: pointer;
    }

    .header__menulist {
      list-style: none;
      display: flex;
      margin-bottom: 0px;
      margin-left: 5px;
      font-size: 1em;
    }

    .sub_menu {
      color: black;
      border-radius: 10px;
      background-color: white;
      width: 165px;
      text-shadow: none;
      box-shadow: 0px 3px 4px 1px rgb(67, 67, 65);
      position: absolute;
      bottom: -168px;
      left: 10px;
      visibility: hidden;
      transition: all 0.4s;
      opacity: 0;
      cursor: auto;
    }

    .sub_menu:before {
      border-top: 0px solid transparent;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 15px solid white;
      content: "";
      position: absolute;
      top: -12px;
      left: 30px;
    }

    .sub_menu dl {
      margin-top: 1rem;
      margin-left: 15px;
    }

    .sub_menu dl:hover {
      color: rgb(182, 181, 181);
    }

    .header__left {
      display: flex;
    }

    .header__right {
      list-style: none;
      display: flex;
      margin-right: 2em;
      font-size: 1em;
      margin-bottom: 0px;
    }

    .header__right div {
      margin: 0 1em;
    }

    li {
      padding: 0 1em;
      cursor: pointer;
      position: relative;
    }

    li:hover {
      color: rgb(182, 181, 181);
      text-shadow: 1px 1px 1px rgb(182, 181, 181);
      cursor: pointer;
      overflow: visible;
    }

    li:hover dl {
      color: black;
      text-shadow: none;
      cursor: pointer;
    }

    li:hover .sub_menu {
      visibility: visible;
      opacity: 1;
    }

    .toggle {
      display: none;
      font-size: 1.5em;
      padding: 1em 1em;
    }

    .user {
      display: none;
      font-size: 1.5em;
      padding: 1em 1em;
    }

    .header_eatspace {
      flex-grow: 1;
    }

    @media screen and (max-width: 992px) {
      font-size: 14px;

      .header__menulist {
        margin-left: -10px;
      }

      .sub_menu {
        top: 60px;
        left: 6px;
        width: 142px;
      }

      li {
        padding: 0 0.63em;
      }

      .header__right {
        margin-right: 1.33em;
      }

      .logo {
        margin-left: 10px;
      }

      .logo img {
        display: block;
        height: 50px;
      }
    }

    @media screen and (max-width: 768px) {
      flex-wrap: wrap;

      .header__right {
        right: ${(props) => (props.isUserToggled ? "0%;" : "200%")};
        top: 100%;
        display: flex;
        flex-direction: column;
        width: 200px;
        background-color: white;
        margin-top: 0px;
        margin-right: 0px;
        position: absolute;
        overflow: hidden;
        box-shadow: 0px 3px 4px 1px rgb(67, 67, 65);
        z-index: 2;
      }

      .header__menulist {
        left: ${(props) => (props.isToggled ? "0%;" : "-350%")};
        top: 100%;
        display: flex;
        flex-direction: column;
        width: 200px;
        background-color: white;
        margin-top: 0 auto;
        margin-left: 0px;
        position: absolute;
        overflow: hidden;
        box-shadow: 0px 3px 4px 1px rgb(67, 67, 65);
        z-index: 2;
      }

      .header__menulist li,
      .header__right li {
        margin: 1em 0;
        padding: 0;
        font-weight: bold;
      }

      .header__right li {
        text-align: right;
        margin-right: 32px;
      }

      .header_eatspace {
        display: none;
      }

      .toggle {
        display: block;
      }

      .logo {
        margin-left: 0px;
        margin-top: -10px;
      }

      .user {
        display: block;
      }

      .sub_menu {
        position: static;
        visibility: visible;
        box-shadow: none;
        opacity: 1;
        height: 85px;
        font-weight: normal;
      }

      .sub_menu dl:before {
        content: "- ";
      }
    }
  `;

  return (
    <div style={{ boxShadow: "0px 3px 4px 1px rgb(67, 67, 65)", zIndex: "2" }}>
      <Header isToggled={isToggled} isUserToggled={isUserToggled}>
        <div
          className="toggle"
          onClick={() => {
            setIsToggled(!isToggled);
          }}
        >
          <div style={{ width: "10px" }}>
            <FontAwesomeIcon
              className="clickable"
              icon={!isToggled ? faBars : faTimes}
            />
          </div>
        </div>

        <div className="logo">
          <img onClick={() => navigate("/")} src={logo} alt="" />
        </div>

        <div
          className="user"
          onClick={() => {
            setIsUserToggled(!isUserToggled);
          }}
        >
          <div style={{ width: "30px" }}>
            <FontAwesomeIcon
              className="clickable"
              icon={!isUserToggled ? faUser : faTimes}
            />
          </div>
        </div>

        <ul className="header__menulist">
          <li
            onClick={() => {
              if (isToggled) setIsToggled(!isToggled);
            }}
          >
            상담신청
          </li>
          <li
            onClick={() => {
              if (isToggled) setIsToggled(!isToggled);
            }}
          >
            서비스 안내
            <div className="sub_menu">
              <dl
                onClick={() => {
                  if (isToggled) setIsToggled(!isToggled);
                }}
              >
                서비스 정보
              </dl>
              <dl
                onClick={() => {
                  if (isToggled) setIsToggled(!isToggled);
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
            공지사항
          </li>
          <li
            onClick={() => {
              if (isToggled) setIsToggled(!isToggled);
            }}
          >
            스스로 학습
            <div className="sub_menu">
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
            }}
          >
            수업 예약
          </li>
        </ul>

        <div className="header_eatspace"></div>

        <ul className="header__right">
          <li
            onClick={() => {
              if (isUserToggled) setIsUserToggled(!isUserToggled);
            }}
          >
            로그인
          </li>
          <li
            onClick={() => {
              if (isUserToggled) setIsUserToggled(!isUserToggled);
            }}
          >
            회원가입
          </li>
        </ul>
      </Header>
    </div>
  );
}
