import React, { useEffect, useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentSeq, setCurrentSeq] = useState();
  const [animation, setAnimation] = useState(transition);
  /** API GET 함수 */
  const { isLoading, data, isError, error } = useQuery(["doctorList"], () =>
    $.get(`/patient-treatment/list`)
  );

  // const doctors = [
  //   {
  //     id: 1,
  //     name: "이연학",
  //     introduce:
  //       "안녕하세요. 김원장입니다.김원장입니다.김원장입니다.김원장입니다.",
  //     img: Doctor1,
  //   },
  //   {
  //     id: 2,
  //     name: "최준아",
  //     introduce:
  //       "안녕하세요. 김원장입니다.김원장입니다.김원장입니다.김원장입니다.",
  //     img: Doctor2,
  //   },
  //   {
  //     id: 3,
  //     name: "김정수",
  //     introduce:
  //       "안녕하세요. 김원장입니다.김원장입니다.김원장입니다.김원장입니다.",
  //     img: Doctor3,
  //   },
  //   {
  //     id: 4,
  //     name: "김원장",
  //     introduce:
  //       "안녕하세요. 김원장입니다.김원장입니다.김원장입니다.김원장입니다.",
  //     img: Doctor4,
  //   },
  // ];

  const [doctorList, setDoctorList] = useState();
  useEffect(() => {
    if (!isLoading) {
      let arr = [...data.data];
      console.log(arr);
      const last_Item = JSON.parse(JSON.stringify(arr[arr.length - 1]));
      const last_Item2 = JSON.parse(JSON.stringify(arr[arr.length - 2]));
      const first_Item = JSON.parse(JSON.stringify(arr[0]));
      const first_Item2 = JSON.parse(JSON.stringify(arr[1]));

      last_Item.seq = arr[0].seq - 1;
      last_Item2.seq = arr[0].seq - 2;
      first_Item.seq = arr[arr.length - 1].seq + 1;
      first_Item2.seq = arr[arr.length - 1].seq + 2;

      arr.push(first_Item);
      arr.push(first_Item2);
      arr.unshift(last_Item);
      arr.unshift(last_Item2);
      console.log(arr);
      setDoctorList(arr);
      console.log(doctorList);
    }
  }, [isLoading]);

  const goNext2 = () => {
    let nextSeq = currentSeq;
    /** seq 값이 현재 인덱스의 다음 인덱스가 갖고 있는 seq 값이랑 같아질때까지 nextseq 1씩 증가 */
    while (
      nextSeq !==
      doctorList[doctorList.indexOf(doctorList.find((t) => t.seq === 33)) + 1]
        .seq
    ) {
      nextSeq = nextSeq + 1;
    }
    setCurrentSeq(nextSeq);
    if (currentSeq === doctorList[0].seq) resetSlide(doctorList[0].seq);
    setAnimation(transition);
  };

  const goPrev2 = () => {
    let nextSeq = currentSeq;
    /** seq 값이 현재 인덱스의 이전 인덱스가 갖고 있는 seq 값이랑 같아질때까지 nextseq 1씩 감소 */
    while (
      nextSeq !==
      doctorList[doctorList.indexOf(doctorList.find((t) => t.seq === 33)) - 1]
        .seq
    ) {
      nextSeq = nextSeq - 1;
    }
    setCurrentSeq(nextSeq);
    if (currentSeq === doctorList[doctorList.length - 1].seq)
      resetSlide(doctorList[0].seq);
    setAnimation(transition);
  };

  const check = (seq) => {
    console.log(seq);
    if (
      doctorList[doctorList.indexOf(doctorList.find((t) => t.seq === seq))]
        .seq === 32
    ) {
      return "prev";
    } else if (
      doctorList[doctorList.indexOf(doctorList.find((t) => t.seq === seq))]
        .seq === 34
    ) {
      return "next";
    } else if (
      doctorList[doctorList.indexOf(doctorList.find((t) => t.seq === seq))]
        .seq === 31
    ) {
      return "hidden_prev";
    } else if (
      doctorList[doctorList.indexOf(doctorList.find((t) => t.seq === seq))]
        .seq === 35
    ) {
      return "hidden_next";
    } else if (33) {
      return "now";
    } else {
      return "hidden";
    }
  };

  const resetSlide = (n) => {
    setTimeout(() => {
      setAnimation("");
      setCurrentIndex(n);
    }, 500);
  };

  return (
    <>
      {!isLoading && (
        <div className={style.container}>
          <div className={style.inner_container}>
            <div className={style.content}>
              <button className={style.arrow} onClick={goPrev2}>
                <img className={style.arrow_img} src={LeftArrow} alt="" />
              </button>
              <div className={style.DoctorContainer}>
                {doctorList.map((val) => {
                  console.log(doctorList);
                  return (
                    <DoctorSlider
                      key={val.seq}
                      check={check(val.seq)}
                      name={val.name}
                      content={val.introduce}
                      bg={val.img}
                      animation={animation}
                    />
                  );
                })}
              </div>
              <button className={style.arrow} onClick={goNext2}>
                <img className={style.arrow_img} src={RightArrow} alt="" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
  // 무한슬라이드 구현을 위해 양끝 요소의 인덱스 활용
  // const lastItem = JSON.parse(JSON.stringify(doctors[doctors.length - 1]));
  // const lastItem2 = JSON.parse(JSON.stringify(doctors[doctors.length - 2]));
  // const firstItem = JSON.parse(JSON.stringify(doctors[0]));
  // const firstItem2 = JSON.parse(JSON.stringify(doctors[1]));
  // lastItem.id = 0;
  // lastItem2.id = -1;
  // firstItem.id = doctors.length + 1;
  // firstItem2.id = doctors.length + 2;
  // doctors.push(firstItem);
  // doctors.push(firstItem2);
  // doctors.unshift(lastItem);
  // doctors.unshift(lastItem2);

  // const goNext = () => {
  //   const newIndex = currentIndex + 1;
  //   setCurrentIndex(newIndex);
  //   if (currentIndex === doctors.length - 4) resetSlide(1);
  //   setAnimation(transition);
  // };

  // const goPrev = () => {
  //   const newIndex = currentIndex - 1;
  //   setCurrentIndex(newIndex);
  //   if (currentIndex === 1) resetSlide(doctors.length - 4);
  //   setAnimation(transition);
  // };

  // const check = (id) => {
  //   if (id + 1 === currentIndex) {
  //     return "prev";
  //   } else if (id - 1 === currentIndex) {
  //     return "next";
  //   } else if (id + 2 === currentIndex) {
  //     return "hidden_prev";
  //   } else if (id - 2 === currentIndex) {
  //     return "hidden_next";
  //   } else if (id === currentIndex) {
  //     return "now";
  //   } else {
  //     return "hidden";
  //   }
  // };

  // return (
  //   <>
  //     <div className={style.container}>
  //       <div className={style.inner_container}>
  //         <div className={style.content}>
  //           <button className={style.arrow} onClick={goPrev}>
  //             <img className={style.arrow_img} src={LeftArrow} alt="" />
  //           </button>
  //           <div className={style.DoctorContainer}>
  //             {doctors.map((val) => {
  //               return (
  //                 <DoctorSlider
  //                   key={val.seq}
  //                   check={check(val.seq)}
  //                   name={val.name}
  //                   content={val.introduce}
  //                   bg={val.img}
  //                   animation={animation}
  //                 />
  //               );
  //             })}
  //           </div>
  //           <button className={style.arrow} onClick={goNext}>
  //             <img className={style.arrow_img} src={RightArrow} alt="" />
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}
