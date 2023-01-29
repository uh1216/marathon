import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./NoticeBoard.module.css";
import SelectBox from "components/common/SelectBox";
import Pagination from "components/common/Pagination";

export default function NoticeBoard() {
  const navigate = useNavigate();

  /** selectbox 옵션 */
  const optionSearch = [
    { value: "title", name: "제목" },
    { value: "conetent", name: "내용" },
    { value: "title_content", name: "제목 + 내용" },
  ];
  const [searchOption, setSearchOption] = useState("none");

  /** 공지사항 데이터 객체로 저장(임시 더미데이터 추가 상태) */
  let contentList = [];
  for (let i = 1; i <= 50; i++) {
    const newContents = {
      num: i,
      title: `${i}번글 제목입니다.`,
      content: `${i}번글 내용입니다. 내용을 채우기 위한 의미없는 글 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`,
      date: "2022.12.30",
      count: i * 1000,
    };
    contentList = [newContents, ...contentList];
  }
  /** 페이지 별로 일정 개수만큼 게시글을 출력하기 위해 사용되는 변수 */
  const pages = Math.ceil(contentList.length / 10);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  /** 페이지 컴포넌트 사용 시 작성해야 할 함수
   * 초기에 x가 undefined로 인식이 되기 때문에 초기값을 1로 설정
   * 그대로 복붙해서 사용해도 지장없음*/
  const nowPage = (x) => {
    if (x === undefined || x === "undefined") setPage(1);
    else setPage(x);
  };

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
            {/** 보드 div입니다. 상단 버튼을 제외한 부분이며 다른 페이지에서 사용 시 해당 div영역과 style.css를 참고해 활용하면 됩니다.
             * grid 비율과 개수가 다를 수 있으니 수정 시 주의해주세요.
             */}
            <div>
              <div className={style.notice_header_container}>
                <div>No.</div>
                <div>제목</div>
                <div>등록일</div>
                <div className={style.count_hidden}>조회수</div>
              </div>
              {/** 현재는 더미데이터, 백엔드와 연결 후 서버에서 값 가져와서 출력 */}
              {contentList.slice(offset, offset + limit).map((content) => {
                return (
                  <>
                    <div className={style.notice_header_item}>
                      <div>{content.num}</div>
                      <div>
                        <Link
                          to={`../detail/${content.num}`}
                          state={{
                            num: content.num,
                            title: content.title,
                            content: content.content,
                            date: content.date,
                            count: content.count,
                          }}
                          className={style.notice_link}
                        >
                          {content.title}
                        </Link>
                      </div>
                      <div>{content.date}</div>
                      <div className={style.count_hidden}>{content.count}</div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          {/** pagination 컴포넌트 활용 */}
          <Pagination contentList={contentList} nowPage={nowPage} num={10} />
        </div>
      </div>
    </>
  );
}
