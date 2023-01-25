import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./NoticeBoard.module.css";

export default function NoticeBoard() {
  const navigate = useNavigate();

  return (
    <>
      <div className={style.container}>
        <div className={style.inner_container}>
          <div className={style.notice_body}>
            <div className={style.notice_button}>
              <div>
                <button
                  type="button"
                  onClick={() => navigate("/notice/notice-create")}
                >
                  글쓰기
                </button>
              </div>
              <div>
                <select className={style.right_menu}>
                  <option value="title" defaultChecked>
                    제목
                  </option>
                  <option value="content">내용</option>
                  <option value="titleAndContent">제목 + 내용</option>
                </select>
                <input type="text" className={style.right_menu}></input>
                <button className={style.right_menu}>검색</button>
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
              <div>1</div>
              <div>예시용 제목입니다.</div>
              <div>2023.01.12</div>
              <div>9999</div>
            </div>
            <div className={style.notice_header_item}>
              <div>1</div>
              <div>예시용 제목입니다.</div>
              <div>2023.01.12</div>
              <div>9999</div>
            </div>
            <div className={style.notice_header_item}>
              <div>1</div>
              <div>예시용 제목입니다.</div>
              <div>2023.01.12</div>
              <div>9999</div>
            </div>
            <div className={style.notice_header_item}>
              <div>1</div>
              <div>예시용 제목입니다.</div>
              <div>2023.01.12</div>
              <div>9999</div>
            </div>
            <br />
          </div>
          <div className={style.notice_pagination}>1 2 3 4 5 6 7 8 9</div>
        </div>
      </div>
    </>
  );
}
