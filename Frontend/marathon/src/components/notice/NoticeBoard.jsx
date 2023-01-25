import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./NoticeBoard.module.css";

export default function NoticeBoard() {
  const navigate = useNavigate();
  // 공지사항 데이터 객체로 저장(임시 더미데이터 추가 상태)
  const [noticeLists, setNoticeLists] = useState([
    {
      num: 4,
      title: "4번글 제목입니다.",
      content: "4번글 내용입니다.",
      date: "2022.12.30",
      count: 44444,
    },
    {
      num: 3,
      title: "3번글 제목입니다.",
      content: "3번글 내용입니다.",
      date: "2022.12.25",
      count: 33333,
    },
    {
      num: 2,
      title: "2번글 제목입니다.",
      content: "2번글 내용입니다.",
      date: "2022.12.17",
      count: 22222,
    },
    {
      num: 1,
      title: "1번글 제목입니다.",
      content: "1번글 내용입니다.",
      date: "2022.11.15",
      count: 11111,
    },
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
            {/** 현재는 더미데이터, 백엔드와 연결 후 서버에서 값 가져와서 출력 */}
            {noticeLists.map((list) => {
              return (
                <>
                  <div className={style.notice_header_item}>
                    <div>{list.num}</div>
                    <div>
                      <Link
                        to={`${list.num}`}
                        state={{
                          num: list.num,
                          title: list.title,
                          content: list.content,
                          date: list.date,
                          count: list.count,
                        }}
                        className={style.notice_link}
                      >
                        {list.title}
                      </Link>
                    </div>
                    <div>{list.date}</div>
                    <div>{list.count}</div>
                  </div>
                </>
              );
            })}
          </div>
          <div className={style.notice_pagination}>1 2 3 4 5 6 7 8 9</div>
        </div>
      </div>
    </>
  );
}
