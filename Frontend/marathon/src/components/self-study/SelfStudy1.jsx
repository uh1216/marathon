import { Route, Routes } from "react-router-dom";
import SelfStudyLayout from "components/self-study/SelfStudyLayout";
import SelfStudyIntro from "./SelfStudyIntro";
import SelfStudyResult from "./SelfStudyResult";
import EasyMode1 from "components/self-study/self-study-game/EasyMode1";
import NormalMode1 from "components/self-study/self-study-game/NormalMode1";
import HardMode1 from "components/self-study/self-study-game/HardMode1";

export default function SelfStudy1() {
  return (
    <SelfStudyLayout type={1}>
      <Routes>
        <Route
          path="easy/intro"
          element={<SelfStudyIntro type={1} mode={"easy"} />}
        ></Route>
        <Route path="easy/:stage" element={<EasyMode1 />}></Route>

        <Route
          path="normal/intro"
          element={<SelfStudyIntro type={1} mode={"normal"} />}
        ></Route>
        <Route path="normal/:stage" element={<NormalMode1 />}></Route>

        <Route
          path="hard/intro"
          element={<SelfStudyIntro type={1} mode={"hard"} />}
        ></Route>
        <Route path="hard/:stage" element={<HardMode1 />}></Route>

        {/* 게임 결과 화면 */}
        <Route path="result" element={<SelfStudyResult type={1} />}></Route>
      </Routes>
    </SelfStudyLayout>
  );
}
