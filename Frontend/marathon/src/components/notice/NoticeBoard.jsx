import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./NoticeBoard.module.css";

export default function NoticeBoard() {
  const navigate = useNavigate();

  return (
    <>
      <div className={style.board}>
        <div className={style.innerboard}>
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
                <select>
                  <option value="title" defaultChecked>
                    제목
                  </option>
                  <option value="content">내용</option>
                  <option value="titleAndContent">제목 + 내용</option>
                </select>
              </div>
              <div>
                <input type="text"></input>
              </div>
              <div>
                <button>검색</button>
              </div>
            </div>
            <div className={style.notice_list}>
              게시판 보드가 들어갈 공간입니다.
            </div>
            <br />
          </div>
          <div className={style.notice_pagination}>1 2 3 4 5 6 7 8 9</div>
        </div>
      </div>
    </>
  );
}
