import React, { useEffect, useState } from "react";
import style from "./DoctorContainer.module.css";
import { useQuery } from "@tanstack/react-query";
import { $ } from "util/axios";
import RightArrow from "img/right_arrow.png";
import LeftArrow from "img/left_arrow.png";
import DoctorSlider from "./DoctorSlider";

export default function DoctorContainer() {
  const transition = "ease-in-out 0.5s";
  const [currentSeq, setCurrentSeq] = useState();
  const [animation, setAnimation] = useState(transition);
  const [arr, setArr] = useState([]);
  const [firstSeq, setFirstSeq] = useState();
  const [lastSeq, setLastSeq] = useState();

  /** API GET 함수 */
  const { isLoading, data, isError, error } = useQuery(["DoctorList"], () =>
    $.get(`/patient-treatment/list`)
  );

  const init = (array) => {
    let list = [...array];
    setCurrentSeq(array[0].seq);
    setFirstSeq(array[0].seq);
    setLastSeq(array[array.length - 1].seq);

    // 무한슬라이드 구현을 위해 양끝 요소의 인덱스 활용
    const lastItem = JSON.parse(JSON.stringify(list[list.length - 1]));
    const lastItem2 = JSON.parse(JSON.stringify(list[list.length - 2]));
    const firstItem = JSON.parse(JSON.stringify(list[0]));
    const firstItem2 = JSON.parse(JSON.stringify(list[1]));
    lastItem.seq = list[0].seq - 1;
    lastItem2.seq = list[0].seq - 2;
    firstItem.seq = list[list.length - 1].seq + 1;
    firstItem2.seq = list[list.length - 1].seq + 2;
    list.push(firstItem);
    list.push(firstItem2);
    list.unshift(lastItem);
    list.unshift(lastItem2);
    return list;
  };

  const goNext = () => {
    let newSeq =
      arr[arr.indexOf(arr.find((t) => t.seq === currentSeq)) + 1].seq;
    setCurrentSeq(newSeq);
    if (currentSeq === arr[arr.length - 3].seq) resetSlide(firstSeq);
    setAnimation(transition);
  };

  const goPrev = () => {
    let newSeq =
      arr[arr.indexOf(arr.find((t) => t.seq === currentSeq)) - 1].seq;
    setCurrentSeq(newSeq);
    if (currentSeq === arr[2].seq) resetSlide(lastSeq);
    setAnimation(transition);
  };

  const resetSlide = (n) => {
    setTimeout(() => {
      setAnimation("");
      setCurrentSeq(n);
    }, 500);
  };

  const check = (seq) => {
    if (seq + 1 === currentSeq) {
      return "prev";
    } else if (seq - 1 === currentSeq) {
      return "next";
    } else if (seq + 2 === currentSeq) {
      return "hidden_prev";
    } else if (seq - 2 === currentSeq) {
      return "hidden_next";
    } else if (seq === currentSeq) {
      return "now";
    } else {
      return "hidden";
    }
  };

  useEffect(() => {
    if (isLoading) return;
    setArr(init(data.data));
  }, [isLoading]);

  return (
    <>
      <div className={style.container}>
        <div className={style.inner_container}>
          <div className={style.content}>
            <button className={style.arrow} onClick={goPrev}>
              <img className={style.arrow_img} src={LeftArrow} alt="" />
            </button>
            <div className={style.DoctorContainer}>
              {arr.map((val) => {
                return (
                  <DoctorSlider
                    key={val.seq}
                    seq={val.seq}
                    check={check(val.seq)}
                    name={val.name}
                    introduce={val.introduce}
                    img={val.img_url}
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
