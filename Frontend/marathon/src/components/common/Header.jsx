import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Header.module.css";
import logo from "img/logoMain.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import { changeNowSideNav } from "stores/toggle.store";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "stores/user.store";

export default function Header() {
  const [isToggled, setIsToggled] = useState(false);
  const [isUserToggled, setIsUserToggled] = useState(false);
  const state = useSelector((state) => state);
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
            {!isUserToggled && state.loginUser.userProfileImg !== "" && (
              <>
                <img
                  className={style.profile}
                  src={state.loginUser.userProfileImg}
                  alt=""
                />
                <div
                  className={
                    !state.loginUser.unReadMsgNum ? style.nobadge : style.badge
                  }
                >
                  <span>{state.loginUser.unReadMsgNum}</span>
                </div>
              </>
            )}
            {!isUserToggled && !state.loginUser.userProfileImg && (
              <FontAwesomeIcon className={style.clickable} icon={faUser} />
            )}

            {isUserToggled && (
              <FontAwesomeIcon className={style.clickable} icon={faTimes} />
            )}
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
          {state.loginUser.userRole === "patient" && (
            <li
              onClick={() => {
                if (isToggled) setIsToggled(!isToggled);
                navigate("/treat-enroll");
              }}
            >
              <span>수업 예약</span>
            </li>
          )}
          {state.loginUser.userRole === "doctor" && (
            <li
              onClick={() => {
                if (isToggled) setIsToggled(!isToggled);
                navigate("/");
              }}
            >
              <span>일정 관리</span>
            </li>
          )}
        </ul>

        <div className={style.header_eatspace}></div>
        <ul className={style.header__right_not_mobile}>
          {!state.loginUser.userRole && (
            <>
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
            </>
          )}
          {state.loginUser.userRole !== "" && (
            <>
              <img
                src={state.loginUser.userProfileImg}
                className={style.profile_header}
                onClick={() => navigate("/mypage/messenger")}
                alt=""
              />
              <div
                className={
                  !state.loginUser.unReadMsgNum ? style.nobadge : style.badge
                }
              >
                <span onClick={() => navigate("/mypage/messenger")}>
                  {state.loginUser.unReadMsgNum}
                </span>
              </div>
              <li>
                {state.loginUser.userName}
                <span style={{ color: "gray" }}>님 환영합니다</span>
                {state.loginUser.userRole === "patient" && (
                  <div className={style.sub_menu + " " + style.sub_menu_common}>
                    <dl
                      onClick={() => {
                        navigate("/mypage/information");
                      }}
                    >
                      회원 정보 관리
                    </dl>
                    <dl
                      onClick={() => {
                        navigate("/mypage/messenger");
                      }}
                    >
                      알림 / 메시지
                    </dl>
                    <dl
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      재활 일정
                    </dl>
                    <dl
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      스스로 학습 통계
                    </dl>
                    <dl
                      onClick={() => {
                        dispatch(userLogout());
                        navigate("/");
                      }}
                    >
                      로그아웃
                    </dl>
                  </div>
                )}
                {state.loginUser.userRole === "doctor" && (
                  <div className={style.sub_menu + " " + style.sub_menu_common}>
                    <dl
                      onClick={() => {
                        navigate("/mypage/information");
                      }}
                    >
                      회원 정보 관리
                    </dl>
                    <dl
                      onClick={() => {
                        navigate("/mypage/messenger");
                      }}
                    >
                      알림 / 메시지
                    </dl>
                    <dl
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      재활 일정
                    </dl>
                    <dl
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      수업 기록
                    </dl>
                    <dl
                      onClick={() => {
                        dispatch(userLogout());
                        navigate("/");
                      }}
                    >
                      로그아웃
                    </dl>
                  </div>
                )}
                {state.loginUser.userRole === "admin" && (
                  <div className={style.sub_menu + " " + style.sub_menu_admin}>
                    <dl
                      onClick={() => {
                        navigate("/mypage/information");
                      }}
                    >
                      회원 정보 관리
                    </dl>
                    <dl
                      onClick={() => {
                        navigate("/mypage/messenger");
                      }}
                    >
                      알림 / 메시지
                    </dl>
                    <dl
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      상담 관리
                    </dl>
                    <dl
                      onClick={() => {
                        dispatch(userLogout());
                        navigate("/");
                      }}
                    >
                      로그아웃
                    </dl>
                  </div>
                )}
              </li>
            </>
          )}
        </ul>

        <ul
          className={
            isUserToggled
              ? style.header__right
              : style.header__right + " " + style.header_right_on
          }
        >
          {!state.loginUser.userRole && (
            <>
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
            </>
          )}
          {state.loginUser.userRole && (
            <>
              <li
                onClick={() => {
                  if (isUserToggled) setIsUserToggled(!isUserToggled);
                  navigate("/mypage/information");
                }}
              >
                <span>회원 정보 관리</span>
              </li>
              <li
                onClick={() => {
                  if (isUserToggled) setIsUserToggled(!isUserToggled);
                  navigate("/mypage/messenger");
                }}
              >
                <span>알림 / 메시지</span>
              </li>

              {state.loginUser.userRole !== "admin" && (
                <li
                  onClick={() => {
                    if (isUserToggled) setIsUserToggled(!isUserToggled);
                    navigate("/");
                  }}
                >
                  <span>재활 일정</span>
                </li>
              )}

              {state.loginUser.userRole === "admin" && (
                <li
                  onClick={() => {
                    if (isUserToggled) setIsUserToggled(!isUserToggled);
                    navigate("/");
                  }}
                >
                  <span>상담 관리</span>
                </li>
              )}

              {state.loginUser.userRole === "patient" && (
                <li
                  onClick={() => {
                    if (isUserToggled) setIsUserToggled(!isUserToggled);
                    navigate("/");
                  }}
                >
                  <span>스스로 학습 통계</span>
                </li>
              )}
              {state.loginUser.userRole === "doctor" && (
                <li
                  onClick={() => {
                    if (isUserToggled) setIsUserToggled(!isUserToggled);
                    navigate("/");
                  }}
                >
                  <span>수업 기록</span>
                </li>
              )}
              <li
                onClick={() => {
                  if (isUserToggled) setIsUserToggled(!isUserToggled);
                  dispatch(userLogout());
                  navigate("/");
                }}
              >
                <span>로그아웃</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
