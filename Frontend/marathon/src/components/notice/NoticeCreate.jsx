import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./NoticeCreate.module.css";

export default function NoticeCreate() {
  const navigate = useNavigate();
  //제목, 내용 값 변수에 저장
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // useState 대응 함수
  const onTitle = (title) => {
    setTitle(title);
  };
  const onContent = (content) => {
    setContent(content);
  };
  // 유효성 검사
  const isValid = () => {
    if (title === "") {
      alert("제목을 입력해주세요");
    } else if (content === "") {
      alert("내용을 입력해주세요");
    } else {
      alert("작성되었습니다.");
    }
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.inner_container}>
          <div className={style.notice_body}>
            <div className={style.notice_top_interface}>
              <div className={style.notice_top_interface_title}>
                <h1>공지사항 쓰기</h1>
              </div>
              <div>
                <button
                  className={style.right_menu + " " + style.notice_button}
                  onClick={isValid}
                >
                  등록
                </button>
                <button
                  className={style.right_menu + " " + style.notice_button}
                  onClick={() => navigate(`../${1}`)}
                  style={{ margin: "15px" }}
                >
                  목록으로
                </button>
              </div>
            </div>
            <div className={style.notice_create_body}>
              <input
                className={style.notice_create_title}
                type="text"
                placeholder="제목을 입력해 주세요."
                onChange={(e) => {
                  onTitle(e.target.value);
                }}
              />
              <textarea
                className={style.notice_create_content}
                type="text"
                placeholder="내용을 입력해주세요."
                onChange={(e) => {
                  onContent(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
