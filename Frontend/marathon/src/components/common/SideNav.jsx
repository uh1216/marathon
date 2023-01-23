import React from "react";
import style from "./SideNav.module.css";
import { useNavigate } from "react-router-dom";

export default function SideNav(props) {
  const navigate = useNavigate();

  return (
    <>
      <div className={style.side_board}>
        <h4>{props.sideNavTitle}</h4>
        <hr />
        {props.sideNavContent.map((data, i) => {
          return props.nowSideNav === data ? (
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
                props.setNowSideNav(data);
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
