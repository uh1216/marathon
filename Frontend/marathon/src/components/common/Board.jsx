import style from "./Board.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeNowBoardInfo } from "stores/content.store";

/** headRow : 맨 첫번째 row에 무엇을 넣을 것인가? 제목 내용 등등등
 *  grid : 각각의 내용들에 어느정도의 width를 할당할 것인가? 데이터 예시 ex) "40% 30% 30%"
 *  data : 말 그대로 부모에서 내려주는 데이터
 *  type : board도 내려오는 데이터 종류, 버튼등등 일반화 시키기 까다로운
 *         짜잘한 바리에이션이 많으니 그냥 if 문으로 복붙 + 약간 수정으로 해결하자
 */
export default function Board({ headRow, grid, data, type, setIsModalOpen }) {
  const state = useSelector((state) => state);
  const dispath = useDispatch();
  if (type === "mypageSchedule" && state.loginUser.userRole === "patient") {
    return (
      <>
        <div
          className={style.header_container}
          style={{ gridTemplateColumns: grid }}
        >
          {headRow.map((content, idx) => {
            return <div key={idx + 999}>{content}</div>;
          })}
        </div>
        {data.map((content, idx) => {
          return (
            <div
              key={idx + 11}
              className={style.content_container}
              style={{ gridTemplateColumns: grid }}
            >
              <div>{content.dateTime}</div>
              <div>{content.doctorName} 선생님</div>
              <div>
                <button className={style.button} onClick={() => {}}>
                  수업상세
                </button>
              </div>
            </div>
          );
        })}
      </>
    );
  }
  if (type === "mypageSchedule" && state.loginUser.userRole === "doctor") {
    return (
      <>
        <div
          className={style.header_container}
          style={{ gridTemplateColumns: grid }}
        >
          {headRow.map((content, idx) => {
            return <div key={idx + 9011}>{content}</div>;
          })}
        </div>
        {data.map((content, idx) => {
          return (
            <div
              key={content.name + idx + 40}
              className={style.content_container}
              style={{ gridTemplateColumns: grid }}
            >
              <div>{content.dateTime}</div>
              <div>{content.doctorName} 님</div>
              <div>
                <button className={style.button} onClick={() => {}}>
                  수업상세
                </button>
              </div>
            </div>
          );
        })}
      </>
    );
  }
  if (type === "mypagestatistics") {
    return (
      <>
        <div
          className={style.header_container}
          style={{ gridTemplateColumns: grid, maxWidth: "850px" }}
        >
          {headRow.map((content) => {
            return <div key={content.name + 30}>{content}</div>;
          })}
        </div>
        {data.map((content, idx) => {
          return (
            <div
              key={content.name + idx + 20}
              className={style.content_container}
              style={{ gridTemplateColumns: grid, maxWidth: "850px" }}
            >
              <div>{content.no}</div>
              <div>{content.game}</div>
              <div>{content.date}</div>
              <div>{content.difficulty}</div>
              <div>{content.accuracy}</div>
            </div>
          );
        })}
      </>
    );
  }
  if (type === "mypageTreatmentList") {
    return (
      <>
        <div
          className={style.header_container3}
          style={{ gridTemplateColumns: grid }}
        >
          {headRow.map((content, idx) => {
            return <div key={idx + 9065}>{content}</div>;
          })}
        </div>
        {data.map((content, idx) => {
          return (
            <div
              key={content.name + idx + 10}
              className={style.content_container3}
              style={{ gridTemplateColumns: grid }}
            >
              <div>{content.doctorName} 님</div>
              <div>{content.dateTime}</div>
              <div>{content.phone}</div>
              <div>
                <button
                  className={style.button + " " + style.button2}
                  onClick={() => {}}
                >
                  수업상세
                </button>
              </div>
            </div>
          );
        })}
      </>
    );
  }
  if (type === "mypageConsultList") {
    return (
      <>
        <div
          className={style.header_container3}
          style={{ gridTemplateColumns: grid }}
        >
          {headRow.map((content, idx) => {
            return <div key={idx + content}>{content}</div>;
          })}
        </div>
        {data.map((content, idx) => {
          return (
            <div
              key={content.name + idx + 1123}
              className={style.content_container3}
              style={{ gridTemplateColumns: grid }}
            >
              <div>{content.name} 님</div>
              <div>{content.birth}</div>
              <div>{content.phone}</div>
              <div className={content.done ? style.fontR : style.fontB}>
                {content.done ? "처리 완료" : "미처리"}
              </div>
              <div>
                <button
                  className={style.button + " " + style.button2}
                  onClick={() => {
                    setIsModalOpen(true);
                    dispath(changeNowBoardInfo(content));
                  }}
                >
                  상세보기
                </button>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
