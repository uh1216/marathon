import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SelectBox from "components/common/SelectBox";
import style from "./SignUp.module.css";
import { useState } from "react";

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
  { value: "1", name: "1월" },
  { value: "2", name: "2월" },
  { value: "3", name: "3월" },
  { value: "4", name: "4월" },
  { value: "5", name: "5월" },
  { value: "6", name: "6월" },
  { value: "7", name: "7월" },
  { value: "8", name: "8월" },
  { value: "9", name: "9월" },
  { value: "10", name: "10월" },
  { value: "11", name: "11월" },
  { value: "12", name: "12월" },
];

/** 이메일 호스트 select box 옵션 */
const optionHost = [
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
    value: "",
    name: "본인",
  },
  {
    value: "",
    name: "배우자",
  },
  {
    value: "",
    name: "자녀",
  },
  {
    value: "",
    name: "형제",
  },
  {
    value: "",
    name: "부모",
  },
  {
    value: "",
    name: "기타",
  },
];

/** 자격증 select box 옵션 */
const optionsLicense = [
  { value: "none", name: "자격증을 선택해 주세요." },
  { value: "", name: "1급" },
  { value: "", name: "2급" },
  { value: "", name: "예비 언어 재활사" },
];

/** 학력 select box 옵션 */
const optionsEducation = [
  { value: "none", name: "학력을 선택해 주세요." },
  { value: "", name: "전문학사" },
  { value: "", name: "학사" },
  { value: "", name: "석사 이상" },
];

