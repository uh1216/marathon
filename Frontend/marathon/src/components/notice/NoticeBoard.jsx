import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./NoticeBoard.module.css";
import SelectBox from "components/common/SelectBox";

export default function NoticeBoard() {
  const navigate = useNavigate();
  // selectbox 옵션
  const optionSearch = [
    { value: "title", name: "제목" },
    { value: "conetent", name: "내용" },
    { value: "title_content", name: "제목 + 내용" },
  ];
  const [searchOption, setSearchOption] = useState("none");

  // 공지사항 데이터 객체로 저장(임시 더미데이터 추가 상태)
  const [noticeLists, setNoticeLists] = useState([
    {
      num: 4,
      title: "4번글 제목입니다.",
      content:
        "4번글 내용입니다.\n\
      4번글 내용입니다.\n\
      4번글 내용입니다.",
      date: "2022.12.30",
      count: 44444,
    },
    {
      num: 3,
      title: "3번글 제목입니다.",
      content:
        "3번글 내용입니다.\n\
      3번글 내용입니다.\n\
      3번글 내용입니다.",
      date: "2022.12.25",
      count: 33333,
    },
    {
      num: 2,
      title: "2번글 제목입니다.",
      content:
        "2번글 내용입니다.\n\
      2번글 내용입니다.\n\
      2번글 내용입니다.",
      date: "2022.12.17",
      count: 22222,
    },
    {
      num: 1,
      title: "1번글 제목입니다.",
      content:
        "1번글 내용입니다.\n\
      1번글 내용입니다.\n\
      1번글 내용입니다.",
      date: "2022.11.15",
      count: 11111,
    },
  ]);

  return (
    <>
      <div className={style.container}>
        <div className={style.inner_container}>
          <div className={style.notice_body}>
            <div className={style.notice_top_interface_grid}>
              <div className={style.notice_top_interface_item1}>
                <button
                  type="button"
                  className={style.notice_button}
                  onClick={() => navigate("/notice/notice-create")}
                >
                  글쓰기
                </button>
              </div>
              <div className={style.notice_top_interface_item2}>
                <SelectBox
                  options={optionSearch}
                  onChange={(e) => {
                    setSearchOption(e);
                  }}
                  width="90%"
                />
              </div>
              <div className={style.notice_top_interface_item3}>
                <input type="text" className={style.notice_text}></input>
              </div>
              <div className={style.notice_top_interface_item4}>
                <button className={style.notice_button}>검색</button>
              </div>
            </div>
            <div className={style.notice_header_container}>
              <div>No.</div>
              <div>제목</div>
              <div>등록일</div>
              <div className={style.count_hidden}>조회수</div>
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
                    <div className={style.count_hidden}>{list.count}</div>
                  </div>
                </>
              );
            })}
          </div>
          {/** 추후 서버를 통해 게시글을 조회받으면 일정 수 만큼 잘라서 pagination */}
          <div className={style.notice_pagination}>1 2 3 4 5 6 7 8 9</div>
        </div>
      </div>
    </>
  );
}
