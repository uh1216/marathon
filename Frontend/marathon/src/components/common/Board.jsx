import style from "./Board.module.css";
import { useSelector } from "react-redux";

export default function Board({ headRow, grid, data }) {
  const state = useSelector((state) => state);
  if (state.loginUser.userRole === "patient") {
    return (
      <>
        <div
          className={style.header_container}
          style={{ gridTemplateColumns: grid }}
        >
          {headRow.map((content) => {
            return <div key={content}>{content}</div>;
          })}
        </div>
        {data.map((content) => {
          return (
            <div
              key={content.historySeq}
              className={style.content_container}
              style={{ gridTemplateColumns: grid }}
            >
              <div>{content.dateTime}</div>
              <div>{content.doctorName} 선생님</div>
              <div>
                <button className={style.button}>수업상세</button>
              </div>
            </div>
          );
        })}
      </>
    );
  }
  if (state.loginUser.userRole === "doctor") {
    return (
      <>
        <div
          className={style.header_container}
          style={{ gridTemplateColumns: grid }}
        >
          {headRow.map((content) => {
            return <div key={content}>{content}</div>;
          })}
        </div>
        {data.map((content) => {
          return (
            <div
              key={content.historySeq}
              className={style.content_container}
              style={{ gridTemplateColumns: grid }}
            >
              <div>{content.dateTime}</div>
              <div>{content.doctorName} 님</div>
              <div>
                <button className={style.button}>수업상세</button>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
