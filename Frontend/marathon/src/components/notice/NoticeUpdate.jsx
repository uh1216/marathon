import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
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

  /** API PUT 함수 */
  const res_put = () => {
    return $.put(`/admin-board/notice/${location.state.seq}`, newData);
  };

  const { mutate: onSubmit } = useMutation(res_put, {
    onSuccess: () => {
      queryClient.invalidateQueries(`[NoticeDetail, ${location.state.seq}]`);
      Swal.fire({
        icon: "success",
        title: "",
        text: "수정되었습니다.",
        confirmButtonText: "닫기",
      });
      navigate(-1);
    },

    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "",
        text: "실패했습니다.",
        confirmButtonText: "닫기",
      });
      navigate(-1);
    },
  });

  // 유효성 검사
  const isValid = () => {
    if (title === "") {
      Swal.fire({
        icon: "error",
        title: "",
        text: "제목을 입력해주세요.",
        confirmButtonText: "닫기",
      });
    } else if (content === "") {
      Swal.fire({
        icon: "error",
        title: "",
        text: "내용을 입력해주세요.",
        confirmButtonText: "닫기",
      });
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
