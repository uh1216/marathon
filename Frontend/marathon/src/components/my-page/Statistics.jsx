import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeNowSideNav } from "stores/toggle.store";
import StatisticsBox from "components/common/StatisticsBox";
import Board from "components/common/Board";
import Pagination from "components/common/Pagination";

export default function Statistics() {
  const dispatch = useDispatch();
  const gameName = ["색깔 위치 맞추기", "그림 카드 맞추기", "도형 위치 맞추기"];
  const recentStudy = [
    {
      date: "2022.12.25 12:03:24",
      difficulty: "고급",
      accuracy: 70,
    },
    {
      date: "2022.12.25 12:03:24",
      difficulty: "고급",
      accuracy: 70,
    },
    {
      date: "2022.12.25 12:03:24",
      difficulty: "고급",
      accuracy: 70,
    },
  ];

  const bestRecords = [
    [100, 60, 10],
    [100, 60, 10],
    [100, 60, 10],
  ];

  const graphData = [
    [
      [10, 20, 40, 80, 70],
      [30, 50, 10, 80, 50],
      [10, 20, 40, 60, 0],
    ],
    [
      [10, 20, 40, 80, 70],
      [30, 50, 10, 80, 50],
      [10, 20, 40, 60, 0],
    ],
    [
      [10, 20, 40, 80, 70],
      [30, 50, 10, 80, 50],
      [10, 20, 40, 60, 0],
    ],
  ];

  useEffect(() => {
    // 사이드 나브 초기화
    dispatch(changeNowSideNav("스스로 학습 통계"));
  }, []);

  return (
    <div>
      <h2>학습별 기록</h2>
      <StatisticsBox
        gameName={gameName[0]}
        recentStudy={recentStudy[0]}
        bestRecords={bestRecords[0]}
        graph={graphData[0]}
      ></StatisticsBox>
      <br />
      <StatisticsBox
        gameName={gameName[1]}
        recentStudy={recentStudy[1]}
        bestRecords={bestRecords[1]}
        graph={graphData[1]}
      ></StatisticsBox>
      <br />
      <StatisticsBox
        gameName={gameName[2]}
        recentStudy={recentStudy[2]}
        bestRecords={bestRecords[2]}
        graph={graphData[2]}
      ></StatisticsBox>
      <br />
      <br />
      <br />
      <h2>최근 게임 기록</h2>
      <Board
        headRow={["No.", "게임", "날짜", "난이도", "정확도"]}
        grid="1fr 5fr 5fr 2fr 2fr"
        data={[
          {
            no: 10,
            game: "도형 위치 맞추기",
            date: "2022.12.25 12:03:24",
            difficulty: "고급",
            accuracy: "80%",
          },
          {
            no: 10,
            game: "도형 위치 맞추기",
            date: "2022.12.25 12:03:24",
            difficulty: "고급",
            accuracy: "80%",
          },
          {
            no: 10,
            game: "도형 위치 맞추기",
            date: "2022.12.25 12:03:24",
            difficulty: "고급",
            accuracy: "80%",
          },
          {
            no: 10,
            game: "도형 위치 맞추기",
            date: "2022.12.25 12:03:24",
            difficulty: "고급",
            accuracy: "80%",
          },
          {
            no: 10,
            game: "도형 위치 맞추기",
            date: "2022.12.25 12:03:24",
            difficulty: "고급",
            accuracy: "80%",
          },
          {
            no: 10,
            game: "도형 위치 맞추기",
            date: "2022.12.25 12:03:24",
            difficulty: "고급",
            accuracy: "80%",
          },
          {
            no: 10,
            game: "도형 위치 맞추기",
            date: "2022.12.25 12:03:24",
            difficulty: "고급",
            accuracy: "80%",
          },
          {
            no: 10,
            game: "도형 위치 맞추기",
            date: "2022.12.25 12:03:24",
            difficulty: "고급",
            accuracy: "80%",
          },
          {
            no: 10,
            game: "도형 위치 맞추기",
            date: "2022.12.25 12:03:24",
            difficulty: "고급",
            accuracy: "80%",
          },
          {
            no: 10,
            game: "도형 위치 맞추기",
            date: "2022.12.25 12:03:24",
            difficulty: "고급",
            accuracy: "80%",
          },
          {
            no: 10,
            game: "도형 위치 맞추기",
            date: "2022.12.25 12:03:24",
            difficulty: "고급",
            accuracy: "80%",
          },
          {
            no: 10,
            game: "도형 위치 맞추기",
            date: "2022.12.25 12:03:24",
            difficulty: "고급",
            accuracy: "80%",
          },
          {
            no: 10,
            game: "도형 위치 맞추기",
            date: "2022.12.25 12:03:24",
            difficulty: "고급",
            accuracy: "80%",
          },
        ]}
        type="mypagestatistics"
      />
      <br />
      <Pagination
        number={11}
        first={false}
        last={false}
        totalPages={17}
        url={"www.naver.com"}
      ></Pagination>
      <br />
    </div>
  );
}
