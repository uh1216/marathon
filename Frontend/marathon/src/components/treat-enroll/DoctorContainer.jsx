import React, { useState } from "react";
import style from "./DoctorContainer.module.css";
import { useQuery } from "@tanstack/react-query";
import { $ } from "util/axios";
import Doctor1 from "img/doctor_1.jpg";
import Doctor2 from "img/doctor_2.jpg";
import Doctor3 from "img/doctor_3.jpg";
import Doctor4 from "img/person_1.jpg";
import RightArrow from "img/right_arrow.png";
import LeftArrow from "img/left_arrow.png";
import DoctorSlider from "./DoctorSlider";

export default function DoctorContainer() {
  const transition = "ease-in-out 0.5s";
  const [currentIndex, setCurrentIndex] = useState();
  const [currentSeq, setCurrentSeq] = useState();
  const [animation, setAnimation] = useState(transition);

  /** API GET 함수 */
  const { isLoading, data, isError, error } = useQuery(["DoctorList"], () =>
    $.get(`/patient-treatment/list`)
  );

  const doctors = [
    {
      id: 1,
      name: "이연학",
      content:
        "안녕하세요. 김원장입니다.김원장입니다.김원장입니다.김원장입니다.",
      img_url: Doctor1,
    },
    {
      id: 2,
      name: "최준아",
      content:
        "안녕하세요. 김원장입니다.김원장입니다.김원장입니다.김원장입니다.",
      img_url: Doctor2,
    },
    {
      id: 3,
      name: "김정수",
      content:
        "안녕하세요. 김원장입니다.김원장입니다.김원장입니다.김원장입니다.",
      img_url: Doctor3,
    },
    {
      id: 4,
      name: "김원장",
      content:
        "안녕하세요. 김원장입니다.김원장입니다.김원장입니다.김원장입니다.",
      img_url: Doctor4,
    },
  ];

  if (!isLoading) {
    const doctor = data.data;
    setCurrentSeq(doctor[0].seq);
    console.log(doctor);
    const last_Item = JSON.parse(JSON.stringify(doctor[doctor.length - 1]));
    const last_Item2 = JSON.parse(JSON.stringify(doctor[doctor.length - 2]));
    const first_Item = JSON.parse(JSON.stringify(doctor[0]));
    const first_Item2 = JSON.parse(JSON.stringify(doctor[1]));

    last_Item.seq = doctor[doctor.length - 1].seq - 1;
    last_Item2.seq = doctor[doctor.length - 1].seq - 2;
    first_Item.seq = doctor[0].seq + 1;
    first_Item2.seq = doctor[0].seq + 2;

    doctor.push(first_Item);
    doctor.push(first_Item2);
    doctor.unshift(last_Item);
    doctor.unshift(last_Item2);

    console.log(doctor);
  }

  // 무한슬라이드 구현을 위해 양끝 요소의 인덱스 활용
  const lastItem = JSON.parse(JSON.stringify(doctors[doctors.length - 1]));
  const lastItem2 = JSON.parse(JSON.stringify(doctors[doctors.length - 2]));
  const firstItem = JSON.parse(JSON.stringify(doctors[0]));
  const firstItem2 = JSON.parse(JSON.stringify(doctors[1]));
  lastItem.id = 0;
  lastItem2.id = -1;
  firstItem.id = doctors.length + 1;
  firstItem2.id = doctors.length + 2;
  doctors.push(firstItem);
  doctors.push(firstItem2);
  doctors.unshift(lastItem);
  doctors.unshift(lastItem2);

  const goNext = () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    if (currentIndex === doctors.length - 4) resetSlide(1);
    setAnimation(transition);
  };

  const goPrev = () => {
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    if (currentIndex === 1) resetSlide(doctors.length - 4);
    setAnimation(transition);
  };

  const resetSlide = (n) => {
    setTimeout(() => {
      setAnimation("");
      setCurrentIndex(n);
    }, 500);
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

  return (
    <>
      <div className={style.container}>
        <div className={style.inner_container}>
          <div className={style.content}>
            <button className={style.arrow} onClick={goPrev}>
              <img className={style.arrow_img} src={LeftArrow} alt="" />
            </button>
            <div className={style.DoctorContainer}>
              {doctors.map((val) => {
                return (
                  <DoctorSlider
                    key={val.id}
                    check={check(val.id)}
                    name={val.name}
                    content={val.introduce}
                    bg={val.img_url}
                    animation={animation}
                  />
                );
              })}
            </div>
            <button className={style.arrow} onClick={goNext}>
              <img className={style.arrow_img} src={RightArrow} alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
