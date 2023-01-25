import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./NoticeBoard.module.css";

export default function NoticeBoard() {
  const navigate = useNavigate();
  // 공지사항 데이터 객체로 저장(임시 더미데이터 추가 상태)
  const [noticeList, setNoticeList] = useState([
    { num: 4, title: "4번글", content: "4번글 내용입니다.", count: 9999 },
    { num: 3, title: "3번글", content: "3번글 내용입니다.", count: 9999 },
    { num: 2, title: "2번글", content: "2번글 내용입니다.", count: 9999 },
    { num: 1, title: "1번글", content: "1번글 내용입니다.", count: 9999 },
  ]);

  return (
    <>
      <div className={style.container}>
        <div className={style.inner_container}>
          <div className={style.notice_body}>
            <div className={style.notice_top_interface}>
              <div>
                <button
                  type="button"
                  className={style.notice_button}
                  onClick={() => navigate("/notice/notice-create")}
                >
                  글쓰기
                </button>
              </div>
              <div>
                <select
                  className={style.right_menu + " " + style.notice_select}
                >
                  <option value="title" defaultChecked>
                    제목
                  </option>
                  <option value="content">내용</option>
                  <option value="titleAndContent">제목 + 내용</option>
                </select>
                <input
                  type="text"
                  className={style.right_menu + " " + style.notice_text}
                ></input>
                <button
                  className={style.right_menu + " " + style.notice_button}
                >
                  검색
                </button>
              </div>
            </div>
            <div className={style.notice_header_container}>
              <div>No.</div>
              <div>제목</div>
              <div>등록일</div>
              <div>조회수</div>
            </div>
            {/** 앞으로 데이터를 받아오면 map으로 표현될 부분 */}
            <div className={style.notice_header_item}>
              <div>4</div>
              <div>
                <Link to="/notice/notice-detail" className={style.notice_link}>
                  만 6-8세 자녀를 둔 학부모님께 추천하는 "온라인 사회성 캠프"
                  참여자 모집
                </Link>
              </div>
              <div>2023.01.12</div>
              <div>9999</div>
            </div>
            <div className={style.notice_header_item}>
              <div>3</div>
              <div>3번 글에 대한 제목입니다</div>
              <div>2023.01.12</div>
              <div>9999</div>
            </div>
            <div className={style.notice_header_item}>
              <div>2</div>
              <div>2번 글에 대한 제목입니다</div>
              <div>2023.01.12</div>
              <div>9999</div>
            </div>
            <div className={style.notice_header_item}>
              <div>1</div>
              <div>1번 글에 대한 제목입니다</div>
              <div>2023.01.12</div>
              <div>9999</div>
            </div>
          </div>
          <div className={style.notice_pagination}>1 2 3 4 5 6 7 8 9</div>
        </div>
      </div>
    </>
  );
}
