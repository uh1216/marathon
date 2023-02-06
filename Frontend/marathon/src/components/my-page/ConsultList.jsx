import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeNowSideNav } from "stores/toggle.store";
import style from "./ConsultList.module.css";
import Pagination from "components/common/Pagination";
import Board from "components/common/Board";
import Modal from "components/common/Modal";
import ConsultListModal from "components/my-page/ConsultListModal";
import SelectBox from "components/common/SelectBox";
import { $ } from "util/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

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
  const optionSearch = [
    { value: "all", name: "모두" },
    { value: "unchecked", name: "미처리" },
  ];
  const [searchOption, setSearchOption] = useState("all");
  const dispatch = useDispatch();
  const { pageNum } = useParams();

  const { data: lastRecordData } = useQuery(
    ["mypageConsultingList", pageNum],
    () => $.get(`/admin-consult/list?pageNum=${pageNum}`)
  );

  useEffect(() => {
    // 사이드 Nav 초기화
    dispatch(changeNowSideNav("상담 관리"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
        <div className={style.flex}>
          <h3 style={{ fontWeight: "bold", display: "inline-block" }}>
            상담 관리
          </h3>
          <div style={{ display: "flex", width: "50%", justifyContent: "end" }}>
            <SelectBox
              options={optionSearch}
              onChange={(e) => {
                setSearchOption(e);
              }}
              width="50%"
            />
            <div className={style.button} onClick={() => {}}>
              방생성
            </div>
          </div>
        </div>
        <Board
          headRow={headRow}
          grid={"15% 23% 28% 17% 17%"}
          data={dumy}
          type={"mypageConsultList"}
          setIsModalOpen={setIsModalOpen}
        />
        <Pagination
          number={lastRecordData && lastRecordData.data.number}
          first={lastRecordData && lastRecordData.data.first}
          last={lastRecordData && lastRecordData.data.last}
          totalPages={lastRecordData && lastRecordData.data.totalPages}
          url={"admin-consult/"}
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
