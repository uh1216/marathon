import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeNowSideNav } from "stores/toggle.store";
import Pagination from "components/common/Pagination";
import Board from "components/common/Board";
import { $ } from "util/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function TreatmentList() {
  const { pageNum } = useParams();
  const dispatch = useDispatch();
  const headRow = ["환자성명", "날짜", "연락처", "수업상세"];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: lastRecordData } = useQuery(
    ["mypageTreatmentList", pageNum],
    () => $.get(`/doctor-history/list?page=${pageNum}`)
  );

  useEffect(() => {
    // 사이드 Nav 초기화
    dispatch(changeNowSideNav("수업 기록"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
        <h3 style={{ marginTop: "14px", fontWeight: "bold" }}>수업 기록</h3>
        <Board
          headRow={headRow}
          grid={"20% 30% 30% 20%"}
          data={lastRecordData && lastRecordData.data.content}
          type={"mypageTreatmentList"}
          setIsModalOpen={setIsModalOpen}
        />
        <Pagination
          number={lastRecordData && lastRecordData.data.number}
          first={lastRecordData && lastRecordData.data.first}
          last={lastRecordData && lastRecordData.data.last}
          totalPages={lastRecordData && lastRecordData.data.totalPages}
          url={"mypage/treatment-list/"}
        />
      </div>
    </>
  );
}
