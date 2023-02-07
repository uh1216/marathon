import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeNowSideNav } from "stores/toggle.store";
import StatisticsBox from "components/common/StatisticsBox";
import Board from "components/common/Board";
import Pagination from "components/common/Pagination";
import { $ } from "util/axios";
import { useParams } from "react-router-dom";

export default function Statistics() {
  const { pageNum } = useParams();
  const dispatch = useDispatch();
  // 페이지네이션 관련 변수
  const [number, setNumber] = useState(1);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const gameName = ["색깔 위치 맞추기", "그림 카드 맞추기", "동물 위치 맞추기"];
  const [gameList, setGameList] = useState([]);
  const [recentStudy, setRecentStudy] = useState([
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
  ]);
  const [bestRecords, setBestRecords] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [graphLabels, setGraphLabels] = useState([
    [
      ["23.01.01", "23.01.02", "23.01.03", "23.01.04", "23.01.05"],
      ["23.01.01", "23.01.02", "23.01.03", "23.01.04", "23.01.05"],
      ["23.01.01", "23.01.02", "23.01.03", "23.01.04", "23.01.05"],
    ],
    [
      ["23.01.01", "23.01.02", "23.01.03", "23.01.04", "23.01.05"],
      ["23.01.01", "23.01.02", "23.01.03", "23.01.04", "23.01.05"],
      ["23.01.01", "23.01.02", "23.01.03", "23.01.04", "23.01.05"],
    ],
    [
      ["23.01.01", "23.01.02", "23.01.03", "23.01.04", "23.01.05"],
      ["23.01.01", "23.01.02", "23.01.03", "23.01.04", "23.01.05"],
      ["23.01.01", "23.01.02", "23.01.03", "23.01.04", "23.01.05"],
    ],
  ]);
  const [graphData, setGraphData] = useState([
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
  ]);

  const getGameList = (page) => {
    $.get(`patient-game/list?page=${page}`)
      .then((res) => {
        let tmp = [];
        res.data.content.forEach((item) => {
          tmp.push({
            no: item.gameSeq,
            game: gameName[item.gameType - 1],
            date: item.date + " " + item.time,
            difficulty:
              item.difficulty === "easy"
                ? "초급"
                : item.difficulty === "normal"
                ? "중급"
                : "고급",
            accuracy: item.accuracy * 10 + "%",
          });
        });
        console.log(res);
        setGameList(tmp);

        // 페이지네이션 설정

        setNumber(res.data.number);
        setIsFirst(res.data.first);
        setIsLast(res.data.last);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // 사이드 나브 초기화
    dispatch(changeNowSideNav("스스로 학습 통계"));

    // 최근 게임 기록 가져오기
    getGameList(pageNum);

    // 게임 통계 가져오기
    $.get(`/patient-game/analysis`)
      .then((res) => {
        console.log(res);
        setRecentStudy([
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
        ]);
        setBestRecords([
          [
            Number(res.data.list[0].easyHighScore) * 10,
            Number(res.data.list[0].normalHighScore) * 10,
            Number(res.data.list[0].hardHighScore) * 10,
          ],
          [
            Number(res.data.list[1].easyHighScore) * 10,
            Number(res.data.list[1].normalHighScore) * 10,
            Number(res.data.list[1].hardHighScore) * 10,
          ],
          [
            Number(res.data.list[2].easyHighScore) * 10,
            Number(res.data.list[2].normalHighScore) * 10,
            Number(res.data.list[2].hardHighScore) * 10,
          ],
        ]);

        let labels = [];
        let datas = [];
        for (let i = 0; i < 3; i++) {
          let labelEasy = [];
          let labelNormal = [];
          let labelHard = [];
          let dataEasy = [];
          let dataNormal = [];
          let dataHard = [];

          res.data.list[i].easyRecentAccuary.forEach((item) => {
            labelEasy.push(item.split(",")[0]);
            dataEasy.push(Number(item.split(",")[1]) * 10);
          });

          res.data.list[i].normalRecentAccuary.forEach((item) => {
            labelNormal.push(item.split(",")[0]);
            dataNormal.push(Number(item.split(",")[1]) * 10);
          });

          res.data.list[i].hardRecentAccuary.forEach((item) => {
            labelHard.push(item.split(",")[0]);
            dataHard.push(Number(item.split(",")[1]) * 10);
          });

          labels.push([[...labelEasy], [...labelNormal], [...labelHard]]);
          datas.push([[...dataEasy], [...dataNormal], [...dataHard]]);
        }

        setGraphData(datas);
        setGraphLabels(labels);
        console.log(labels);
        console.log(datas);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>학습별 기록</h2>
      <StatisticsBox
        gameName={gameName[0]}
        recentStudy={recentStudy[0]}
        bestRecords={bestRecords[0]}
        graph={graphData[0]}
        label={graphLabels[0]}
      ></StatisticsBox>
      <br />
      <StatisticsBox
        gameName={gameName[1]}
        recentStudy={recentStudy[1]}
        bestRecords={bestRecords[1]}
        graph={graphData[1]}
        label={graphLabels[1]}
      ></StatisticsBox>
      <br />
      <StatisticsBox
        gameName={gameName[2]}
        recentStudy={recentStudy[2]}
        bestRecords={bestRecords[2]}
        graph={graphData[2]}
        label={graphLabels[2]}
      ></StatisticsBox>
      <br />
      <br />
      <br />
      <h2>최근 게임 기록</h2>
      <Board
        headRow={["No.", "게임", "날짜", "난이도", "정확도"]}
        grid="1fr 5fr 5fr 2fr 2fr"
        data={gameList}
        type="mypagestatistics"
      />
      <br />
      <Pagination
        number={number}
        first={isFirst}
        last={isLast}
        totalPages={totalPages}
        url="mypage/statistics/"
      ></Pagination>
      <br />
    </div>
  );
}
