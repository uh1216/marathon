import style from "./ConsultListModal.module.css";
import { useSelector } from "react-redux";
import { $ } from "util/axios";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function ConsultListModal({ setIsModalOpen }) {
  const state = useSelector((state) => state);
  const { pageNum } = useParams();
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery(["mypageConsultingDetail"], () =>
    $.get(`/admin-consult/detail/${state.nowBoardInfo.consultingSeq}`)
  );

  const { mutate } = useMutation(
    () => $.put(`/admin-consult/detail/${state.nowBoardInfo.consultingSeq}`),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(["mypageConsultingList", pageNum]);
        const oldData = queryClient.getQueryData([
          "mypageConsultingList",
          pageNum,
        ]);
        queryClient.setQueryData(["mypageConsultingList", pageNum], () => {
          return {
            data: [updateData()],
          };
        });
        return { oldData };
      },
      onError: (_error, _variables, context) => {
        queryClient.setQueryData(
          ["mypageConsultingList", pageNum],
          context.oldData
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(["mypageConsultingList", pageNum]);
      },
    }
  );

  const updateData = () => {
    let newData = queryClient.getQueryData(["mypageConsultingList", pageNum]);
    for (let i = 0; i < newData.data.content.length; i++) {
      if (
        newData.data.content[i].consultingSeq ===
        state.nowBoardInfo.consultingSeq
      ) {
        newData.data.content[i].checked = !newData.data.content[i].checked;
        break;
      }
    }
    return newData;
  };

  return (
    <div className={style.modal_container}>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: "1" }} />
        <h3>상담 예약 상세 </h3>
        <div style={{ flexGrow: "1" }} />
      </div>
      <table className={style.table}>
        <tbody>
          <tr className={style.table_tr}>
            <td
              className={style.table_td1}
              style={{ borderTopLeftRadius: "5px" }}
            >
              <span>대상자 성명</span>
            </td>
            <td className={style.table_td2 + " " + style.table_d3}>
              <span>{!isLoading && data.data.name}</span>
            </td>
            <td
              className={style.table_td1}
              style={{ borderLeft: "1px solid black" }}
            >
              <span>희망 날짜</span>
            </td>
            <td className={style.table_td2}>
              <span>{!isLoading && data.data.hopeDate}</span>
            </td>
          </tr>
          <tr className={style.table_tr}>
            <td className={style.table_td1}>
              <span>대상자 생년월일</span>
            </td>
            <td className={style.table_td2 + " " + style.table_d3}>
              <span>{!isLoading && data.data.birthDate}</span>
            </td>
            <td
              className={style.table_td1}
              style={{ borderLeft: "1px solid black" }}
            >
              <span>이메일 주소</span>
            </td>
            <td className={style.table_td2}>
              <span>{!isLoading && data.data.email}</span>
            </td>
          </tr>
          <tr className={style.table_tr}>
            <td className={style.table_td1}>
              <span>연락처</span>
            </td>
            <td className={style.table_td2 + " " + style.table_d3}>
              <span>{!isLoading && data.data.phone1}</span>
            </td>
            <td
              className={style.table_td1}
              style={{ borderLeft: "1px solid black" }}
            >
              <span>비상 연락처1</span>
            </td>
            <td className={style.table_td2}>
              <span>{!isLoading && data.data.phone2}</span>
            </td>
          </tr>
          <tr className={style.table_tr}>
            <td className={style.table_td1}>
              <span>뇌손상 발병시기</span>
            </td>
            <td className={style.table_td2 + " " + style.table_d3}>
              <span>{!isLoading && data.data.sickDate}</span>
            </td>
            <td
              className={style.table_td1}
              style={{ borderLeft: "1px solid black" }}
            >
              <span>비상 연락처2</span>
            </td>
            <td className={style.table_td2}>
              <span>{!isLoading && data.data.phone3}</span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottomLeftRadius: "5px",
                backgroundColor: "#ececff",
                borderRight: "1px solid black",
              }}
            >
              <p>의사소통에</p>
              <p>어려운 부분</p>
            </td>
            <td colSpan="3" style={{ borderTop: "1px solid black" }}>
              <span>{!isLoading && data.data.description}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: "1" }} />
        <div
          className={
            !isLoading && !data.data.checked
              ? style.button
              : style.button + " " + style.button_cancel
          }
          onClick={() => {
            mutate();
            setIsModalOpen(false);
          }}
        >
          {!isLoading && data.data.checked ? "처리완료" : "미처리"}
        </div>
        <div style={{ flexGrow: "1" }} />
      </div>
    </div>
  );
}
