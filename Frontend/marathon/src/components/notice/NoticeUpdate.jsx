import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./NoticeUpdate.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $ } from "util/axios";

export default function NoticeUpdate() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(location.state.title);
  const [content, setContent] = useState(location.state.content);

  const newData = {
    title: title,
    content: content,
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  /** API 통신 함수 */
  const res = () => $.put(`/admin-board/notice`, newData);
  const { mutate: onSubmit } = useMutation(res, {
    oncSuccess: () => {
      console.log("성공");
    },

    onError: (err) => {
      alert("실패");
    },
  });

  // 유효성 검사
  const isValid = () => {
    if (title === "") {
      alert("제목을 입력해주세요");
    } else if (content === "") {
      alert("내용을 입력해주세요");
    } else {
      onSubmit();
    }
  };

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
                  onClick={isValid}
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
                  onClick={() => navigate(`../${1}`)}
                >
                  목록으로
                </button>
              </div>
            </div>
            <div className={style.notice_create_body}>
              <input
                className={style.notice_create_title}
                type="text"
                value={title}
                onChange={onChangeTitle}
              />
              <textarea
                className={style.notice_create_content}
                value={content}
                onChange={onChangeContent}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
