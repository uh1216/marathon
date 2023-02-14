import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNowSideNav } from "stores/toggle.store";
import Board from "components/common/Board";
import Pagination from "components/common/Pagination";
import Modal from "components/common/Modal";
import style from "./Schedule.module.css";
import ScheduleModal from "./ScheduleModal";
import { $ } from "util/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function Schedule() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { pageNum } = useParams();

  const {
    isLoading,
    data: reservationData,
    isError,
    error,
  } = useQuery(["mypageSchedule"], () =>
    $.get(
      state.loginUser.userRole === "doctor"
        ? "/doctor-treatment/calendar"
        : "/patient-treatment/calendar"
    )
  );

  const { data: lastRecordData } = useQuery(["mypageRecordData", pageNum], () =>
    $.get(
      state.loginUser.userRole === "doctor"
        ? `/doctor-history/nf-list?page=${pageNum}`
        : `/patient-history/list?page=${pageNum}`
    )
  );

  // 달력에 사용하는 페이지 데이터.
  const [nowPage, setNowPage] = useState(0);
  const headRow =
    state.loginUser.userRole === "patient"
      ? ["수업일", "선생님", "수업상세"]
      : ["수업일", "환자", "수업상세"];

  // 모달창에 들어갈 프로필 // 수업 정보
  const [modalData, setModalData] = useState();

  // 모달창 노출 여부 state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 날짜의 연산을 도와준다. 하루가 지나면 day + 1을 주입한다.
  const calDate = (day) => {
    return new Date(
      Number(!isLoading && reservationData.data.firstDateInfo) +
        (nowPage * 7 + day) * 86400000
    );
  };

  useEffect(() => {
    // 사이드 Nav 업데이트
    dispatch(changeNowSideNav("재활 일정"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className={style.side_inner_div}>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: "1" }} />
          <div className={style.arrow_div}>
            <button
              className={
                nowPage !== 0
                  ? style.button
                  : style.button + " " + style.noButton
              }
              style={{ marginRight: "10px", paddingRight: "12px" }}
              onClick={() => {
                nowPage > 0 ? setNowPage(nowPage - 1) : setNowPage(nowPage);
              }}
            >
              〈&nbsp; 이전
            </button>
            <span className={style.date}>
              {calDate(0).getFullYear()}.{calDate(0).getMonth() + 1}.
              {calDate(0).getDate()} ~ {calDate(6).getFullYear()}.
              {calDate(6).getMonth() + 1}.{calDate(6).getDate()}
            </span>

            <button
              className={
                nowPage !== 2
                  ? style.button
                  : style.button + " " + style.noButton
              }
              style={{ marginLeft: "10px", paddingLeft: "12px" }}
              onClick={() => {
                nowPage < 2 ? setNowPage(nowPage + 1) : setNowPage(nowPage);
              }}
            >
              이후 &nbsp;〉
            </button>
          </div>
          <div style={{ flexGrow: "1" }} />
        </div>
      </div>
      <div className={style.middle_box}>
        <div className={style.calender_div}>
          <div className={style.calender_top_div}>
            {calDate(0).getDate()}일 (월)
          </div>
          <div className={style.calender_bottom_div}>
            {!isLoading &&
              reservationData.data.list.map((reservedDay) => {
                if (
                  new Date(reservedDay.dateTime).getDate() ===
                  calDate(0).getDate()
                ) {
                  return (
                    <div
                      key={reservedDay.treatmentSeq}
                      className={style.reserve_info}
                      onClick={() => {
                        let tempData = { reservedDay, dayOfWeek: "월" };
                        setModalData(tempData);
                        setIsModalOpen(true);
                      }}
                    >
                      <div className={style.green_circle}></div>
                      <div className={style.sentenceHover}>
                        <div className={style.sentence}>
                          {reservedDay.doctorName || reservedDay.patientName}
                        </div>
                        <div className={style.sentence}>
                          {state.loginUser.userRole === "patient"
                            ? " 선생님 "
                            : " 님 "}
                        </div>
                        <div className={style.sentence}>
                          {new Date(reservedDay.dateTime).getHours()}시
                        </div>
                      </div>
                    </div>
                  );
                } else return null;
              })}
          </div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div}>
            {calDate(1).getDate()}일 (화)
          </div>
          <div className={style.calender_bottom_div}>
            {!isLoading &&
              reservationData.data.list.map((reservedDay) => {
                if (
                  new Date(reservedDay.dateTime).getDate() ===
                  calDate(1).getDate()
                ) {
                  return (
                    <div
                      key={reservedDay.treatmentSeq}
                      className={style.reserve_info}
                      onClick={() => {
                        let tempData = { reservedDay, dayOfWeek: "화" };
                        setModalData(tempData);
                        setIsModalOpen(true);
                      }}
                    >
                      <div className={style.green_circle}></div>
                      <div className={style.sentenceHover}>
                        <div className={style.sentence}>
                          {reservedDay.doctorName || reservedDay.patientName}
                        </div>
                        <div className={style.sentence}>
                          {state.loginUser.userRole === "patient"
                            ? " 선생님 "
                            : " 님 "}
                        </div>
                        <div className={style.sentence}>
                          {new Date(reservedDay.dateTime).getHours()}시
                        </div>
                      </div>
                    </div>
                  );
                } else return null;
              })}
          </div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div}>
            {calDate(2).getDate()}일 (수)
          </div>
          <div className={style.calender_bottom_div}>
            {!isLoading &&
              reservationData.data.list.map((reservedDay) => {
                if (
                  new Date(reservedDay.dateTime).getDate() ===
                  calDate(2).getDate()
                ) {
                  return (
                    <div
                      key={reservedDay.treatmentSeq}
                      className={style.reserve_info}
                      onClick={() => {
                        let tempData = { reservedDay, dayOfWeek: "수" };
                        setModalData(tempData);
                        setIsModalOpen(true);
                      }}
                    >
                      <div className={style.green_circle}></div>
                      <div className={style.sentenceHover}>
                        <div className={style.sentence}>
                          {reservedDay.doctorName || reservedDay.patientName}
                        </div>
                        <div className={style.sentence}>
                          {state.loginUser.userRole === "patient"
                            ? " 선생님 "
                            : " 님 "}
                        </div>
                        <div className={style.sentence}>
                          {new Date(reservedDay.dateTime).getHours()}시
                        </div>
                      </div>
                    </div>
                  );
                } else return null;
              })}
          </div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div}>
            {calDate(3).getDate()}일 (목)
          </div>
          <div className={style.calender_bottom_div}>
            {!isLoading &&
              reservationData.data.list.map((reservedDay) => {
                if (
                  new Date(reservedDay.dateTime).getDate() ===
                  calDate(3).getDate()
                ) {
                  return (
                    <div
                      key={reservedDay.treatmentSeq}
                      className={style.reserve_info}
                      onClick={() => {
                        let tempData = { reservedDay, dayOfWeek: "목" };
                        setModalData(tempData);
                        setIsModalOpen(true);
                      }}
                    >
                      <div className={style.green_circle}></div>
                      <div className={style.sentenceHover}>
                        <div className={style.sentence}>
                          {reservedDay.doctorName || reservedDay.patientName}
                        </div>
                        <div className={style.sentence}>
                          {state.loginUser.userRole === "patient"
                            ? " 선생님 "
                            : " 님 "}
                        </div>
                        <div className={style.sentence}>
                          {new Date(reservedDay.dateTime).getHours()}시
                        </div>
                      </div>
                    </div>
                  );
                } else return null;
              })}
          </div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div}>
            {calDate(4).getDate()}일 (금)
          </div>
          <div className={style.calender_bottom_div}>
            {!isLoading &&
              reservationData.data.list.map((reservedDay) => {
                if (
                  new Date(reservedDay.dateTime).getDate() ===
                  calDate(4).getDate()
                ) {
                  return (
                    <div
                      key={reservedDay.treatmentSeq}
                      className={style.reserve_info}
                      onClick={() => {
                        let tempData = { reservedDay, dayOfWeek: "금" };
                        setModalData(tempData);
                        setIsModalOpen(true);
                      }}
                    >
                      <div className={style.green_circle}></div>
                      <div className={style.sentenceHover}>
                        <div className={style.sentence}>
                          {reservedDay.doctorName || reservedDay.patientName}
                        </div>
                        <div className={style.sentence}>
                          {state.loginUser.userRole === "patient"
                            ? " 선생님 "
                            : " 님 "}
                        </div>
                        <div className={style.sentence}>
                          {new Date(reservedDay.dateTime).getHours()}시
                        </div>
                      </div>
                    </div>
                  );
                } else return null;
              })}
          </div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div} style={{ color: "#3080f8" }}>
            {calDate(5).getDate()}일 (토)
          </div>
          <div className={style.calender_bottom_div}>
            {!isLoading &&
              reservationData.data.list.map((reservedDay) => {
                if (
                  new Date(reservedDay.dateTime).getDate() ===
                  calDate(5).getDate()
                ) {
                  return (
                    <div
                      key={reservedDay.treatmentSeq}
                      className={style.reserve_info}
                      onClick={() => {
                        let tempData = { reservedDay, dayOfWeek: "토" };
                        setModalData(tempData);
                        setIsModalOpen(true);
                      }}
                    >
                      <div className={style.green_circle}></div>
                      <div className={style.sentenceHover}>
                        <div className={style.sentence}>
                          {reservedDay.doctorName || reservedDay.patientName}
                        </div>
                        <div className={style.sentence}>
                          {state.loginUser.userRole === "patient"
                            ? " 선생님 "
                            : " 님 "}
                        </div>
                        <div className={style.sentence}>
                          {new Date(reservedDay.dateTime).getHours()}시
                        </div>
                      </div>
                    </div>
                  );
                } else return null;
              })}
          </div>
        </div>
        <div className={style.calender_div}>
          <div className={style.calender_top_div} style={{ color: "#ff6969" }}>
            {calDate(6).getDate()}일 (일)
          </div>
          <div
            className={style.calender_bottom_div}
            style={{ borderRight: "none" }}
          >
            {!isLoading &&
              reservationData.data.list.map((reservedDay) => {
                if (
                  new Date(reservedDay.dateTime).getDate() ===
                  calDate(6).getDate()
                ) {
                  return (
                    <div
                      key={reservedDay.treatmentSeq}
                      className={style.reserve_info}
                      onClick={() => {
                        let tempData = { reservedDay, dayOfWeek: "일" };
                        setModalData(tempData);
                        setIsModalOpen(true);
                      }}
                    >
                      <div className={style.green_circle}></div>
                      <div className={style.sentenceHover}>
                        <div className={style.sentence}>
                          {reservedDay.doctorName || reservedDay.patientName}
                        </div>
                        <div className={style.sentence}>
                          {state.loginUser.userRole === "patient"
                            ? " 선생님 "
                            : " 님 "}
                        </div>
                        <div className={style.sentence}>
                          {new Date(reservedDay.dateTime).getHours()}시
                        </div>
                      </div>
                    </div>
                  );
                } else return null;
              })}
          </div>
        </div>
        <div className={style.only_border}></div>
      </div>

      <div className={style.side_inner_div}>
        <h3 style={{ marginTop: "35px", fontWeight: "bold" }}>
          {state.loginUser.userRole === "patient"
            ? "지난 수업 내역"
            : "피드백 미작성 내역"}
        </h3>
        <Board
          headRow={headRow}
          grid={"40% 30% 30%"}
          data={lastRecordData !== undefined && lastRecordData.data.content}
          type={"mypageSchedule"}
          setIsModalOpen={setIsModalOpen}
        />
        <Pagination
          number={lastRecordData && lastRecordData.data.number}
          first={lastRecordData && lastRecordData.data.first}
          last={lastRecordData && lastRecordData.data.last}
          totalPages={lastRecordData && lastRecordData.data.totalPages}
          url={"mypage/schedule/"}
        />
      </div>
      {isModalOpen && (
        <Modal setModalOpen={setIsModalOpen}>
          <ScheduleModal
            modalData={modalData}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      )}
    </>
  );
}
