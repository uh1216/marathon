import { React, useEffect, useRef, useState } from "react";
import style from "./ConsultEnroll.module.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faCalendarCheck,
} from "@fortawesome/free-regular-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SelectBox from "components/common/SelectBox";
import Calendar from "react-calendar";
import "Calendar.css";
import { $ } from "util/axios";

export default function ConsultEnroll() {
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

  const navigate = useNavigate();

  const inputUserName = useRef();
  const inputUserGender = useRef();
  const inputUserYear = useRef();
  const inputUserMonth = useRef();
  const inputUserDay = useRef();
  const inputUserEmailId = useRef();
  const inputUserEmailHost = useRef();
  const inputUserPhone = useRef();
  const inputUserFirstResponder = useRef();
  const inputUserFirstResponderRelationship = useRef();
  const inputUserSecondResponder = useRef();
  const inputUserSecondResponderRelationship = useRef();
  const inputUserTos = useRef();
  const inputDiseaseTos = useRef();
  const inputDiseaseYear = useRef();
  const inputDiseaseMonth = useRef();
  const inputDiseaseDay = useRef();
  const inputDesTextarea = useRef();

  const [userName, setUserName] = useState("");
  const [userGender, setUserGender] = useState("none");
  const [userYear, setUserYear] = useState("none");
  const [userMonth, setUserMonth] = useState("none");
  const [userDay, setUserDay] = useState();
  const [userEmailId, setUserEmailId] = useState("");
  const [userEmailHost, setUserEmailHost] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userFirstResponder, setUserFirstResponder] = useState("");
  const [userFirstResponderRelationship, setUserFirstResponderRelationship] =
    useState("none");
  const [userSecondResponder, setUserSecondResponder] = useState("");
  const [userSecondResponderRelationship, setUserSecondResponderRelationship] =
    useState("none");
  const [userTos, setUserTos] = useState(false);
  const [diseaseTos, setDiseaseTos] = useState(false);
  const [diseaseYear, setDiseaseYear] = useState("none");
  const [diseaseMonth, setDiseaseMonth] = useState("none");
  const [diseaseDay, setDiseaseDay] = useState("none");
  const [desTextarea, setDesTextarea] = useState("");
  const [calenderDay, setCalenderDay] = useState(new Date());

  const [isReadOnly, setIsReadOnly] = useState(false);
  const [optionsDay, setOptionsDay] = useState([{ value: "none", name: "일" }]);
  const [optionsDay2, setOptionsDay2] = useState([
    { value: "none", name: "일" },
  ]);

  /** 신청하기 버튼을 누를 때 실행되는 함수 */
  const checkUp = () => {
    if (userName === "" || userName === null) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "이름을 입력해주세요.",
        confirmButtonText: "닫기",
      });
      inputUserName.current.focus();
    } else if (userGender === "none" || userGender === null) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "성별을 선택해주세요.",
        confirmButtonText: "닫기",
      });
      inputUserGender.current.focus();
    } else if (userYear === "none" || userYear === null) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "생년월일을 선택해주세요.",
        confirmButtonText: "닫기",
      });
      inputUserYear.current.focus();
    } else if (userMonth === "none" || userMonth === null) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "생년월일을 선택해주세요.",
        confirmButtonText: "닫기",
      });
      inputUserMonth.current.focus();
    } else if (userDay === "none" || userDay === null) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "생년월일을 선택해주세요.",
        confirmButtonText: "닫기",
      });
      inputUserDay.current.focus();
    } else if (userEmailId === "" || userEmailId === null) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "이메일을 입력해주세요.",
        confirmButtonText: "닫기",
      });
      inputUserEmailId.current.focus();
    } else if (
      userEmailHost === "" ||
      userEmailHost === null ||
      userEmailHost === "none"
    ) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "이메일을 입력해주세요.",
        confirmButtonText: "닫기",
      });
      inputUserEmailHost.current.focus();
    } else if (userPhone === "" || userPhone === null) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "연락처를 입력해주세요.",
        confirmButtonText: "닫기",
      });
      inputUserPhone.current.focus();
    } else if (!chkPhone(userPhone)) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "연락처가 유효하지 않습니다.",
        confirmButtonText: "닫기",
      });
      inputUserPhone.current.focus();
    } else if (userFirstResponder === "" || userFirstResponder === null) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "비상 연락처 1을 입력해주세요.",
        confirmButtonText: "닫기",
      });
      inputUserFirstResponder.current.focus();
    } else if (!chkPhone(userFirstResponder)) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "연락처가 유효하지 않습니다.",
        confirmButtonText: "닫기",
      });
      inputUserFirstResponder.current.focus();
    } else if (
      userFirstResponderRelationship === "none" ||
      userFirstResponderRelationship === null
    ) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "비상 연락처 1의 관계를 입력해주세요.",
        confirmButtonText: "닫기",
      });
      inputUserFirstResponderRelationship.current.focus();
    } else if (
      userSecondResponderRelationship !== "none" &&
      userSecondResponderRelationship !== null &&
      (userSecondResponder === "" || userSecondResponder === null)
    ) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "비상 연락처 2를 입력해주세요.",
        confirmButtonText: "닫기",
      });
      inputUserSecondResponder.current.focus();
    } else if (
      userSecondResponder.length > 0 &&
      !chkPhone(userSecondResponder)
    ) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "연락처가 유효하지 않습니다.",
        confirmButtonText: "닫기",
      });
      inputUserSecondResponder.current.focus();
    } else if (
      userSecondResponder.length > 0 &&
      (userSecondResponderRelationship === "none" ||
        userSecondResponderRelationship === null)
    ) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "비상 연락처 2의 관계를 입력해주세요.",
        confirmButtonText: "닫기",
      });
      inputUserSecondResponderRelationship.current.focus();
    } else if (
      !diseaseTos &&
      (diseaseYear === "none" || diseaseYear === null)
    ) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "발병일을 선택해주세요.",
        confirmButtonText: "닫기",
      });
      inputDiseaseYear.current.focus();
    } else if (
      (!diseaseTos && diseaseMonth === "none") ||
      diseaseMonth === null
    ) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "발병일을 선택해주세요.",
        confirmButtonText: "닫기",
      });
      inputDiseaseMonth.current.focus();
    } else if ((!diseaseTos && diseaseDay === "none") || diseaseDay === null) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "발병일을 선택해주세요.",
        confirmButtonText: "닫기",
      });
      inputDiseaseDay.current.focus();
    } else if (!desTextarea) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "소통에 어려움 점을 입력해 주세요.",
        confirmButtonText: "닫기",
      });
      inputDesTextarea.current.focue();
    } else if (!userTos) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "이용약관 및 개인정보 처리방침에 동의해주세요.",
        confirmButtonText: "닫기",
      });
      inputUserTos.current.focue();
    } else {
      let hopeY = calenderDay.getFullYear();
      let hopeM =
        calenderDay.getMonth() < 10
          ? `0${calenderDay.getMonth() + 1}`
          : calenderDay.getMonth() + 1;
      let hopeD =
        calenderDay.getDate() < 10
          ? `0${calenderDay.getDate()}`
          : calenderDay.getDate();

      $.post(`/user-consult/apply`, {
        name: userName,
        sex: userGender === "male" ? true : false,
        birthDate: userYear + "-" + userMonth + "-" + userDay,
        email: userEmailId + "@" + userEmailHost,
        phone1: userPhone,
        phone2: userFirstResponder,
        phone2Relationship: userFirstResponderRelationship,
        phone3: userSecondResponder,
        phone3Relationship: userSecondResponderRelationship,
        sickDate: diseaseTos
          ? null
          : diseaseYear + "-" + diseaseMonth + "-" + diseaseDay,
        description: desTextarea,
        hopeDate: hopeY + "-" + hopeM + "-" + hopeD,
      })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "",
            text: "상담신청 완료",
            confirmButtonText: "닫기",
          });
          navigate("/");
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "",
            text: "에러가 발생했습니다. 다시 신청해 주세요.",
            confirmButtonText: "닫기",
          });
          console.log(error);
        });
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
        if (i < 10) days.push({ value: `0${i}`, name: `${i}일` });
        else days.push({ value: `${i}`, name: `${i}일` });
      }

      setOptionsDay(days);
    }
  }, [userYear, userMonth]);

  /** year와 month가 선택되고 난 뒤 day 일 수를 결정 */
  useEffect(() => {
    if (diseaseYear !== "none" && diseaseMonth !== "none") {
      let days = [{ value: "none", name: "일" }];
      const day = new Date(diseaseYear, diseaseMonth, 0).getDate();

      for (let i = 1; i <= day; i++) {
        if (i < 10) days.push({ value: `0${i}`, name: `${i}일` });
        else days.push({ value: `${i}`, name: `${i}일` });
      }

      setOptionsDay2(days);
    }
  }, [diseaseYear, diseaseMonth]);

  useEffect(() => {
    let today_day = new Date().getDate();
    let today_month = new Date().getMonth();
    let today_year = new Date().getFullYear();
    if (
      calenderDay.getFullYear() < today_year ||
      calenderDay.getMonth() < today_month ||
      (calenderDay.getMonth() === today_month &&
        calenderDay.getDate() < today_day)
    ) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "유효한 날짜가 아닙니다.",
        confirmButtonText: "닫기",
      });
      setCalenderDay(new Date());
    }
  }, [calenderDay]);

  return (
    <div className="container">
      <div className="inner_container" style={{ paddingBottom: "10px" }}>
        <div className={style.color_box}>
          <div
            className={style.title_box}
            style={{ animation: "1s ease-in-out loadEffect2" }}
          >
            신청절차
          </div>
          <div
            style={{
              fontSize: "1.1em",
              animation: "0.7s ease-in-out loadEffect1",
            }}
          >
            &nbsp;&nbsp; 먼저 상담을 통해서 환자의 상태와 원격 재활이 가능한 지
            논의해 보세요!
          </div>
          <div className={style.icon_contain_box}>
            <div style={{ animation: "1s ease-in-out loadEffect2" }}>
              <FontAwesomeIcon className={style.icon_box} icon={faFileLines} />
              <h5>상담 신청서 제출</h5>
            </div>
            <div style={{ animation: "1.4s ease-in-out loadEffect2" }}>
              <FontAwesomeIcon className={style.icon_box} icon={faCamera} />
              <h5>부담없는 화상 상담</h5>
            </div>
            <div style={{ animation: "1.8s ease-in-out loadEffect2" }}>
              <FontAwesomeIcon
                className={style.icon_box}
                icon={faCalendarCheck}
              />
              <h5>재활사 선택 / 예약 확정</h5>
            </div>
          </div>
        </div>
      </div>
      <div
        className="inner_container"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className={style.inner_container}
          style={{ animation: "0.8s ease-in-out loadEffect1" }}
        >
          <div style={{ marginLeft: "10px" }}>
            <p style={{ marginBottom: "1px" }}>상담 희망날짜</p>
            {/* 달력 컴포넌트 */}
            <Calendar onChange={setCalenderDay} value={calenderDay} />
          </div>

          {/* 성명 & 성별 */}
          <div className={style.input_div}>
            <label className={style.input_label} htmlFor="user_name">
              대상자 성명
            </label>
            <div className={style.display_flex}>
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
                width="28%"
              />
            </div>
          </div>

          {/* 생년월일 */}
          <div className={style.input_div}>
            <label className={style.input_label}>대상자 생년월일</label>
            <div
              className={style.calbox}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <SelectBox
                options={optionsYear}
                onChange={(x) => setUserYear(x)}
                width="32%"
                ref={inputUserYear}
              />
              <SelectBox
                options={optionsMonth}
                onChange={(x) => setUserMonth(x)}
                width="32%"
                ref={inputUserMonth}
              />
              <SelectBox
                options={optionsDay}
                onChange={(x) => setUserDay(x)}
                width="32%"
                ref={inputUserDay}
              />
            </div>
          </div>

          {/* 이메일 */}
          <div className={style.input_div}>
            <label className={style.input_label} htmlFor="user_email_id">
              이메일
            </label>
            <div className={style.display_flex}>
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
                options={optionHost}
                onChange={(x) => selectEmailHost(x)}
                width="40%"
              />
            </div>
          </div>

          {/* (주) 연락처 */}
          <div className={style.input_div}>
            <label className={style.input_label} htmlFor="user_phone">
              <>주 연락처</>
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

          {/* 비상 연락처 */}
          <div className={style.input_div}>
            <label className={style.input_label} htmlFor="user_first_responder">
              비상 연락처 1
            </label>
            <div className={style.display_flex}>
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
                ref={inputUserFirstResponderRelationship}
                width="28%"
              />
            </div>
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
            <div className={style.display_flex}>
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
                ref={inputUserSecondResponderRelationship}
                width="28%"
              />
            </div>
          </div>

          {/* 발병일 */}
          <div className={style.input_div}>
            <label className={style.input_label}>
              대상자의 뇌손상 발병시기
              <div style={{ display: "inline-block", marginLeft: "40px" }}>
                <input
                  className={style.input_check_box2 + " " + style.inline}
                  type="checkbox"
                  id="tos2"
                  value={diseaseTos}
                  onChange={(e) => {
                    setDiseaseTos(!diseaseTos);
                  }}
                  ref={inputDiseaseTos}
                />
                <label
                  className={`${style.input_label} ${style.inline}`}
                  htmlFor="tos2"
                >
                  해당사항 없음
                </label>
              </div>
            </label>
            <div
              className={style.calbox}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <SelectBox
                options={optionsYear}
                onChange={(x) => setDiseaseYear(x)}
                width="32%"
                ref={inputDiseaseYear}
              />
              <SelectBox
                options={optionsMonth}
                onChange={(x) => setDiseaseMonth(x)}
                width="32%"
                ref={inputDiseaseMonth}
              />
              <SelectBox
                options={optionsDay2}
                onChange={(x) => setDiseaseDay(x)}
                width="32%"
                ref={inputDiseaseDay}
              />
            </div>
          </div>

          {/* 재활에 어려운 점 */}
          <div
            className={style.input_div}
            style={{
              marginTop: "30px",
            }}
          >
            <label className={style.input_label} htmlFor="des_textarea">
              의사소통에서 어려움을 느끼는 부분을 말해주세요!
            </label>
            <textarea
              className={style.input_textarea}
              onChange={(e) => {
                setDesTextarea(e.target.value);
              }}
              value={desTextarea}
              id="des_textarea"
              ref={inputDesTextarea}
              maxLength="174"
            />
          </div>
        </div>

        <div className={style.private_info_box}>
          <h5>개인정보 처리 관련 내용</h5>
          <p>1. 수집하는 개인정보 항목: 성명, 연령, 이메일, 전화번호</p>
          <br />
          <p>
            2. 개인정보의 수집 및 이용 목적: 제공하신 정보는 언어발전소의
            언어재활 상담과 예약을 위해 사용합니다.
          </p>
          <p>
            (1) 본인 확인 식별(동명이인 등) 절차에 이용 (성명, 연령, 이메일,
            전화번호)
          </p>
          <p>(2) 의사소통 및 정보 전달 등에 이용 (성명, 이메일, 전화번호)</p>
          <br />
          <p>3. 개인정보의 보유 및 이용</p>
          <p>
            기간: 수집된 개인정보의 보유 기간은 언어재활 상담 종료 후 1년간이며
            삭제 요청시 즉시 파기합니다.
          </p>
          <p>
            귀하는 이에 대한 동의를 거부할 수 있습니다만, 동의가 없을 시 무료
            언어재활 상담이 불가능할 수 있음을 알려드립니다.
          </p>
        </div>

        {/* 이용약관 동의 */}
        <div className={style.info_check_box}>
          <input
            className={style.input_check_box + " " + style.inline}
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
            style={{ marginLeft: "10px" }}
            htmlFor="tos"
          >
            <span style={{ color: "blue" }}>개인정보 수집 및 이용</span>에
            동의합니다.
          </label>
        </div>

        <button
          className={style.enroll_btn}
          onClick={() => {
            checkUp();
          }}
        >
          신청하기
        </button>
      </div>
    </div>
  );
}
