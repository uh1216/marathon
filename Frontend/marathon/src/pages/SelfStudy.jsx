import { Route, Routes } from "react-router-dom";
import style from "./SelfStudy.module.css";
import SelfStudy1 from "components/self-study/SelfStudy1";
import SelfStudy2 from "components/self-study/SelfStudy2";
import SelfStudy3 from "components/self-study/SelfStudy3";

export default function SelfStudy() {
  return (
    <div className={style.wrap}>
      <div className={style.background}></div>
      <div className={style.white_container}>
        <Routes>
          <Route path="1/*" element={<SelfStudy1 />}></Route>
          <Route path="2/*" element={<SelfStudy2 />}></Route>
          <Route path="3/*" element={<SelfStudy3 />}></Route>
        </Routes>
      </div>
    </div>
  );
}
