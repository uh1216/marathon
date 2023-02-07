import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeNowSideNav } from "stores/toggle.store";
import Pagination from "components/common/Pagination";
import Board from "components/common/Board";
import { $ } from "util/axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import style from "./TreatmentList.module.css";

export default function TreatmentList() {
  const { pageNum } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const headRow = ["환자성명", "날짜", "연락처", "수업상세"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");

  const { data: lastRecordData, refetch } = useQuery(
    ["mypageTreatmentList", pageNum],
    () =>
      $.get(
        !input
          ? `/doctor-history/list?page=${pageNum}`
          : `/doctor-history/search?page=${pageNum}&name=${input}`
      )
  );

  useEffect(() => {
    // 사이드 Nav 초기화
    dispatch(changeNowSideNav("수업 기록"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "48px",
          }}
        >
          <h3
            style={{
              marginTop: "6px",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            수업 기록
          </h3>
          <div>
            <div
              style={{
                display: "inline-block",
                width: "200px",
                height: "20px",
                marginRight: "8px",
              }}
            >
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="환자명 검색"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                />
              </InputGroup>
            </div>
            <button
              className={style.button}
              onClick={() => {
                navigate("/mypage/treatment-list/1");
                refetch();
              }}
            >
              검색
            </button>
          </div>
        </div>
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
