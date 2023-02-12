import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SelectBox from "components/common/SelectBox";
import style from "./SignUp.module.css";
import { useState } from "react";
import { $ } from "util/axios";
import { useSelector } from "react-redux";

/** 성별 select box 옵션 */
const optionsGender = [
  { value: "none", name: "성별" },
  { value: "male", name: "남성" },
  { value: "female", name: "여성" },
];

/** 태어난 년도 select box 옵션 */
const today = new Date();
const year = today.getFullYear();

const optionsYear = [{ value: "none", name: "년도" }];

for (let i = 0; i < 101; i++) {
  optionsYear.push({ value: `${year - i}`, name: `${year - i}` });
}

/** 태어난 월 select box 옵션 */
const optionsMonth = [
  { value: "none", name: "월" },
  { value: "01", name: "1월" },
  { value: "02", name: "2월" },
  { value: "03", name: "3월" },
  { value: "04", name: "4월" },
  { value: "05", name: "5월" },
  { value: "06", name: "6월" },
  { value: "07", name: "7월" },
  { value: "08", name: "8월" },
  { value: "09", name: "9월" },
  { value: "10", name: "10월" },
  { value: "11", name: "11월" },
  { value: "12", name: "12월" },
];

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

/** 자격증 select box 옵션 */
const optionsLicense = [
  { value: "none", name: "자격증을 선택해 주세요." },
  { value: "1급", name: "1급" },
  { value: "2급", name: "2급" },
  { value: "예비 언어 재활사", name: "예비 언어 재활사" },
];

/** 학력 select box 옵션 */
const optionsEducation = [
  { value: "none", name: "학력을 선택해 주세요." },
  { value: "전문학사", name: "전문학사" },
  { value: "학사", name: "학사" },
  { value: "석사 이상", name: "석사 이상" },
];

