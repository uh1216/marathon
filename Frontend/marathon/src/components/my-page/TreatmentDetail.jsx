import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeNowSideNav } from "stores/toggle.store";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { $ } from "util/axios";
import { useQuery } from "@tanstack/react-query";
import style from "./TreatmentDetail.module.css";

export default function TreatmentDetail() {
  const state = useSelector((state) => state);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { no } = useParams();
  const [isInput, setIsInput] = useState(false);
  const [content, setContent] = useState("");

  const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];
  const { isLoading, data } = useQuery(["mypageHistoryDetail"], () =>
    $.get(
      state.loginUser.userRole === "doctor"
        ? `/doctor-history/detail/${no}`
        : `/patient-history/detail/${no}`
    )
  );

  const { mutate } = useMutation(
    () =>
      $.put(`/doctor-history/feedback`, {
        historySeq: data.data.historySeq,
        feedback: content,
      }),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(["mypageHistoryDetail"]);
        const oldData = queryClient.getQueryData(["mypageHistoryDetail"]);
        queryClient.setQueryData(["mypageHistoryDetail"], updateData());
        return { oldData };
      },
      onError: (_error, _variables, context) => {
        queryClient.setQueryData(["mypageHistoryDetail"], context.oldData);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["mypageHistoryDetail"]);
      },
    }
  );

  const toggleToInput = () => {
    setIsInput(!isInput);
  };

  const copyContent = () => content;

  const updateData = () => {
    let newData = queryClient.getQueryData(["mypageHistoryDetail"]);
    newData.data.feedback = content;
    return newData;
  };

  useEffect(() => {
    // 사이드 nav 초기화
    if (state.loginUser.userRole === "doctor")
      dispatch(changeNowSideNav("수업 기록"));
  }, []);

  // onSuccess로 조건주면 자꾸 애러나서 그냥 useEffet로 따로 뺌
  useEffect(() => {
    if (isLoading) return;
    setContent(data.data.feedback);
  }, [isLoading]);

  return (
    <>
      <h2>수업 기록</h2>
      <div className={style.container}>
        <div className={style.left}>
          <div className={style.profile_box}>
            <div className={style.profile_left}>
              <img
                className={style.profile}
                src={
                  !isLoading && (data.data.doctorImg || data.data.patientImg)
                }
                alt=""
              />
              <p>
                <span>
                  {!isLoading &&
                    (data.data.doctorName || data.data.patientName)}
                </span>
                <span>
                  {state.loginUser.userRole === "patient" ? " 선생님 " : " 님 "}
                </span>
              </p>
            </div>
            <div className={style.line}></div>
            <div className={style.profile_right}>
              <div>
                <div className={style.sub_title}>수업 일자</div>
                <div className={style.sub_content}>
                  {!isLoading &&
                    new Date(data.data.dateTime).toLocaleDateString() +
                      " (" +
                      WEEKDAY[new Date(data.data.dateTime).getDay()] +
                      ") " +
                      new Date(data.data.dateTime).getHours() +
                      "시"}
                </div>
              </div>
              <div>
                <div className={style.sub_title}>
                  {state.loginUser.userRole === "doctor" && <>주</>} 연락처
                </div>
                <div className={style.sub_content}>
                  {!isLoading &&
                    (data.data.doctorPhone || data.data.patientPhone)}
                </div>
              </div>
              <div>
                {state.loginUser.userRole === "doctor" && (
                  <>
                    <div className={style.sub_title}>비상 연락처</div>
                    <div className={style.sub_content}>
                      {!isLoading && data.data.patientMainPhone}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <video className={style.video} key={isLoading} controls>
            <source src={!isLoading && data.data.videoUrl} type="video/mp4" />
          </video>
        </div>
        <div className={style.right}>
          <div className={style.right_title}>
            <h2>수업 내용</h2>
            {state.loginUser.userRole === "doctor" && isInput && (
              <button
                className={style.btn}
                onClick={() => {
                  mutate();
                  toggleToInput();
                }}
              >
                수정완료
              </button>
            )}
            {state.loginUser.userRole === "doctor" && !isInput && (
              <button
                className={style.btn}
                onClick={() => {
                  toggleToInput();
                }}
              >
                수정하기
              </button>
            )}
          </div>
          <hr />
          {isInput ? (
            <>
              <textarea
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                className={style.textarea}
                type="text"
                value={copyContent()}
              />
            </>
          ) : (
            <div className={style.content}>{content}</div>
          )}
        </div>
      </div>
    </>
  );
}
