import style from "./ScheduleModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { changeTreatSessionId } from "stores/content.store";
import { $ } from "util/axios";
import { useNavigate } from "react-router-dom";

export default function ScheduleModal({ modalData, setIsModalOpen }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isCreatable, setIsCreatable] = useState(false);

  const { mutate } = useMutation(
    () => $.delete(`/doctor-treatment/${modalData.reservedDay.treatmentSeq}`),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(["mypageSchedule"]);
        const oldData = queryClient.getQueryData(["mypageSchedule"]);
        queryClient.setQueryData(["mypageSchedule"], updateData());
        return { oldData };
      },
      onError: (_error, _variables, context) => {
        queryClient.setQueryData(["mypageSchedule"], context.oldData);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["mypageSchedule"]);
      },
    }
  );

  const updateData = () => {
    let newData = queryClient.getQueryData(["mypageSchedule"]);
    for (let i = 0; i < newData.data.list.length; i++) {
      if (
        newData.data.list[i].treatmentSeq === modalData.reservedDay.treatmentSeq
      ) {
        let temp = [...newData.data.list];
        temp.splice(i, 1);
        newData.data.list = temp;
        break;
      }
    }
    return newData;
  };

  useEffect(() => {
    let date = new Date(modalData.reservedDay.dateTime).getTime();
    let nowTime = new Date();
    if (
      -3600000 <= date - nowTime.getTime() &&
      date - nowTime.getTime() <= 600000
    ) {
      setIsCreatable(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.modal_container}>
      <div className={style.modal_left_box}>
        <img
          className={style.modal_profile}
          src={
            modalData.reservedDay.doctorImg || modalData.reservedDay.patientImg
          }
          alt=""
        />
      </div>
      <div className={style.modal_right_box}>
        <h3 style={{ display: "inline-block" }}>
          {modalData.reservedDay.doctorName ||
            modalData.reservedDay.patientName}
        </h3>
        <h4>{state.loginUser.userRole === "patient" ? " 선생님 " : " 님 "}</h4>
        <hr />
        <span style={{ color: "gray", marginRight: "10px" }}>예약 구분</span>
        <span>재활</span>
        <br />
        <span
          style={{
            display: "inline-block",
            marginTop: "15px",
            color: "gray",
            marginRight: "10px",
          }}
        >
          예약 날짜
        </span>
        <span>
          {new Date(modalData.reservedDay.dateTime).toLocaleDateString()}
        </span>
        <span>({modalData.dayOfWeek})</span>
        <span>{new Date(modalData.reservedDay.dateTime).getHours()}시</span>
        {state.loginUser.userRole === "doctor" ? (
          <>
            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: "1" }}></div>
              <div>
                <button
                  className={
                    isCreatable
                      ? style.button + " " + style.button_create
                      : style.button +
                        " " +
                        style.button_create +
                        " " +
                        style.unable
                  }
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    let sessionId =
                      new Date().getTime() +
                      "marathon" +
                      modalData.reservedDay.treatmentSeq +
                      modalData.reservedDay.treatmentSeq;
                    $.post("/doctor-treatment/alarm", {
                      treatmentSeq: modalData.reservedDay.treatmentSeq,
                      sessionId: sessionId,
                    }).then((window.location.href = `/treat/${sessionId}`));
                  }}
                >
                  방 생성
                </button>
                <button
                  className={style.button + " " + style.button_cancel}
                  onClick={() => {
                    if (window.confirm("정말로 취소하시겠습니까?")) {
                      mutate();
                      setIsModalOpen(false);
                    }
                  }}
                >
                  예약 취소
                </button>
              </div>
            </div>
            <p>
              ※ 수업시작 10분전, 수업 예약 시간 1시간 후 까지만 방생성이
              활성화됩니다.
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