export default function SignIn() {
  const { type, kakao } = useParams();
  const navigate = useNavigate();
  const kakaoInfo = useSelector((state) => state).kakaoInfo;

  const inputUserName = useRef();
  const inputUserGender = useRef();
  const inputUserYear = useRef();
  const inputUserMonth = useRef();
  const inputUserDay = useRef();
  const inputUserId = useRef();
  const inputUserPwd = useRef();
  const inputUserPwdChk = useRef();
  const inputUserEmailId = useRef();
  const inputUserEmailHost = useRef();
  const inputUserPhone = useRef();
  const inputUserFirstResponder = useRef();
  const inputUserFirstResponderRelationship = useRef();
  const inputUserSecondResponder = useRef();
  const inputUserSecondResponderRelationship = useRef();
  const inputUserLicense = useRef();
  const inputUserEducation = useRef();
  const inputUserTos = useRef();

  const [isIdValid, SetIsIdValid] = useState(false);
  const [isPwdValid, SetIsPwdValid] = useState(false);
  const [isPwdChkValid, SetIsPwdChkValid] = useState(false);

  const [userIdMsg, setUserIdMsg] = useState(
    "8자 이상, 16자 이하의 아이디를 입력해주세요."
  );
  const [userPwdMsg, setUserPwdMsg] = useState(
    "9자 이상, 16자 이하의 영문, 숫자, 특수문자를 조합해주세요."
  );
  const [userPwdChkMsg, setUserPwdChkMsg] = useState(
    "비밀번호를 한 번 더 기입해주세요."
  );

  const [isNotIdDuplicated, setIsNotIdDuplicated] = useState(false);

  const [userName, setUserName] = useState(
    kakao === "kakao" ? kakaoInfo.userName : ""
  );
  const [userGender, setUserGender] = useState("none");
  const [userYear, setUserYear] = useState("none");
  const [userMonth, setUserMonth] = useState("none");
  const [userDay, setUserDay] = useState("none");
  const [userId, setUserId] = useState(
    kakao === "kakao" ? kakaoInfo.userEmail.split("@")[0] : ""
  );
  const [userPwd, setUserPwd] = useState("");
  const [userPwdChk, setUserPwdChk] = useState("");
  const [userEmailId, setUserEmailId] = useState(
    kakao === "kakao" ? kakaoInfo.userEmail.split("@")[0] : ""
  );
  const [userEmailHost, setUserEmailHost] = useState(
    kakao === "kakao" ? kakaoInfo.userEmail.split("@")[1] : ""
  );
  const [userPhone, setUserPhone] = useState("");
  const [userFirstResponder, setUserFirstResponder] = useState("");
  const [userFirstResponderRelationship, setUserFirstResponderRelationship] =
    useState("none");
  const [userSecondResponder, setUserSecondResponder] = useState("");
  const [userSecondResponderRelationship, setUserSecondResponderRelationship] =
    useState("none");
  const [userLicense, setUserLicense] = useState("none");
  const [userEducation, setUserEducation] = useState("none");
  const [userTos, setUserTos] = useState(false);

  const [isReadOnly, setIsReadOnly] = useState(false);
  const [optionsDay, setOptionsDay] = useState([{ value: "none", name: "일" }]);

  // 브라우저 너비
  const [viewWidth, setViewWidth] = useState(window.innerWidth);

  /** 회원가입 버튼을 누를 때 실행되는 함수 */
  const signUp = () => {
    if (userName === "" || userName === null) {
      alert("이름을 입력해주세요.");
      inputUserName.current.focus();
    } else if (userGender === "none" || userGender === null) {
      alert("성별을 선택해주세요.");
      inputUserGender.current.focus();
    } else if (userYear === "none" || userYear === null) {
      alert("생년월일을 선택해주세요.");
      inputUserYear.current.focus();
    } else if (userMonth === "none" || userMonth === null) {
      alert("생년월일을 선택해주세요.");
      inputUserMonth.current.focus();
    } else if (userDay === "none" || userDay === null) {
      alert("생년월일을 선택해주세요.");
      inputUserDay.current.focus();
    } else if (!isIdValid) {
      alert("아이디가 유효하지 않습니다.");
      inputUserId.current.focus();
    } else if (!isNotIdDuplicated) {
      alert("아이디 중복확인을 해주세요.");
      inputUserId.current.focus();
    } else if (!isPwdValid) {
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
      type === "normal" &&
      (userFirstResponder === "" || userFirstResponder === null)
    ) {
      alert("비상 연락처 1을 입력해주세요.");
      inputUserFirstResponder.current.focus();
    } else if (type === "normal" && !chkPhone(userFirstResponder)) {
      alert("연락처가 유효하지 않습니다.");
      inputUserFirstResponder.current.focus();
    } else if (
      type === "normal" &&
      (userFirstResponderRelationship === "none" ||
        userFirstResponderRelationship === null)
    ) {
      alert("비상 연락처 1의 관계를 입력해주세요.");
      inputUserFirstResponderRelationship.current.focus();
    } else if (
      type === "normal" &&
      userSecondResponderRelationship !== "none" &&
      userSecondResponderRelationship !== null &&
      (userSecondResponder === "" || userSecondResponder === null)
    ) {
      alert("비상 연락처 2를 입력해주세요.");
      inputUserSecondResponder.current.focus();
    } else if (
      type === "normal" &&
      userSecondResponder.length > 0 &&
      !chkPhone(userSecondResponder)
    ) {
      alert("연락처가 유효하지 않습니다.");
      inputUserSecondResponder.current.focus();
    } else if (
      type === "normal" &&
      userSecondResponder.length > 0 &&
      (userSecondResponderRelationship === "none" ||
        userSecondResponderRelationship === null)
    ) {
      alert("비상 연락처 2의 관계를 입력해주세요.");
      inputUserSecondResponderRelationship.current.focus();
    } else if (
      type === "doctor" &&
      (userLicense === "none" || userLicense === null)
    ) {
      alert("자격증을 선택해주세요.");
      inputUserLicense.current.focus();
    } else if (
      type === "doctor" &&
      (userEducation === "none" || userEducation === null)
    ) {
      alert("최종학력을 선택해주세요.");
      inputUserEducation.current.focus();
    } else if (!userTos) {
      alert("이용약관 및 개인정보 처리방침에 동의해주세요.");
      inputUserTos.current.focue();
    } else {
      let user = {
        id: userId,
        name: userName,
        password: userPwd,
        email: userEmailId + "@" + userEmailHost,
        birthDate: userYear + "-" + userMonth + "-" + userDay,
        sex: userGender === "male" ? true : false,
        phone: userPhone,
      };
      if (kakao === "kakao") {
        user.kakao = kakaoInfo.kakaoId;
        user.img = kakaoInfo.userImgUrl;
      }

      if (type === "normal") {
        user.mainPhone = userFirstResponder;
        user.mainRelationship = userFirstResponderRelationship;
        user.subPhone = userSecondResponder;
        user.subRelationship = userSecondResponderRelationship;

        $.post(`/patient-sign/signup`, user)
          .then(() => {
            alert("회원가입에 성공하였습니다.");
            navigate("/");
          })
          .catch((error) => {
            alert("회원가입에 실패하였습니다.");
            console.log(error);
          });
      } else if (type === "doctor") {
        user.degree = userEducation;
        user.license = userLicense;

        $.post(`/doctor-sign/signup`, user)
          .then(() => {
            alert("회원가입에 성공하였습니다.");
            navigate("/");
          })
          .catch((error) => {
            alert("회원가입에 실패하였습니다.");
            console.log(error);
          });
      }
    }
  };

  /** 연락처가 유효한지 체크하는 함수 */
  const chkPhone = (phone) => {
    if (phone.length < 9) return false;
    for (let i = 0; i < phone.length; i++) {
      if ("0" > phone[i] || "9" < phone[i]) return false;
    }
    return true;
  };

  /** 이메일 호스트 select box를 선택했을 때 실행되는 함수 */
  const selectEmailHost = (x) => {
    if (x !== "none") {
      setIsReadOnly(true);
    } else {
      setIsReadOnly(false);
    }
    setUserEmailHost(x);
  };

  /** 아이디 중복 체크 (axios 연결 필요함) */
  const chkIdDuplicated = () => {
    $.get(`/user-sign/checkid/${userId}`)
      .then(() => {
        setIsNotIdDuplicated(true);
        alert("사용 가능한 아이디입니다.");
      })
      .catch((error) => {
        console.log(error);
        setIsNotIdDuplicated(false);
        alert("이미 존재하는 아이디입니다.");
      });
  };

  /** year와 month가 선택되고 난 뒤 day 일 수를 결정 */
  useEffect(() => {
    if (userYear !== "none" && userMonth !== "none") {
      let days = [{ value: "none", name: "일" }];
      const day = new Date(userYear, userMonth, 0).getDate();

      for (let i = 1; i <= day; i++) {
        if (i < 10) days.push({ value: `0${i}`, name: `${i}일` });
        else days.push({ value: `${i}`, name: `${i}일` });
      }

      setOptionsDay(days);
    }
  }, [userYear, userMonth]);

  /** 아이디 유효성 체크 */
  useEffect(() => {
    if (userId.length > 16) {
      setUserIdMsg("최대 16자까지 입력 가능합니다.");
      SetIsIdValid(false);
    } else if (userId.length === 0) {
      setUserIdMsg("8자 이상, 16자 이하의 아이디를 입력해주세요.");
      SetIsIdValid(false);
    } else if (userId.length < 8) {
      setUserIdMsg("아이디는 최소 8자 이상이어야 합니다.");
      SetIsIdValid(false);
    } else {
      setUserIdMsg("유효한 아이디입니다.");
      SetIsIdValid(true);
    }
  }, [userId]);

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

  /** 브라우저 너비 변화 감지 (SelectBox 너비 반응형으로 만들기 위함) */
  useEffect(() => {
    const handleResize = () => {
      setViewWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={style.user_box}>
      <div className={style.inner_container}>
        <div className={style.sub_title}>
          {type === "normal" ? (
            <>언어재활 대상자/보호자</>
          ) : (
            <>언어재활사 선생님</>
          )}
        </div>
        {type === "normal" && (
          <div className={style.information}>
            <div>
              상담을 미리 진행하신 분은
              <br />
              <span className={style.highlight}>카카오톡</span>으로 제공받은
              <br />
              <span className={style.highlight}>대상자 정보</span>를
              작성해주세요!
            </div>
          </div>
        )}
        {/* 성명 & 성별 */}
        <div className={style.input_div}>
          <label className={style.input_label} htmlFor="user_name">
            대상자 성명
          </label>
          <input
            className={style.input_middle}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={userName}
            type="text"
            id="user_name"
            ref={inputUserName}
          />
          <SelectBox
            options={optionsGender}
            onChange={(x) => setUserGender(x)}
            ref={inputUserGender}
          />
        </div>
        {/* 생년월일 */}
        <div className={style.input_div}>
          <label className={style.input_label}>대상자 생년월일</label>
          <div
            style={{
              width: viewWidth > 540 ? "412px" : "320px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <SelectBox
              options={optionsYear}
              onChange={(x) => setUserYear(x)}
              width={viewWidth > 540 ? "191px" : "120px"}
              ref={inputUserYear}
            />
            <SelectBox
              options={optionsMonth}
              onChange={(x) => setUserMonth(x)}
              ref={inputUserMonth}
            />
            <SelectBox
              options={optionsDay}
              onChange={(x) => setUserDay(x)}
              ref={inputUserDay}
            />
          </div>
        </div>
        {/* 아이디 */}
        <div className={style.input_div}>
          <label className={style.input_label} htmlFor="user_id">
            아이디
          </label>
          <input
            className={style.input_middle}
            type="text"
            id="user_id"
            maxLength="16"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            ref={inputUserId}
          />
          <button className={style.chk_id_btn} onClick={chkIdDuplicated}>
            중복확인
          </button>
          <div
            className={`${style.sub_information}`}
            style={
              userId === ""
                ? { color: "#858585" }
                : isIdValid
                ? { color: "blue" }
                : { color: "red" }
            }
          >
            {userIdMsg}
          </div>
        </div>
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
            {type === "normal" ? <>주 연락처</> : <>연락처</>}
          </label>
          <input
            className={`${style.input_number} ${style.input_long}`}
            type="number"
            id="user_phone"
            placeholder="'-'를 제외한 숫자만 입력해 주세요."
            value={userPhone}
            onChange={(e) => {
              setUserPhone(e.target.value);
            }}
            ref={inputUserPhone}
          />
        </div>
        {/* 비상 연락처 or 자격증, 최종학력 */}
        {type === "normal" ? (
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
                type="number"
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
                ref={inputUserFirstResponderRelationship}
              />
              <div className={`${style.sub_information}`}>
                참관 링크 메시지가 발송되는 연락처입니다.
              </div>
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
                type="number"
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
                ref={inputUserSecondResponderRelationship}
              />
            </div>
          </>
        ) : (
          <>
            <div className={style.input_div}>
              <label className={style.input_label} htmlFor="">
                자격증
              </label>
              <SelectBox
                options={optionsLicense}
                width={viewWidth > 540 ? "412px" : "320px"}
                onChange={(x) => {
                  setUserLicense(x);
                }}
                ref={inputUserLicense}
              />
            </div>
            <div className={style.input_div}>
              <label className={style.input_label} htmlFor="">
                최종학력
              </label>
              <SelectBox
                options={optionsEducation}
                width={viewWidth > 540 ? "412px" : "320px"}
                onChange={(x) => {
                  setUserEducation(x);
                }}
                ref={inputUserEducation}
              />
            </div>
          </>
        )}
        {/* 이용약관 동의 */}
        <div className={style.input_div + " " + style.tos}>
          <input
            className={`${style.input_check_box} ${style.inline}`}
            type="checkbox"
            id="tos"
            value={userTos}
            onChange={(e) => {
              setUserTos(e.target.checked);
            }}
            ref={inputUserTos}
          />
          <label
            className={`${style.input_label} ${style.inline}`}
            htmlFor="tos"
          >
            이용약관 및 개인정보 처리방침 (필수)
          </label>
        </div>
        <button className={style.sign_up_btn} onClick={signUp}>
          회원가입
        </button>
      </div>
    </div>
  );
}
