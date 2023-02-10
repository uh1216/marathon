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
  const [isArr, setIsArr] = useState(false);

  /** API GET 함수 */
  const { isLoading, data, isError, error } = useQuery(["DoctorList"], () =>
    $.get(`/patient-treatment/list`)
  );

  const init = (array) => {
    let list = [...array];
    if (list.length > 0) {
      setCurrentSeq(array[0].seq);
      setFirstSeq(array[0].seq);
      setLastSeq(array[array.length - 1].seq);
    }
    if (list.length > 1) setIsArr(true);
    // 무한슬라이드 구현을 위해 양끝 요소의 인덱스 활용
    if (list.length >= 3) {
      const lastItem = JSON.parse(JSON.stringify(list[list.length - 1]));
      const lastItem2 = JSON.parse(JSON.stringify(list[list.length - 2]));
      const lastItem3 = JSON.parse(JSON.stringify(list[list.length - 3]));
      const firstItem = JSON.parse(JSON.stringify(list[0]));
      const firstItem2 = JSON.parse(JSON.stringify(list[1]));
      const firstItem3 = JSON.parse(JSON.stringify(list[2]));
      lastItem.seq = list[0].seq - 1;
      lastItem2.seq = list[0].seq - 2;
      lastItem3.seq = list[0].seq - 3;
      firstItem.seq = list[list.length - 1].seq + 1;
      firstItem2.seq = list[list.length - 1].seq + 2;
      firstItem3.seq = list[list.length - 1].seq + 3;
      list.push(firstItem);
      list.push(firstItem2);
      list.push(firstItem3);
      list.unshift(lastItem);
      list.unshift(lastItem2);
      list.unshift(lastItem3);
      return list;
    } else if (list.length === 2) {
      const lastItem = JSON.parse(JSON.stringify(list[list.length - 1]));
      const lastItem2 = JSON.parse(JSON.stringify(list[list.length - 2]));
      const lastItem3 = JSON.parse(JSON.stringify(list[list.length - 1]));
      const firstItem = JSON.parse(JSON.stringify(list[0]));
      const firstItem2 = JSON.parse(JSON.stringify(list[1]));
      const firstItem3 = JSON.parse(JSON.stringify(list[0]));
      lastItem.seq = list[0].seq - 1;
      lastItem2.seq = list[0].seq - 2;
      lastItem3.seq = list[0].seq - 3;
      firstItem.seq = list[list.length - 1].seq + 1;
      firstItem2.seq = list[list.length - 1].seq + 2;
      firstItem3.seq = list[list.length - 1].seq + 3;
      list.push(firstItem);
      list.push(firstItem2);
      list.push(firstItem3);
      list.unshift(lastItem);
      list.unshift(lastItem2);
      list.unshift(lastItem3);
      return list;
    } else if (list.length === 1) {
      return list;
    }
  };

  const goNext = () => {
    const btn = document.getElementById("nextBtn");
    setTimeout(() => {
      btn.hidden = true;
    });
    setTimeout(() => {
      btn.hidden = false;
    }, 500);

    let newSeq =
      arr[arr.indexOf(arr.find((t) => t.seq === currentSeq)) + 1].seq;
    setCurrentSeq(newSeq);
    if (arr.length >= 8) {
      if (currentSeq === arr[arr.length - 4].seq) resetSlide(firstSeq);
      setAnimation(transition);
    } else if (arr.length === 1) return;
  };

  const goPrev = () => {
    const btn = document.getElementById("prevBtn");
    setTimeout(() => {
      btn.hidden = true;
    });
    setTimeout(() => {
      btn.hidden = false;
    }, 500);
    let newSeq =
      arr[arr.indexOf(arr.find((t) => t.seq === currentSeq)) - 1].seq;
    setCurrentSeq(newSeq);
    if (arr.length >= 8) {
      if (currentSeq === arr[3].seq) resetSlide(lastSeq);
      setAnimation(transition);
    } else if (arr.length === 1) return;
  };

  const resetSlide = (n) => {
    setTimeout(() => {
      setAnimation("");
      setCurrentSeq(n);
    }, 500);
  };

  const check = (seq) => {
    if (arr.length >= 8) {
      if (
        seq === arr[arr.indexOf(arr.find((t) => t.seq === currentSeq)) - 1].seq
      ) {
        return "prev";
      } else if (
        seq === arr[arr.indexOf(arr.find((t) => t.seq === currentSeq)) + 1].seq
      ) {
        return "next";
      } else if (
        seq === arr[arr.indexOf(arr.find((t) => t.seq === currentSeq)) - 2].seq
      ) {
        return "hidden_prev";
      } else if (
        seq === arr[arr.indexOf(arr.find((t) => t.seq === currentSeq)) + 2].seq
      ) {
        return "hidden_next";
      } else if (
        seq === arr[arr.indexOf(arr.find((t) => t.seq === currentSeq))].seq
      ) {
        return "now";
      } else {
        return "hidden";
      }
    } else if (arr.length === 1) return "now";
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
            <button
              id="prevBtn"
              className={style.arrow}
              onClick={goPrev}
              disabled={!isArr}
            >
              <img className={style.arrow_img} src={LeftArrow} alt="" />
            </button>
            <div className={style.DoctorContainer}>
              {arr &&
                arr.map((val) => {
                  return (
                    <DoctorSlider
                      key={val.seq}
                      seq={val.seq}
                      check={check(val.seq)}
                      name={val.name}
                      introduce={val.introduce}
                      img={val.img}
                      animation={animation}
                    />
                  );
                })}
              {!arr && (
                <div>
                  <h4>현재 등록된 재활선생님이 안계세요...</h4>
                </div>
              )}
            </div>
            <button
              id="nextBtn"
              className={style.arrow}
              onClick={goNext}
              disabled={!isArr}
            >
              <img className={style.arrow_img} src={RightArrow} alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
