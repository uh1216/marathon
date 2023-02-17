import { useNavigate } from "react-router-dom";
import style from "./Pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

/** 서버로부터 도착한 페이지네이션 데이터에서 number, first, last, totalPages, url을 찾아서 주입 */
export default function Pagination({ number, first, last, totalPages, url }) {
  const navigate = useNavigate();
  const startNum = Math.floor((Math.max(number + 1, 1) - 1) / 10) * 10 + 1;

  const pageListRander = () => {
    const pageList = [];

    pageList.push(
      <div
        className={!first ? style.page_number : style.noWork}
        key={"arrow-front"}
      >
        <FontAwesomeIcon
          style={{ paddingTop: "2.5px" }}
          onClick={() => {
            navigate("/" + url + (number + 0));
          }}
          icon={faChevronLeft}
        />
      </div>
    );

    for (
      let i = startNum;
      i <= Math.min(Math.max(totalPages, 1), startNum + 9);
      i++
    ) {
      pageList.push(
        <div
          key={url + i}
          className={i !== number + 1 ? style.page_number : style.nowPage}
        >
          <span
            onClick={() => {
              navigate("/" + url + i);
            }}
          >
            {i}
          </span>
        </div>
      );
    }

    pageList.push(
      <div
        className={!last ? style.page_number : style.noWork}
        key={"arrow-back"}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          style={{ paddingTop: "2.5px" }}
          onClick={() => {
            navigate("/" + url + (number + 2));
          }}
        />
      </div>
    );

    return pageList;
  };

  return <div className={style.pagination}>{pageListRander()}</div>;
}
