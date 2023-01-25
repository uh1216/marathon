import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./NoticeUpdate.module.css";

export default function NoticeUpdate() {
  const navigate = useNavigate();
  const num = useParams();
  console.log(num);

  return (
    <>
      <div className={style.container}>
        <div className={style.inner_container}>
          <div className={style.notice_body}>
            <div className={style.notice_top_interface}>
              <div>
                <h1>수정하기</h1>
              </div>
              <div>
                <button
                  className={style.right_menu + " " + style.notice_button}
                >
                  등록
                </button>
                <button
                  className={style.right_menu + " " + style.notice_button}
                  onClick={() => navigate(-1)}
                >
                  뒤로가기
                </button>
                <button
                  className={style.right_menu + " " + style.notice_button}
                  onClick={() => navigate("/notice/")}
                >
                  목록으로
                </button>
              </div>
            </div>
            <div className={style.notice_create_body}>
              <div className={style.notice_create_inner_body}>
                <input
                  className={style.notice_create_title}
                  type="text"
                  placeholder="제목을 입력해 주세요."
                />
                <textarea
                  className={style.notice_create_content}
                  type="text"
                  placeholder="내용을 입력해주세요."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
