import SelectBox from "components/common/SelectBox";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNowSideNav } from "stores/toggle.store";
import style from "./UserInformation.module.css";
import { useQuery } from "@tanstack/react-query";
import { $ } from "util/axiosFile";
import { useNavigate } from "react-router-dom";
import { userLogout } from "stores/user.store";
import { changeImg } from "stores/user.store";

/** 마이페이지 - 나의 정보 */
export default function UserInformation() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputUserPwd = useRef();
  const inputUserPwdChk = useRef();
  const inputUserEmailId = useRef();
  const inputUserEmailHost = useRef();
  const inputUserPhone = useRef();
  const inputUserFirstResponder = useRef();
  const inputUserFirstResponderRelationship = useRef();
  const inputUserSecondResponder = useRef();
  const inputUserSecondResponderRelationship = useRef();
  const inputUserSelfIntroduce = useRef();

  const [userPwdMsg, setUserPwdMsg] = useState(
    "9자 이상, 16자 이하의 영문, 숫자, 특수문자를 조합해주세요."
  );
  const [userPwdChkMsg, setUserPwdChkMsg] = useState(
    "비밀번호를 한 번 더 기입해주세요."
  );

  const [isPwdValid, SetIsPwdValid] = useState(false);
  const [isPwdChkValid, SetIsPwdChkValid] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [newImgUrl, setNewImgUrl] = useState("");
  const [imgFile, setImgFile] = useState(null); //파일
  const [userSignUpDate, setUserSignUpDate] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [userPwdChk, setUserPwdChk] = useState("");
  const [userEmailId, setUserEmailId] = useState("");
  const [userEmailHost, setUserEmailHost] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userFirstResponder, setUserFirstResponder] = useState("");
  const [userFirstResponderRelationship, setUserFirstResponderRelationship] =
    useState("none");
  const [userSecondResponder, setUserSecondResponder] = useState("");
  const [userSecondResponderRelationship, setUserSecondResponderRelationship] =
    useState("none");
  const [userSelfIntroduce, setUserSelfIntroduce] = useState("");

  /** 이메일 호스트 select box 옵션 */
  const optionEmailHost = [
    { value: "none", name: "직접 입력" },
    { value: "daum.net", name: "daum.net" },
    { value: "gmail.com", name: "gmail.com" },
    { value: "hanmail.net", name: "hanmail.net" },
    { value: "hotmail.com", name: "hotmail.com" },
    { value: "kakao.com", name: "kakao.com" },
    { value: "nate.com", name: "nate.com" },
    { value: "naver.com", name: "naver.com" },
  ];

  /** 비상 연락처 관계 select box 옵션 */
  const optionsRelationship = [
    {
      value: "none",
      name: "관계",
    },
    {
      value: "본인",
      name: "본인",
    },
    {
      value: "배우자",
      name: "배우자",
    },
    {
      value: "자녀",
      name: "자녀",
    },
    {
      value: "형제",
      name: "형제",
    },
    {
      value: "부모",
      name: "부모",
    },
    {
      value: "기타",
      name: "기타",
    },
  ];

  /** 이메일 호스트 select box를 선택했을 때 실행되는 함수 */
  const selectEmailHost = (x) => {
    if (x !== "none") {
      setIsReadOnly(true);
    } else {
      setIsReadOnly(false);
    }
    setUserEmailHost(x);
  };

  /** 사이드 Nav 초기화 */
  useEffect(() => {
    dispatch(changeNowSideNav("회원 정보 관리"));
  }, []);

  /** 비밀번호 유효성 체크 */
  useEffect(() => {
    if (userPwd.length === 0) {
      setUserPwdMsg(
        "9자 이상, 16자 이하의 영문, 숫자, 특수문자를 조합해주세요."
      );
      SetIsPwdValid(false);
    } else if (userPwd.length < 9) {
      setUserPwdMsg("최소 9글자를 입력해야 합니다.");
      SetIsPwdValid(false);
    } else if (userPwd.length > 16) {
      setUserPwdMsg("최대 16자까지 입력 가능합니다.");
      SetIsPwdValid(false);
    } else {
      let isAlpha = false;
      let isNumber = false;
      let isSpecial = false;
      [...userPwd].forEach((element) => {
        if (
          ("a" <= element && element <= "z") ||
          ("A" <= element && element <= "Z")
        )
          isAlpha = true;
        else if ("1" <= element && element <= "9") isNumber = true;
        else isSpecial = true;
      });
      if (isAlpha && isNumber && isSpecial) {
        setUserPwdMsg("사용 가능한 비밀번호입니다.");
        SetIsPwdValid(true);
      } else {
        setUserPwdMsg("비밀번호는 영문, 숫자, 특수문자가 조합되어야 합니다.");
        SetIsPwdValid(false);
      }
    }
  }, [userPwd]);

  /** 비밀번호가 일치하는지 확인 */
  useEffect(() => {
    if (userPwdChk === "" || userPwdChk === null) {
      setUserPwdChkMsg("비밀번호를 한 번 더 기입해주세요.");
      SetIsPwdChkValid(false);
    } else if (userPwd === userPwdChk) {
      setUserPwdChkMsg("입력한 비밀번호와 일치합니다.");
      SetIsPwdChkValid(true);
    } else {
      setUserPwdChkMsg("입력한 비밀번호와 일치하지 않습니다.");
      SetIsPwdChkValid(false);
    }
  }, [userPwd, userPwdChk]);

  /** 연락처가 유효한지 체크하는 함수 */
  const chkPhone = (phone) => {
    if (phone.length < 9) return false;
    for (let i = 0; i < phone.length; i++) {
      if ("0" > phone[i] || "9" < phone[i]) return false;
    }
    return true;
  };

  /** 회원정보 불러오기 */
  const { data: userInfo } = useQuery(
    ["getUserInformation"],
    () => {
      return $.get(`/${state.loginUser.userRole}-sign/modify`);
    },
    {
      onSuccess: ({ data }) => {
        setImgUrl(data.img);
        setUserName(state.loginUser.userName);
        setUserEmailId(data.email.split("@")[0]);
        setUserEmailHost(data.email.split("@")[1]);
        setUserPhone(data.phone.replaceAll("-", ""));
        setUserSignUpDate(data.registDate);
        setUserId(data.id);
        if (state.loginUser.userRole === "patient") {
          setUserFirstResponder(data.mainPhone.replaceAll("-", ""));
          setUserFirstResponderRelationship(data.mainRelationship);
          setUserSecondResponder(data.mainPhone.replaceAll("-", ""));
          setUserSecondResponderRelationship(data.subRelationship);
        } else if (state.loginUser.userRole === "doctor") {
          setUserSelfIntroduce(data.introduce ? data.introduce : "");
        }
      },
    }
  );

  /** 회원탈퇴 버튼을 누르면 실행되는 함수 */
  const unregister = () => {
    const check = window.confirm("정말로 탈퇴하시겠습니까?");
    if (check) {
      $.delete(`/user-sign/withdraw`)
        .then(() => {
          alert("정상적으로 회원탈퇴 되었습니다.");
          dispatch(userLogout());
          navigate("/");
          window.scrollTo(0, 0);
        })
        .catch((error) => console.log(error));
    }
  };

  /** 수정완료 버튼을 누르면 실행되는 함수 */
  const modify = () => {
    if (!isPwdValid) {
      alert("비밀번호가 유효하지 않습니다.");
      inputUserPwd.current.focus();
    } else if (!isPwdChkValid) {
      alert("비밀번호 확인이 일치하지 않습니다.");
      inputUserPwdChk.current.focus();
    } else if (userEmailId === "" || userEmailId === null) {
      alert("이메일을 입력해주세요.");
      inputUserEmailId.current.focus();
    } else if (
      userEmailHost === "" ||
      userEmailHost === null ||
      userEmailHost === "none"
    ) {
      alert("이메일을 입력해주세요.");
      inputUserEmailHost.current.focus();
    } else if (userPhone === "" || userPhone === null) {
      alert("연락처를 입력해주세요.");
      inputUserPhone.current.focus();
    } else if (!chkPhone(userPhone)) {
      alert("연락처가 유효하지 않습니다.");
      inputUserPhone.current.focus();
    } else if (
      state.loginUser.userRole === "patient" &&
      (userFirstResponder === "" || userFirstResponder === null)
    ) {
      alert("비상 연락처 1을 입력해주세요.");
      inputUserFirstResponder.current.focus();
    } else if (
      state.loginUser.userRole === "patient" &&
      !chkPhone(userFirstResponder)
    ) {
      alert("연락처가 유효하지 않습니다.");
      inputUserFirstResponder.current.focus();
    } else if (
      state.loginUser.userRole === "patient" &&
      (userFirstResponderRelationship === "none" ||
        userFirstResponderRelationship === null)
    ) {
      alert("비상 연락처 1의 관계를 입력해주세요.");
      inputUserFirstResponderRelationship.current.focus();
    } else if (
      state.loginUser.userRole === "patient" &&
      userSecondResponderRelationship !== "none" &&
      userSecondResponderRelationship !== null &&
      (userSecondResponder === "" || userSecondResponder === null)
    ) {
      alert("비상 연락처 2를 입력해주세요.");
      inputUserSecondResponder.current.focus();
    } else if (
      state.loginUser.userRole === "patient" &&
      userSecondResponder.length > 0 &&
      !chkPhone(userSecondResponder)
    ) {
      alert("연락처가 유효하지 않습니다.");
      inputUserSecondResponder.current.focus();
    } else if (
      state.loginUser.userRole === "patient" &&
      userSecondResponder.length > 0 &&
      (userSecondResponderRelationship === "none" ||
        userSecondResponderRelationship === null)
    ) {
      alert("비상 연락처 2의 관계를 입력해주세요.");
      inputUserSecondResponderRelationship.current.focus();
    } else {
      let userInfo = {
        password: userPwd,
        email: userEmailId + "@" + userEmailHost,
        phone: userPhone,
        img: newImgUrl ? newImgUrl : imgUrl,
      };

      if (state.loginUser.userRole === "patient") {
        userInfo.mainPhone = userFirstResponder.toString();
        userInfo.mainRelationship = userFirstResponderRelationship;
        userInfo.subPhone = userSecondResponder.toString();
        userInfo.subRelationship = userSecondResponderRelationship;
      } else if (state.loginUser.userRole === "doctor") {
        userInfo.introduce = userSelfIntroduce;
      }

      const formData = new FormData();
      formData.append("image", imgFile);
      formData.append(
        `${state.loginUser.userRole}`,
        new Blob([JSON.stringify(userInfo)], { type: "application/json" })
      );

      $.put(`/${state.loginUser.userRole}-sign/modify`, formData)
        .then((res) => {
          alert("수정 완료되었습니다.");
          console.log(res);
          sessionStorage.setItem("access-token", res.data.accessToken);
          setUserPwd("");
          setUserPwdChk("");
          if (newImgUrl) {
            dispatch(changeImg(newImgUrl));
          }
        })
        .catch((error) => {
          console.log(error);
        });

      // console.log({
      //   userSelfIntroduce: userSelfIntroduce,
      // });
    }
  };

  /** file input 선택 후 실행될 함수 */
  const encodeFileToBase64 = (fileBlob) => {
    setImgFile(fileBlob);
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setNewImgUrl(reader.result);
        resolve();
      };
    });
  };

  return (
    <div className="container">
      <div className={style.side_right_board}>
        <h2>나의 정보</h2>
        <div className={style.information_box}>
          {/* 왼쪽 박스 */}
          <div className={style.left_box}>
            {/* 프로필 사진 */}
            <img
              className={style.profile_img}
              src={
                newImgUrl
                  ? newImgUrl
                  : imgUrl
                  ? imgUrl
                  : "https://d1v10kml6l14kq.cloudfront.net/default.jpg"
              }
              alt="프로필 사진"
            />
            <div className={style.user_name}>{userName} 님</div>
            <div className={style.welcome}>환영합니다.</div>
            <label className={style.btn_upload}>
              사진 업로드
              <input
                className={style.btn_upload}
                type="file"
                id="fileImgInput"
                accept="image/*"
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                }}
              />
            </label>

            <hr className={style.left_center_line} />
            <div className={style.sub_title}>아이디</div>
            <div className={style.sub_content}>{userId}</div>
            <div className={style.sub_title}>가입 날짜</div>
            <div className={style.sub_content}>{userSignUpDate}</div>
          </div>
          <hr className={style.center_line} />
          {/* 오른쪽 박스 */}
          <div className={style.right_box}>
            {/* input */}
            <div>
              {/* 비밀번호 */}
              <div className={style.input_div}>
                <label className={style.input_label} htmlFor="user_pwd">
                  비밀번호
                </label>
                <input
                  className={style.input_long}
                  type="password"
                  id="user_pwd"
                  maxLength="16"
                  value={userPwd}
                  onChange={(e) => {
                    setUserPwd(e.target.value);
                  }}
                  ref={inputUserPwd}
                />
                <div
                  className={`${style.sub_information}`}
                  style={
                    userPwd === ""
                      ? { color: "#858585" }
                      : isPwdValid
                      ? { color: "blue" }
                      : { color: "red" }
                  }
                >
                  {userPwdMsg}
                </div>
              </div>
              {/* 비밀번호 확인 */}
              <div className={style.input_div}>
                <label className={style.input_label} htmlFor="user_pwd_chk">
                  비밀번호 확인
                </label>
                <input
                  className={style.input_long}
                  type="password"
                  id="user_pwd_chk"
                  maxLength="16"
                  value={userPwdChk}
                  onChange={(e) => {
                    setUserPwdChk(e.target.value);
                  }}
                  ref={inputUserPwdChk}
                />
                <div
                  className={`${style.sub_information}`}
                  style={
                    userPwdChk === ""
                      ? { color: "#858585" }
                      : isPwdChkValid
                      ? { color: "blue" }
                      : { color: "red" }
                  }
                >
                  {userPwdChkMsg}
                </div>
              </div>
              {/* 이메일 */}
              <div className={style.input_div}>
                <label className={style.input_label} htmlFor="user_email_id">
                  이메일
                </label>
                <input
                  className={`${style.input_email_id}`}
                  type="text"
                  id="user_email_id"
                  value={userEmailId}
                  onChange={(e) => {
                    setUserEmailId(e.target.value);
                  }}
                  ref={inputUserEmailId}
                />
                <span className={style.at}>@</span>

                <input
                  className={style.input_email_host}
                  type="text"
                  id="input_email_host"
                  readOnly={isReadOnly}
                  value={userEmailHost === "none" ? "" : userEmailHost}
                  onChange={(e) => setUserEmailHost(e.target.value)}
                  ref={inputUserEmailHost}
                />
                <SelectBox
                  options={optionEmailHost}
                  onChange={(x) => selectEmailHost(x)}
                />
              </div>
              {/* (주) 연락처 */}
              <div className={style.input_div}>
                <label className={style.input_label} htmlFor="user_phone">
                  {state.loginUser.userRole === "patient" ? (
                    <>주 연락처</>
                  ) : (
                    <>연락처</>
                  )}
                </label>
                <input
                  className={`${style.input_number} ${style.input_long}`}
                  type="text"
                  id="user_phone"
                  placeholder="'-'를 제외한 숫자만 입력해 주세요."
                  value={userPhone}
                  onChange={(e) => {
                    setUserPhone(e.target.value);
                  }}
                  ref={inputUserPhone}
                />
              </div>
              {/* userRole에 따라서 달라지는 내용 */}
              {state.loginUser.userRole === "patient" ? (
                <>
                  <div className={style.input_div}>
                    <label
                      className={style.input_label}
                      htmlFor="user_first_responder"
                    >
                      비상 연락처 1
                    </label>
                    <input
                      className={`${style.input_number} ${style.input_middle}`}
                      type="text"
                      id="user_first_responder"
                      placeholder="'-'를 제외한 숫자만 입력해 주세요."
                      value={userFirstResponder}
                      onChange={(e) => {
                        setUserFirstResponder(e.target.value);
                      }}
                      ref={inputUserFirstResponder}
                    />
                    <SelectBox
                      options={optionsRelationship}
                      onChange={(x) => {
                        setUserFirstResponderRelationship(x);
                      }}
                      defaultValue={userFirstResponderRelationship}
                      ref={inputUserFirstResponderRelationship}
                    />
                  </div>
                  <div className={style.input_div}>
                    <label
                      className={style.input_label}
                      htmlFor="user_second_responder"
                    >
                      비상 연락처 2 (선택)
                    </label>
                    <input
                      className={`${style.input_number} ${style.input_middle}`}
                      type="text"
                      id="user_second_responder"
                      placeholder="'-'를 제외한 숫자만 입력해 주세요."
                      value={userSecondResponder}
                      onChange={(e) => {
                        setUserSecondResponder(e.target.value);
                      }}
                      ref={inputUserSecondResponder}
                    />
                    <SelectBox
                      options={optionsRelationship}
                      onChange={(x) => setUserSecondResponderRelationship(x)}
                      defaultValue={userSecondResponderRelationship}
                      ref={inputUserSecondResponderRelationship}
                    />
                  </div>
                </>
              ) : state.loginUser.userRole === "doctor" ? (
                <>
                  <div className={style.input_div}>
                    <label
                      className={style.input_label}
                      htmlFor="user_self_introduce"
                    >
                      자기소개
                    </label>
                    <textarea
                      className={style.input_textarea}
                      onChange={(e) => {
                        setUserSelfIntroduce(e.target.value);
                      }}
                      id="user_self_introduce"
                      ref={inputUserSelfIntroduce}
                      maxLength="174"
                      value={userSelfIntroduce}
                      placeholder="이용자들에게 보여질 자기소개 글을 작성해주세요."
                    ></textarea>
                  </div>
                </>
              ) : null}
            </div>
            <div className={style.btns}>
              <button className={style.btn_unregister} onClick={unregister}>
                회원탈퇴
              </button>
              <button className={style.btn_modify} onClick={modify}>
                수정완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
