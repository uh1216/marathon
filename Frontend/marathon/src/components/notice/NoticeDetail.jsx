import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import style from "./NoticeDetail.module.css";

export default function NoticeDetail() {
  let { num } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(num, location);

  return (
    <>
      <div className={style.container}>
        <div className={style.inner_container}>
          <div className={style.notice_body}>
            <div className={style.notice_top_interface}>
              <div>
                <button
                  className={style.right_menu + " " + style.notice_button}
                  onClick={() => navigate("./update")}
                >
                  수정하기
                </button>
                <button className={style.notice_button}>삭제하기</button>
              </div>
              <div>
                <button
                  className={style.notice_button}
                  onClick={() => navigate("/notice/")}
                >
                  목록으로
                </button>
              </div>
            </div>
            <div className={style.notice_detail_body}>
              <div className={style.notice_detail_body_header_grid}>
                <div className={style.notice_detail_body_header_item1}>
                  <h3>{location.state.title}</h3>
                </div>
                <div className={style.notice_detail_body_header_item2}>
                  <p>
                    작성일 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{location.state.date}
                  </p>
                </div>
                <div className={style.notice_detail_body_header_item3}></div>
                <div className={style.notice_detail_body_header_item4}>
                  <p>
                    조회수 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{location.state.count}
                  </p>
                </div>
                <div className={style.notice_detail_body_header_item5}></div>
              </div>
              <hr />
              <div className={style.notice_detail_body_content}>
                <p>{location.state.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
