import { Route, Routes } from "react-router-dom";
import SelfStudyLayout from "components/self-study/SelfStudyLayout";
import SelfStudyResult from "./SelfStudyResult";
import EasyMode2 from "components/self-study/self-study-game/EasyMode2";
import NormalMode2 from "components/self-study/self-study-game/NormalMode2";
import HardMode2 from "components/self-study/self-study-game/HardMode2";

export default function SelfStudy2() {
  return (
    <SelfStudyLayout type={2}>
      <Routes>
        <Route path="easy" element={<EasyMode2 />}></Route>

        <Route path="normal" element={<NormalMode2 />}></Route>

        <Route path="hard" element={<HardMode2 />}></Route>

        {/* 게임 결과 화면 */}
        <Route path="result" element={<SelfStudyResult type={2} />}></Route>
      </Routes>
    </SelfStudyLayout>
  );
}
