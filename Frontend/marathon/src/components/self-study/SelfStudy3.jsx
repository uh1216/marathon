import { Route, Routes } from "react-router-dom";
import SelfStudyLayout from "components/self-study/SelfStudyLayout";
import SelfStudyResult from "./SelfStudyResult";
import EasyMode3 from "components/self-study/self-study-game/EasyMode3";
import NormalMode3 from "components/self-study/self-study-game/NormalMode3";
import HardMode3 from "components/self-study/self-study-game/HardMode3";

export default function SelfStudy3() {
  return (
    <SelfStudyLayout type={3}>
      <Routes>
        <Route path="easy" element={<EasyMode3 />}></Route>

        <Route path="normal" element={<NormalMode3 />}></Route>

        <Route path="hard" element={<HardMode3 />}></Route>

        {/* 게임 결과 화면 */}
        <Route path="result" element={<SelfStudyResult type={3} />}></Route>
      </Routes>
    </SelfStudyLayout>
  );
}
