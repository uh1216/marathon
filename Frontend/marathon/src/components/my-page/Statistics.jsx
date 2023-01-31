import { useEffect } from "react";
import { useDispatch } from "react-redux";
import style from "./Statistics.module.css";
import { changeNowSideNav } from "stores/toggle.store";
import StatisticsBox from "components/common/StatisticsBox";

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
    <>
      <StatisticsBox
        gameName={gameName[0]}
        recentStudy={recentStudy[0]}
        bestRecords={bestRecords[0]}
        graph={graphData[0]}
      ></StatisticsBox>
      <StatisticsBox
        gameName={gameName[1]}
        recentStudy={recentStudy[1]}
        bestRecords={bestRecords[1]}
        graph={graphData[1]}
      ></StatisticsBox>
      <StatisticsBox
        gameName={gameName[2]}
        recentStudy={recentStudy[2]}
        bestRecords={bestRecords[2]}
        graph={graphData[2]}
      ></StatisticsBox>
    </>
  );
}
