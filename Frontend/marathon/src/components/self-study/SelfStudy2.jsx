import { Route, Routes } from "react-router-dom";
import SelfStudyLayout from "components/self-study/SelfStudyLayout";
import SelfStudyIntro from "./SelfStudyIntro";
import SelfStudyResult from "./SelfStudyResult";
import EasyMode2 from "components/self-study/self-study-game/EasyMode2";
import NormalMode2 from "components/self-study/self-study-game/NormalMode2";
import HardMode2 from "components/self-study/self-study-game/HardMode2";
import GIF from "img/gif/11.gif";

export default function SelfStudy2() {
  return (
    <SelfStudyLayout type={2}>
      <Routes>
        <Route
          path="easy/intro"
          element={
            <SelfStudyIntro
              mode={"easy"}
              title="---안내문구 easy---"
              gif={GIF}
            />
          }
        ></Route>
        <Route path="easy/:stage" element={<EasyMode2 />}></Route>

        <Route
          path="normal/intro"
          element={
            <SelfStudyIntro
              mode={"normal"}
              title="---안내문구 normal---"
              gif={GIF}
            />
          }
        ></Route>
        <Route path="normal/:stage" element={<NormalMode2 />}></Route>

        <Route
          path="hard/intro"
          element={
            <SelfStudyIntro
              mode={"hard"}
              title="---안내문구 hard---"
              gif={GIF}
            />
          }
        ></Route>
        <Route path="hard/:stage" element={<HardMode2 />}></Route>

        {/* 게임 결과 화면 */}
        <Route path="result" element={<SelfStudyResult type={2} />}></Route>
      </Routes>
    </SelfStudyLayout>
  );
}
