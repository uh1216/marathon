import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./NoticeDetail.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { $ } from "util/axios";

export default function NoticeDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  /** API DELETE 함수 */
  const res_delete = () =>
    $.delete(`/admin-board/notice/${location.state.seq}`);

  const { isLoading, data, isError, error } = useQuery(
    ["NoticeDetail", location.state.seq],
    () => $.get(`/user-board/${location.state.seq}`)
  );

  const { mutate: deleteArticle } = useMutation(res_delete, {
    oncSuccess: () => {
      console.log("성공");
    },

    onError: (err) => {
      alert("실패");
    },
  });

  return (
    <>
      {!isLoading && (
        <div className={style.container}>
          <div className={style.inner_container}>
            <div className={style.notice_body}>
              <div className={style.notice_top_interface}>
                <div>
                  <button
                    className={style.right_menu + " " + style.notice_button}
                    onClick={() =>
                      navigate("./update", {
                        state: {
                          seq: data.data.boardSeq,
                          title: data.data.title,
                          content: data.data.content,
                        },
                      })
                    }
                  >
                    수정하기
                  </button>
                  <button
                    className={style.notice_button_delete}
                    onClick={deleteArticle}
                  >
                    삭제하기
                  </button>
                </div>
                <div>
                  <button
                    className={style.notice_button}
                    onClick={() => navigate(-1)}
                  >
                    목록으로
                  </button>
                </div>
              </div>
              <div className={style.notice_detail_body}>
                <div className={style.notice_detail_body_header_grid}>
                  {/** 제목이 들어가는 태그 */}
                  <div className={style.notice_detail_body_header_item1}>
                    <h3 className={style.notice_detail_body_header_item1_text}>
                      {data.data.title}
                    </h3>
                  </div>
                  <div className={style.notice_detail_body_header_item2}>
                    <p className={style.font_gray}>
                      작성일 &nbsp;&nbsp;&nbsp;{data.data.registDate}
                    </p>
                  </div>
                  <div className={style.notice_detail_body_header_item3}></div>
                  <div className={style.notice_detail_body_header_item4}>
                    <p className={style.font_gray}>
                      조회수 &nbsp;&nbsp;&nbsp;{data.data.viewCnt}
                    </p>
                  </div>
                  <div className={style.notice_detail_body_header_item5}></div>
                </div>
                <hr />
                {/** 내용이 들어가는 태그 */}
                <div className={style.notice_detail_body_content}>
                  <p className={style.notice_detail_body_content_text}>
                    {data.data.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
