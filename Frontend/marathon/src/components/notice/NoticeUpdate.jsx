import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./NoticeUpdate.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $ } from "util/axios";

export default function NoticeUpdate() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  console.log(
    queryClient.getQueryData(["NoticeDetail", location.state.seq]).data
  );

  const [title, setTitle] = useState(location.state.title);
  const [content, setContent] = useState(location.state.content);

  const newData = [
    {
      title: title,
      content: content,
    },
  ];

  /** API 통신 함수 */
  const res = $.put(`/admin-board/notice/${location.state.seq}`, newData);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  /** PUT 요청을 위한 쿼리 함수 */
  const { mutate: onSubmit } = useMutation(
    res
    //   {
    //   onMutate: async (newData) => {
    //     const oldQueryData = queryClient.getQueryData([
    //       "NoticeDetail",
    //       location.state.seq,
    //     ]);
    //     await queryClient.cancelQueries(oldQueryData);
    //     // queryClient.setQueriesData(oldQueryData, ())
    //   },

    //   oncSuccess: () => {
    //     console.log("성공");
    //   },

    //   onError: (err) => {
    //     alert("수정에 실패했습니다..");
    //   },
    // }
  );

  // 유효성 검사
  const isValid = () => {
    if (title === "") {
      alert("제목을 입력해주세요");
    } else if (content === "") {
      alert("내용을 입력해주세요");
    } else {
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
                  onClick={onSubmit}
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
