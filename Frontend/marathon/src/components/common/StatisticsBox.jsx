import style from "./StatisticsBox.module.css";
import GameChart from "./GameChart";
import { useState } from "react";

export default function StatisticsBox() {
  /** 데이터 받아오면 여기에다 저장하면 됨 */
  const graphData = [
    [10, 20, 40, 80, 70],
    [30, 50, 10, 80, 50],
    [10, 20, 40, 60, 0],
  ];
  const colors = ["#63F282", "#FBDB35", "#FF0000"];
  const [selected, SetSelected] = useState(0);

  return (
    <div className={style.main_container}>
      <div className={style.container_1}>
        <div className={style.title_1}>색깔 위치 맞추기</div>
        <div>
          <div className={style.sub_title_1}>최근 학습 기록</div>
          <div className={style.sub_content_1}>2022.12.25 12:03:24</div>
        </div>
        <div className={style.sub_container_1}>
          <div>
            <div className={style.sub_title_1}>난이도</div>
            <div className={style.sub_content_1}>고급</div>
          </div>
          <div>
            <div className={style.sub_title_1}>정확도</div>
            <div className={style.sub_content_1}>80%</div>
          </div>
        </div>
      </div>
      <hr className={style.line} />
      <div className={style.container_2}>
        <div className={style.title_2}>난이도 별 최고 기록</div>
        <div>
          <div>
            <div className={style.sub_title_2}>난이도 초급</div>
            <progress
              className={style.progress + " " + style.green}
              max="100"
              value="100"
            ></progress>
          </div>
          <div>
            <div className={style.sub_title_2}>난이도 중급</div>
            <progress
              className={style.progress + " " + style.yellow}
              max="100"
              value="70"
            ></progress>
          </div>
          <div>
            <div className={style.sub_title_2}>난이도 고급</div>
            <progress
              className={style.progress + " " + style.red}
              max="100"
              value="30"
            ></progress>
          </div>
        </div>
      </div>
      <div className={style.container_3}>
        <div className={style.sub_container_3}>
          <div className={style.title_3}>일 평균 정확도</div>
          <div>
            <label htmlFor="radio_easy">
              <button onClick={() => SetSelected(0)}>초급</button>
            </label>
            <input type="radio" name="mode" id="radio_easy" />
            <label htmlFor="radio_normal">
              <button onClick={() => SetSelected(1)}>중급</button>
            </label>
            <input type="radio" name="mode" id="radio_normal" />
            <label htmlFor="radio_hard">
              <button onClick={() => SetSelected(2)}>고급</button>
            </label>
            <input type="radio" name="mode" id="radio_hard" />
          </div>
        </div>
        <GameChart data={graphData[selected]} color={colors[selected]} />
      </div>
    </div>
  );
}
