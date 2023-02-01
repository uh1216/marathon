import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeNowSideNav } from "stores/toggle.store";
import Pagination from "components/common/Pagination";
import Board from "components/common/Board";
import Modal from "components/common/Modal";
import ConsultListModal from "components/my-page/ConsultListModal";

export default function ConsultList() {
  let dumy = [];
  for (let i = 1; i <= 10; i++) {
    const newContents = {
      name: "김두환",
      birth: "1972-07-16",
      phone: "010-9292-7649",
      email: "umigwan@hanyang.seoul",
      des: "오랜 지병에 시달리고 있습니다. 사실은 그럴수도 아닐수도 있습니다. 나는 전설이다!",
      done: i % 2,
    };
    dumy = [newContents, ...dumy];
  }

  const headRow = ["성함", "희망 날짜", "연락처", "처리 여부", "내용"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

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
        />
        <Pagination
          number={13}
          first={false}
          last={false}
          totalPages={25}
          url={"www.naver.com"}
        />
      </div>
      {isModalOpen && (
        <Modal setModalOpen={setIsModalOpen}>
          <ConsultListModal setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}
    </>
  );
}
