import React from "react";
import style from "./Footer.module.css";
import marathon from "img/marathon.png";
import ssafy from "img/ssafy.png";
import gitlab from "img/gitlab.png";
import jira from "img/jira.png";
import notion from "img/notion.png";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.inner_footer}>
        <div className={style.left_div}>
          <img src={marathon} className={style.marathon} alt="" />
          <img src={ssafy} className={style.ssafy} alt="" />
        </div>
        <div className={style.center_div}>
          <div className={style.center_inner_div}>
            <p>이용약관</p>
            <p>개인처리방침</p>
          </div>
          <div>
            <p>SSAFY 8기 2학기 공통 프로젝트</p>
            <p>김동연 | 김정수 | 윤호산 | 이연학 | 조웅희 | 최준아</p>
          </div>
          <p>Copyright©MARATHON All Rights Reserved.</p>
        </div>
        <div className={style.right_div}>
          <div className={style.ground}>
            <img src={gitlab} className={style.gitlab} alt="" />
          </div>
          <div className={style.ground} style={{ paddingTop: "10px" }}>
            <img src={jira} className={style.jira} alt="" />
          </div>
          <div className={style.ground}>
            <img src={notion} className={style.notion} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
}
