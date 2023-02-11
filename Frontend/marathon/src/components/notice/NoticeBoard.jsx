import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./NoticeBoard.module.css";
import SelectBox from "components/common/SelectBox";
import Pagination from "components/common/Pagination";
import { useQuery } from "@tanstack/react-query";
import { $ } from "util/axios";

export default function NoticeBoard() {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const { pageNum } = useParams();

  /** selectbox 옵션 */
  const optionSearch = [
    { value: "title", name: "제목" },
    { value: "conetent", name: "내용" },
    { value: "title_content", name: "제목 + 내용" },
  ];
  const [searchOption, setSearchOption] = useState(optionSearch[0]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchContent, setSearchContent] = useState("");

  const onChange = (e) => {
    if (searchOption.value === "title") {
      setSearchTitle(e.target.value);
      setSearchContent("");
    } else if (searchOption.value === "content") {
      setSearchTitle("");
      setSearchContent(e.target.value);
    } else {
      setSearchTitle(e.target.value);
      setSearchContent(e.target.value);
    }
  };

  /** 엔터 키 검색 버튼 구현 */
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      refetch();
      navigate(`/notice/${1}`);
    }
  };

  /** 공지사항 접속시 최초 get 호출 */
  const { isLoading, data, isError, error, refetch } = useQuery(
    ["NoticeBoard", pageNum],
    () =>
      $.get(
        `/user-board/list?pageNum=${pageNum}&contentCondition=${searchTitle}&titleCondition=${searchContent}`
      )
  );

  return (
    <>
      <div className={style.container}>
        <div className={style.inner_container}>
          <div className={style.notice_body}>
            <div className={style.notice_top_interface_grid}>
              <div className={style.notice_top_interface_item1}>
                {state.loginUser.userRole === "admin" ? (
                  <button
                    type="button"
                    className={style.notice_button}
                    onClick={() => navigate("/notice/notice-create")}
                  >
                    글쓰기
                  </button>
                ) : null}
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
                <input
                  type="text"
                  id="search"
                  className={style.notice_text}
                  onChange={onChange}
                  onKeyDown={onKeyPress}
                ></input>
              </div>
              <div className={style.notice_top_interface_item4}>
                <button
                  className={style.notice_button}
                  onClick={() => {
                    refetch();
                    navigate(`/notice/${1}`);
                  }}
                  id="enter"
                >
                  검색
                </button>
              </div>
            </div>
            {/** 보드 div입니다. 상단 버튼을 제외한 부분이며 다른 페이지에서 사용 시 해당 div영역과 style.css를 참고해 활용하면 됩니다.
             * grid 비율과 개수가 다를 수 있으니 수정 시 주의해주세요.
             */}
            <div>
              <div className={style.notice_header_container}>
                <div className={style.only_title}>No.</div>
                <div className={style.only_title}>제목</div>
                <div className={style.only_title}>등록일</div>
                <div className={style.count_hidden}>조회수</div>
              </div>
              {/** 현재는 더미데이터, 백엔드와 연결 후 서버에서 값 가져와서 출력 */}
              {!isLoading &&
                data.data.content.map((content) => {
                  return (
                    <div key={content.boardSeq}>
                      <div className={style.notice_header_item}>
                        <div>{content.boardSeq}</div>
                        <div>
                          <Link
                            to={`../detail/${content.boardSeq}`}
                            state={{
                              seq: content.boardSeq,
                            }}
                            className={style.notice_link}
                          >
                            {content.title}
                          </Link>
                        </div>
                        <div>{content.registDate}</div>
                        <div className={style.count_hidden}>
                          {content.viewCnt}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <Pagination
            number={!isLoading && data.data.number}
            first={!isLoading && data.data.first}
            last={!isLoading && data.data.last}
            totalPages={!isLoading && data.data.totalPages}
            url={"notice/"}
          ></Pagination>
        </div>
      </div>
    </>
  );
}
