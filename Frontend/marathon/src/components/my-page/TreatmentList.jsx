import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeNowSideNav } from "stores/toggle.store";
import Pagination from "components/common/Pagination";
import Board from "components/common/Board";

export default function TreatmentList() {
  let dumy = [];
  for (let i = 1; i <= 10; i++) {
    const newContents = {
      historySeq: i,
      doctorName: "김덕배",
      dateTime: "2023-02-03",
      phone: "010-4458-9480",
    };
    dumy = [newContents, ...dumy];
  }

  const dispatch = useDispatch();
  const headRow = ["환자성명", "날짜", "연락처", "수업상세"];
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          data={dumy}
          type={"mypageTreatmentList"}
          setIsModalOpen={setIsModalOpen}
        ></Board>
        <Pagination
          number={13}
          first={false}
          last={false}
          totalPages={25}
          url={"www.naver.com"}
        ></Pagination>
      </div>
    </>
  );
}
