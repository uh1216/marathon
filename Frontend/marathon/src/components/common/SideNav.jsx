import React from "react";
import style from "./SideNav.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeNowSideNav } from "stores/store";

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
