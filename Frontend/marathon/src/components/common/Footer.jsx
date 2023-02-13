import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./Footer.module.css";
import marathon from "img/marathon.png";
import ssafy from "img/ssafy.png";
import gitlab from "img/gitlab.png";
import jira from "img/jira.png";
import notion from "img/notion.png";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: "#f3efef", marginTop: "100px" }}>
      <footer className={style.footer}>
        <div className={style.inner_footer}>
          <div className={style.left_div}>
            <img
              src={marathon}
              className={style.marathon}
              onClick={() => {
                navigate("/");
                window.scrollTo(0, 0);
              }}
              alt=""
            />
            <img
              src={ssafy}
              className={style.ssafy}
              onClick={() => {
                window.open("https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp");
              }}
              alt=""
            />
          </div>
          <div className={style.center_div}>
            <div>
              <p>SSAFY 8기 2학기 공통 프로젝트</p>
              <p>김동연 | 김정수 | 윤호산 | 이연학 | 조웅희 | 최준아</p>
            </div>
            <p>Copyright©MARATHON All Rights Reserved.</p>
          </div>
          <div className={style.right_div}>
            <div className={style.ground}>
              <img
                src={gitlab}
                className={style.gitlab}
                onClick={() => {
                  window.open(
                    "https://lab.ssafy.com/s08-webmobile1-sub2/S08P12A304"
                  );
                }}
                alt=""
              />
            </div>
            <div className={style.ground} style={{ paddingTop: "10px" }}>
              <img
                src={jira}
                className={style.jira}
                onClick={() => {
                  window.open(
                    "https://ssafy.atlassian.net/jira/software/c/projects/S08P12A304/boards/1303"
                  );
                }}
                alt=""
              />
            </div>
            <div className={style.ground}>
              <img
                src={notion}
                className={style.notion}
                onClick={() => {
                  window.open(
                    "https://ramen-buang.notion.site/SSAFY-2-1-4c60153fe8824115a14fcdabecdd8169"
                  );
                }}
                alt=""
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
