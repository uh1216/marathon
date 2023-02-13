import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import style from "./NoticeDetail.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { $ } from "util/axios";

export default function NoticeDetail() {
  const state = useSelector((state) => state);
  const location = useLocation();
  const navigate = useNavigate();

  /** API DELETE 함수 */
  const res_delete = () =>
    $.delete(`/admin-board/notice/${location.state.seq}`);

  const { isLoading, data } = useQuery(
    ["NoticeDetail", location.state.seq],
    () => {
      return $.get(`/user-board/${location.state.seq}`);
    }
  );

  const { mutate: deleteArticle } = useMutation(res_delete, {
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        text: "삭제되었습니다.",
      });
      navigate(`/notice/${1}`);
    },

    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "",
        text: "실패했습니다.",
        confirmButtonText: "닫기",
      });
    },
  });

  const onDelete = () => {
    Swal.fire({
      icon: "warning",
      title: "",
      text: "삭제하시겠습니까?",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteArticle();
      }
    });
  };

  return (
    <>
      {!isLoading && (
        <div className={style.container}>
          <div className={style.inner_container}>
            <div className={style.notice_body}>
              <div className={style.notice_top_interface}>
                {state.loginUser.userRole === "admin" ? (
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
                      onClick={onDelete}
                    >
                      삭제하기
                    </button>
                  </div>
                ) : null}

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
                      작성일 &nbsp;&nbsp;&nbsp;
                      {location.state.date}
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
