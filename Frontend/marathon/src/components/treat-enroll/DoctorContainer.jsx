import React, { useEffect, useState } from "react";
import style from "./DoctorContainer.module.css";
import Doctor1 from "img/doctor_1.jpg";
import Doctor2 from "img/doctor_2.jpg";
import Doctor3 from "img/doctor_3.jpg";
import Doctor4 from "img/person_1.jpg";
import DoctorSlider from "./DoctorSlider";

export default function DoctorContainer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const doctors = [
    {
      id: 0,
      name: "이연학",
      content:
        "안녕하세요. 김원장입니다.김원장입니다.김원장입니다.김원장입니다.",
      img_url: Doctor1,
    },
    {
      id: 1,
      name: "최준아",
      content:
        "안녕하세요. 김원장입니다.김원장입니다.김원장입니다.김원장입니다.",
      img_url: Doctor2,
    },
    {
      id: 2,
      name: "김정수",
      content:
        "안녕하세요. 김원장입니다.김원장입니다.김원장입니다.김원장입니다.",
      img_url: Doctor3,
    },
    {
      id: 3,
      name: "김원장1",
      content:
        "안녕하세요. 김원장입니다.김원장입니다.김원장입니다.김원장입니다.",
      img_url: Doctor4,
    },
    {
      id: 4,
      name: "김원장2",
      content:
        "안녕하세요. 김원장입니다.김원장입니다.김원장입니다.김원장입니다.",
      img_url: Doctor4,
    },
  ];

  // 무한슬라이드 구현을 위해 양끝 요소의 인덱스 활용
  const lastItem = JSON.parse(JSON.stringify(doctors[doctors.length - 1]));
  const lastItem2 = JSON.parse(JSON.stringify(doctors[doctors.length - 2]));
  const firstItem = JSON.parse(JSON.stringify(doctors[0]));
  const firstItem2 = JSON.parse(JSON.stringify(doctors[1]));
  lastItem.id = -1;
  lastItem2.id = -2;
  firstItem.id = doctors.length;
  firstItem2.id = doctors.length + 1;
  doctors.push(firstItem);
  doctors.push(firstItem2);
  doctors.unshift(lastItem);
  doctors.unshift(lastItem2);
  const total = doctors.length - 4;

  const goNext = () => {
    if (currentIndex + 1 < total + 1) setCurrentIndex((val) => val + 1);
  };
  const goPrev = () => {
    if (currentIndex > lastItem.id) setCurrentIndex((val) => val - 1);
  };
  const check = (id) => {
    if (id + 1 === currentIndex) {
      return "prev";
    } else if (id - 1 === currentIndex) {
      return "next";
    } else if (id + 2 === currentIndex) {
      return "hidden_prev";
    } else if (id - 2 === currentIndex) {
      return "hidden_next";
    } else if (id === currentIndex) {
      return "now";
    } else {
      return "hidden";
    }
  };

  useEffect(() => {
    if (currentIndex === total) {
      setCurrentIndex(0);
    } else if (currentIndex === -1) {
      setCurrentIndex(total - 1);
    }
  }, [currentIndex]);

  return (
    <>
      <div className={style.container}>
        <div className={style.inner_container}>
          <div className={style.content}>
            <button onClick={goPrev}>앞</button>
            <div className={style.doctorContainer}>
              {doctors.map((val) => {
                return (
                  <DoctorSlider
                    key={val.id}
                    check={check(val.id)}
                    name={val.name}
                    content={val.content}
                    bg={val.img_url}
                  />
                );
              })}
            </div>
            <button onClick={goNext}>뒤</button>
          </div>
        </div>
      </div>
    </>
  );
}
