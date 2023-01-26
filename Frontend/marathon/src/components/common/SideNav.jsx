import React from "react";
import style from "./SideNav.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeNowSideNav } from "stores/toggle.store";

/**
 * 부모 컴포넌트에서는 다음과 같이 사용하기 (참고)
 * <SideNav sideNavTitle={sideNavTitle} sideNavContent={sideNavContent} urls={urls} />
 * sideNavTitle : 사이드 NavBar의 제목 항목이다. 부모에서 해당 변수를 선언해서 주입해 주어야 한다.
 * sideNavContent : 사이드 NavBar의 선택가능 항목들이다. 부모에서 해당 배열을 선언해서 주입해 주어야 한다.
 * urls : 사이드 NavBar의 항목을 클릭시 연결될 url들이다. sideNavContent와 동일한 순서로 입력해 주어야 한다.
 *        부모에서 해당 배열을 선언해서 주입해 주어야 한다.
 *
 * !!위의 데이터들은 모두 필수 입력사항이다!!
 */

export default function SideNav(props) {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      <div className={style.side_board}>
        <h4>{props.sideNavTitle}</h4>
        <hr />
        {props.sideNavContent.map((data, i) => {
          return state.nowSideNav === data ? (
            <p
              key={i}
              className={style.now}
              onClick={() => {
                navigate(props.urls[i]);
              }}
            >
              ▶ {data}
            </p>
          ) : (
            <p
              key={i}
              onClick={() => {
                dispatch(changeNowSideNav(data));
                navigate(props.urls[i]);
              }}
            >
              {data}
            </p>
          );
        })}
        <hr />
      </div>
    </>
  );
}
