import style from "./Board.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeNowBoardInfo } from "stores/content.store";
import { useNavigate } from "react-router-dom";

/** headRow : 맨 첫번째 row에 무엇을 넣을 것인가? 제목 내용 등등등
 *  grid : 각각의 내용들에 어느정도의 width를 할당할 것인가? 데이터 예시 ex) "40% 30% 30%"
 *  data : 말 그대로 부모에서 내려주는 데이터
 *  type : board도 내려오는 데이터 종류, 버튼등등 일반화 시키기 까다로운
 *         짜잘한 바리에이션이 많으니 그냥 if 문으로 복붙 + 약간 수정으로 해결하자
 */
export default function Board({ headRow, grid, data, type, setIsModalOpen }) {
  const state = useSelector((state) => state);
  const dispath = useDispatch();
  const navigate = useNavigate();

  if (type === "mypageSchedule") {
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
        {data &&
          data.map((content, idx) => {
            return (
              <div
                key={idx + 11}
                className={style.content_container}
                style={{ gridTemplateColumns: grid }}
              >
                <div>{new Date(content.dateTime).toLocaleDateString()}</div>
                <div>
                  {content.doctorName || content.patientName}
                  {state.loginUser.userRole === "patient" ? " 선생님 " : " 님 "}
                </div>
                <div>
                  <button
                    className={style.button}
                    onClick={() => {
                      navigate(
                        `/mypage/treatment-detail/${content.historySeq}`
                      );
                    }}
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
        {data &&
          data.map((content) => {
            return (
              <div
                key={content.historySeq}
                className={style.content_container3}
                style={{ gridTemplateColumns: grid }}
              >
                <div>{content.patientName} 님</div>
                <div>
                  {new Date(content.dateTime).toLocaleDateString() +
                    " " +
                    new Date(content.dateTime).getHours() +
                    "시"}
                </div>
                <div>{content.patientPhone}</div>
                <div>
                  <button
                    className={style.button + " " + style.button2}
                    onClick={() => {
                      navigate(
                        `/mypage/treatment-detail/${content.historySeq}`
                      );
                    }}
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
        {data &&
          data.map((content, idx) => {
            return (
              <div
                key={content.name + idx + 1123}
                className={style.content_container3}
                style={{ gridTemplateColumns: grid }}
              >
                <div>{content.name} 님</div>
                <div>{content.hopeDate}</div>
                <div>{content.phone1}</div>
                <div className={!content.checked ? style.fontR : style.fontB}>
                  {content.checked ? "처리 완료" : "미처리"}
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
