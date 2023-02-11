import { Route, Routes } from "react-router-dom";
import SelfStudyLayout from "components/self-study/SelfStudyLayout";
import SelfStudyResult from "./SelfStudyResult";
import EasyMode1 from "components/self-study/self-study-game/EasyMode1";
import NormalMode1 from "components/self-study/self-study-game/NormalMode1";
import HardMode1 from "components/self-study/self-study-game/HardMode1";
import { setType } from "stores/game.store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function SelfStudy1() {
  const dispatch = useDispatch();

  /** 첫 번째 게임을 한다. */
  useEffect(() => {
    dispatch(setType(1));
  }, []);

  return (
    <SelfStudyLayout type={1}>
      <Routes>
        <Route path="easy" element={<EasyMode1 />} />

        <Route path="normal" element={<NormalMode1 />} />

        <Route path="hard" element={<HardMode1 />} />

        {/* 게임 결과 화면 */}
        <Route path="result" element={<SelfStudyResult type={1} />} />
      </Routes>
    </SelfStudyLayout>
  );
}
