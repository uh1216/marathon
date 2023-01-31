import { Route, Routes } from "react-router-dom";
import SelfStudyLayout from "components/self-study/SelfStudyLayout";
import SelfStudyIntro from "./SelfStudyIntro";
import SelfStudyResult from "./SelfStudyResult";
import EasyMode1 from "components/self-study/self-study-game/EasyMode1";
import NormalMode1 from "components/self-study/self-study-game/NormalMode1";
import HardMode1 from "components/self-study/self-study-game/HardMode1";
import GIF from "img/gif/11.gif";

export default function SelfStudy1() {
  return (
    <SelfStudyLayout type={1}>
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
        />
        <Route path="easy/:stage" element={<EasyMode1 />} />

        <Route
          path="normal/intro"
          element={
            <SelfStudyIntro
              mode={"normal"}
              title="---안내문구 normal---"
              gif={GIF}
            />
          }
        />
        <Route path="normal/:stage" element={<NormalMode1 />} />

        <Route
          path="hard/intro"
          element={
            <SelfStudyIntro
              mode={"hard"}
              title="---안내문구 hard---"
              gif={GIF}
            />
          }
        />
        <Route path="hard/:stage" element={<HardMode1 />} />

        {/* 게임 결과 화면 */}
        <Route path="result" element={<SelfStudyResult type={1} />} />
      </Routes>
    </SelfStudyLayout>
  );
}
