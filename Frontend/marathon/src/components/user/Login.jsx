import { useState, useEffect } from "react";
import style from "./Login.module.css";
import Kakao_login_medium_wide from "img/button/kakao_login_medium_wide.png";
import Modal from "components/common/Modal";
import FindId from "./FindId";
import FindPwd from "./FindPwd";
import { useDispatch } from "react-redux";
import { userLogin } from "stores/user.store";
import { useNavigate } from "react-router-dom";
import { $ } from "util/axios";
import { setInfo } from "stores/kakao.store";

export default function Main() {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [isRemember, setIsRemember] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 모달창 노출 여부 state
  const [isModalFindIdOpen, setIsModalFindIdOpen] = useState(false);
  const [isModalFindPwdOpen, setIsModalFindPwdOpen] = useState(false);

  // 모달창 노출
  const showModalFindId = () => {
    setIsModalFindIdOpen(true);
  };
  const showModalFindPwd = () => {
    setIsModalFindPwdOpen(true);
  };

  /** 로그인 버튼 클릭 시 실행되는 함수 */
  const login = () => {
    $.post("/user-sign/login", {
      id: userId,
      password: userPwd,
    })
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem("access-token", res.data.accessToken);
          dispatch(userLogin());
          if (isRemember) {
            localStorage.setItem(
              "remember-info",
              JSON.stringify({ userId: userId, userPwd: userPwd })
            );
          }
          navigate("/");
          return;
        }
      })
      .catch(() => {
        alert("아이디와 비밀번호를 다시 확인해 주세요");
      });
  };

  /** 카카오 로그인 버튼 클릭 시 실행되는 함수 */
  const kakaoLogin = () => {
    window.Kakao.Auth.login({
      success: async () => {
        await window.Kakao.API.request({
          url: "/v2/user/me",
          data: {
            property_keys: ["kakao_account.profile", "kakao_account.email"],
          },
          success: async (response) => {
            // ID 중복체크를 통해 회원가입 유무 확인하기
            var kakaoId = response.id.toString();
            console.log("카카오 로그인 성공------------");
            console.log(kakaoId);

            $.get(`/user-sign/checkkakao/${kakaoId}`)
              .then(() => {
                // 존재하는 경우 로그인 처리
                //hiddenKakaoLogin(kakaoId);
              })
              .catch(() => {
                // 존재하지 않으면 회원가입
                hiddenKakaoJoin(response);
              });
          },
          fail: (error) => {
            console.log(error);
          },
        });
      },
      fail: (error) => {
        console.log(error);
      },
    });
  };

  const hiddenKakaoLogin = (response) => {
    // $.post("/user-sign/login", {
    //   id: kakaoId,
    // })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       sessionStorage.setItem("access-token", res.data.accessToken);
    //       dispatch(userLogin());
    //       navigate("/");
    //       return;
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // 카카오 회원가입 한 적 없으면 회원가입 해야 됨
  const hiddenKakaoJoin = (response) => {
    // alert("회원가입 해야됨!");
    console.log(response);
    dispatch(setInfo(response));
    navigate(`/user/sign-up-type/kakao`);
  };

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("remember-info"));
    if (userInfo) {
      setUserId(userInfo.userId);
      setUserPwd(userInfo.userPwd);
    }

    // 카카오 시작
    if (!window.Kakao.isInitialized())
      window.Kakao.init("19a77915341770b57faad92af62c8da1");
  }, []);

  return (
    <div className={style.user_box}>
      <div className={style.inner_box}>
        <div className={style.title}>환영합니다</div>
        <input
          className={style.input_text}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
          type="text"
          placeholder="아이디"
          value={userId ? userId : ""}
        />
        <input
          className={style.input_text}
          onChange={(e) => {
            setUserPwd(e.target.value);
          }}
          type="password"
          placeholder="비밀번호"
          value={userPwd ? userPwd : ""}
        />
        {/* 아이디 기억하기 */}
        <div className={style.memorize_id}>
          <input
            className={style.memorize_id_box}
            type="checkbox"
            id="memorize_id_box"
            onClick={() => {
              setIsRemember(!isRemember);
            }}
          />
          <label className={style.memorize_id_txt} htmlFor="memorize_id_box">
            아이디 기억하기
          </label>
        </div>
        {/* 로그인 버튼 */}
        <div>
          <button className={`${style.btn} ${style.login}`} onClick={login}>
            로그인
          </button>
          <img
            className={style.btn}
            src={Kakao_login_medium_wide}
            alt="카카오 로그인 버튼"
            onClick={kakaoLogin}
          />
        </div>
        {/* 아이디, 비밀번호 찾기 */}
        <div className={style.find}>
          <div
            className={style.inline + " " + style.find_txt}
            onClick={showModalFindId}
          >
            아이디 찾기
          </div>

          <div
            className={style.inline + " " + style.find_txt}
            onClick={showModalFindPwd}
          >
            비밀번호 찾기
          </div>
        </div>
        {isModalFindIdOpen && (
          <Modal setModalOpen={setIsModalFindIdOpen}>
            <FindId setModalOpen={setIsModalFindIdOpen} />
          </Modal>
        )}
        {isModalFindPwdOpen && (
          <Modal setModalOpen={setIsModalFindPwdOpen}>
            <FindPwd setModalOpen={setIsModalFindPwdOpen} />
          </Modal>
        )}
      </div>
    </div>
  );
}
