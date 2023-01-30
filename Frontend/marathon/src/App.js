import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderFooterPage from "pages/router-page/HeaderFooterPage";
import HeaderPage from "pages/router-page/HeaderPage";
import Main from "pages/Main";
import ConsultEnroll from "pages/ConsultEnroll";
import ServiceGuide from "pages/ServiceGuide";
import Notice from "pages/Notice";
import User from "pages/User";
import TreatEnroll from "pages/TreatEnroll";
import MyPage from "pages/MyPage";
import SelfStudyList from "pages/SelfStudyList";
import ScheduleManage from "pages/ScheduleManage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<HeaderFooterPage />}>
          <Route path="/" element={<Main />} />
          <Route path="/consult-enroll" element={<ConsultEnroll />} />
          <Route path="/guide/*" element={<ServiceGuide />} />
          <Route path="/notice/*" element={<Notice />} />
          <Route path="/self-study-list" element={<SelfStudyList />} />
          <Route path="/schedule-manage" element={<ScheduleManage />} />
          <Route path="/treat-enroll" element={<TreatEnroll />} />
          <Route path="/mypage/*" element={<MyPage />} />
        </Route>
        <Route element={<HeaderPage />}>
          <Route path="/user/*" element={<User />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
