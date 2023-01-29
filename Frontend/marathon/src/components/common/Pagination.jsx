import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Pagination.module.css";

/** nowPage : 현재 페이지를 조회하는 부모 컴포넌트 함수
 *  contentList : 부모컴포넌트에서 서버를 통해 데이터를 객체로 받아서 저장한 변수
 *  contentList의 경우 배열 변수로 각 개체를 저장하는 변수입니다. NoticeBoard.jsx 19번 줄부터 작성된 코드를 예시로 활용하면 됩니다.
 *  해당 컴포넌트는 하단에 페이지 목록을 출력할 용도이고 게시글을 출력하기 위해선 부모컴포넌트에서 별도로 코드를 작성해야 합니다.
 */

export default function Pagination({ nowPage, contentList }) {
  const pages = Math.ceil(contentList.length / 10);
  const [page, setPage] = useState(nowPage);

  const pageListRander = () => {
    const pageList = [];
    /** for문을 통해 총 페이지 수를 기준으로 1번부터 끝번까지 pageList 배열에 저장
     * Link 경로의 경우 메인페이지/:인덱스번호 형태로 넘어가기 위해 ../인덱스 번호 형태로 사용
     */
    for (let i = 1; i <= pages; i++) {
      pageList.push(
        <Link
          to={`../${i}`}
          className={style.page_number}
          onClick={() => {
            setPage(i);
            nowPage(i);
          }}
        >
          <span>{i}</span>
        </Link>
      );
    }
    return pageList;
  };

  return <div className={style.notice_pagination}>{pageListRander()}</div>;
}
