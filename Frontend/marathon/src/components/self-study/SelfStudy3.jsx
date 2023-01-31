import { Route, Routes } from "react-router-dom";
import SelfStudyLayout from "components/self-study/SelfStudyLayout";
import SelfStudyIntro from "./SelfStudyIntro";
import SelfStudyResult from "./SelfStudyResult";
import EasyMode3 from "components/self-study/self-study-game/EasyMode3";
import NormalMode3 from "components/self-study/self-study-game/NormalMode3";
import HardMode3 from "components/self-study/self-study-game/HardMode3";
import GIF from "img/gif/11.gif";

export default function SelfStudy3() {
  return (
    <SelfStudyLayout type={3}>
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
        <Route path="easy/:stage" element={<EasyMode3 />}></Route>

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
        <Route path="normal/:stage" element={<NormalMode3 />}></Route>

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
        <Route path="hard/:stage" element={<HardMode3 />}></Route>

        {/* 게임 결과 화면 */}
        <Route path="result" element={<SelfStudyResult type={3} />}></Route>
      </Routes>
    </SelfStudyLayout>
  );
}
