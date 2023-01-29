import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import style from "./NoticeDetail.module.css";

export default function NoticeDetail() {
  let { num } = useParams();
  // location 함수는 더미데이터 확인용으로 사용, 서버에서 데이터를 받아올 경우 해당 코드 삭제 예정
  const location = useLocation();
  const navigate = useNavigate();

  // 게시글 관련 변수(서버에서 받아온 값을 set을 통해 변수에 넣을 예정)
  const [title, setTitle] = useState(location.state.title);
  const [content, setContent] = useState(location.state.content);

  return (
    <>
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
                        title: title,
                        content: content,
                      },
                    })
                  }
                >
                  수정하기
                </button>
                <button className={style.notice_button_delete}>삭제하기</button>
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
                  <h3>{title}</h3>
                </div>
                <div className={style.notice_detail_body_header_item2}>
                  <p className={style.font_gray}>
                    작성일 &nbsp;&nbsp;&nbsp;{location.state.date}
                  </p>
                </div>
                <div className={style.notice_detail_body_header_item3}></div>
                <div className={style.notice_detail_body_header_item4}>
                  <p className={style.font_gray}>
                    조회수 &nbsp;&nbsp;&nbsp;{location.state.count}
                  </p>
                </div>
                <div className={style.notice_detail_body_header_item5}></div>
              </div>
              <hr />
              {/** 내용이 들어가는 태그 */}
              <div className={style.notice_detail_body_content}>
                <p>{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
