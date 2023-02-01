import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeNowSideNav } from "stores/toggle.store";
import Pagination from "components/common/Pagination";
import Board from "components/common/Board";
import Modal from "components/common/Modal";

export default function ConsultList() {
  let dumy = [];
  for (let i = 1; i <= 10; i++) {
    const newContents = {
      doctorName: "김덕배",
      dateTime: "2023-02-03",
      historySeq: i % 2,
      phone: "010-4458-9480",
    };
    dumy = [newContents, ...dumy];
  }

  const dispatch = useDispatch();
  const headRow = ["성함", "희망 날짜", "연락처", "처리 여부", "내용"];

  const [isModalOpen, setIsModalOpen] = useState(false);
  // 모달창에 들어갈 프로필 // 수업 정보
  const [modalData, setModalData] = useState();

  useEffect(() => {
    // 사이드 Nav 초기화
    dispatch(changeNowSideNav("상담 관리"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
        <h3 style={{ margin: "15px 0px", fontWeight: "bold" }}>상담 관리</h3>
        <Board
          headRow={headRow}
          grid={"15% 23% 28% 17% 17%"}
          data={dumy}
          type={"mypageConsultList"}
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
      {isModalOpen && (
        <Modal setModalOpen={setIsModalOpen}>입력이 되는게 맞냐?!!?</Modal>
      )}
    </>
  );
}