export default function SignIn() {
  const { type } = useParams();
  const navigate = useNavigate();

  const [userName, setUserName] = useState();
  const [userGender, setUserGender] = useState();
  const [userYear, setUserYear] = useState();
  const [userMonth, setUserMonth] = useState();
  const [userDay, setUserDay] = useState();
  const [userPwd, setUserPwd] = useState();
  const [userPwdChk, setUserPwdChk] = useState();
  const [userEmailId, setUserEmailId] = useState();
  const [userEmailHost, setUserEmailHost] = useState();
  const [userPhone, setUserPhone] = useState();
  const [userFirstResponder, setUserFirstResponder] = useState();
  const [userSecondResponder, setUserSecondResponder] = useState();
  const [userLicense, setUserLicense] = useState();
  const [userEducation, setUserEducation] = useState();
  const [userTos, setUserTos] = useState(false);

  const [isReadOnly, setIsReadOnly] = useState(false);
  const [optionsDay, setOptionsDay] = useState([{ value: "none", name: "일" }]);

  /** 회원가입 버튼을 누를 때 실행되는 함수 */
  const signUp = () => {
    // 회원가입 폼에 입력한 정보를 일단은 console에 찍는다. (나중에 삭제)
    console.log({
      userType: type,
      userName: userName,
      userGender: userGender,
      userYear: userYear,
      userMonth: userMonth,
      userDay: userDay,
      userPwd: userPwd,
      userPwdChk: userPwdChk,
      userEmailId: userEmailId,
      userEmailHost: userEmailHost,
      userPhone: userPhone,
      userFirstResponder: userFirstResponder,
      userSecondResponder: userSecondResponder,
      userLicense: userLicense,
      userEducation: userEducation,
      userTos: userTos,
    });
    navigate("/");
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

  /** year와 month가 선택되고 난 뒤 day 일 수를 결정 */
  useEffect(() => {
    if (userYear !== "none" && userMonth !== "none") {
      let days = [{ value: "none", name: "일" }];
      const day = new Date(userYear, userMonth, 0).getDate();

      for (let i = 1; i <= day; i++) {
        days.push({ value: `${i}`, name: `${i}일` });
      }

      setOptionsDay(days);
    }
  }, [userYear, userMonth]);

  return (
    <div className={style.user_box}>
      <div className={style.sub_title}>
        {type === "normal" ? (
          <>언어재활 대상자/보호자</>
        ) : (
          <>언어재활사 선생님</>
        )}
      </div>
      {type === "normal" && (
        <div className={style.information}>
          상담을 미리 진행하신 분은
          <br />
          <span className={style.highlight}>카카오톡</span>으로 제공받은
          <br />
          <span className={style.highlight}>대상자 정보</span>를 작성해주세요!
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
        />
        <SelectBox options={optionsGender} onChange={(x) => setUserGender(x)} />
      </div>
      {/* 생년월일 */}
      <div className={style.input_div}>
        <label className={style.input_label}>대상자 생년월일</label>
        <div
          style={{
            width: "412px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <SelectBox
            options={optionsYear}
            onChange={(x) => setUserYear(x)}
            width="191px"
          />
          <SelectBox options={optionsMonth} onChange={(x) => setUserMonth(x)} />
          <SelectBox options={optionsDay} onChange={(x) => setUserDay(x)} />
        </div>
      </div>
      {/* 아이디 */}
      <div className={style.input_div}>
        <label className={style.input_label} htmlFor="user_id">
          아이디
        </label>
        <input className={style.input_middle} type="text" id="user_id" />
        <button className={style.chk_id_btn}>중복확인</button>
        <div className={`${style.sub_information}`}>
          유효성 검사 메시지 들어가는 곳
        </div>
      </div>
      {/* 비밀번호 */}
      <div className={style.input_div}>
        <label className={style.input_label} htmlFor="user_pwd">
          비밀번호
        </label>
        <input className={style.input_long} type="password" id="user_pwd" />
        <div className={`${style.sub_information}`}>
          유효성 검사 메시지 들어가는 곳
        </div>
      </div>
      {/* 비밀번호 확인 */}
      <div className={style.input_div}>
        <label className={style.input_label} htmlFor="user_pwd_chk">
          비밀번호 확인
        </label>
        <input className={style.input_long} type="password" id="user_pwd_chk" />
        <div className={`${style.sub_information}`}>
          유효성 검사 메시지 들어가는 곳
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
        />
        <span className={style.at}>@</span>

        <input
          className={style.input_email_host}
          type="text"
          id="input_email_host"
          readOnly={isReadOnly}
          value={userEmailHost === "none" ? "" : userEmailHost}
        />
        <SelectBox options={optionHost} onChange={(x) => selectEmailHost(x)} />
      </div>
      {/* (주) 연락처 */}
      <div className={style.input_div}>
        <label className={style.input_label} htmlFor="user_phone">
          {type === "normal" ? <>주 연락처</> : <>연락처</>}
        </label>
        <input
          className={`${style.input_number} ${style.input_long}`}
          type="text"
          id="user_phone"
          placeholder="'-'를 제외한 숫자만 입력해 주세요."
        />
      </div>
      {/* 비상 연락처 or 자격증, 최종학력 */}
      {type === "normal" ? (
        <>
          <div className={style.input_div}>
            <label className={style.input_label} htmlFor="user_first_responder">
              비상 연락처 1
            </label>
            <input
              className={`${style.input_number} ${style.input_middle}`}
              type="text"
              id="user_first_responder"
              placeholder="'-'를 제외한 숫자만 입력해 주세요."
            />
            <SelectBox options={optionsRelationship} />
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
              type="text"
              id="user_second_responder"
              placeholder="'-'를 제외한 숫자만 입력해 주세요."
            />
            <SelectBox options={optionsRelationship} />
          </div>
        </>
      ) : (
        <>
          <div className={style.input_div}>
            <label className={style.input_label} htmlFor="">
              자격증
            </label>
            <SelectBox options={optionsLicense} width="412px" />
          </div>
          <div className={style.input_div}>
            <label className={style.input_label} htmlFor="">
              최종학력
            </label>
            <SelectBox options={optionsEducation} width="412px" />
          </div>
        </>
      )}
      {/* 이용약관 동의 */}
      <div className={style.input_div}>
        <input
          className={`${style.input_check_box} ${style.inline}`}
          type="checkbox"
          id="tos"
        />
        <label className={`${style.input_label} ${style.inline}`} htmlFor="tos">
          이용약관 및 개인정보 처리방침 (필수)
        </label>
      </div>
      <button className={style.sign_up_btn} onClick={signUp}>
        회원가입
      </button>
    </div>
  );
}
