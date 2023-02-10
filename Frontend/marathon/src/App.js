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
import SelfStudy from "pages/SelfStudy";
import { useSelector } from "react-redux";
import AuthRoute from "util/AuthRoute";
import Consult from "pages/Consult";
import Treat from "pages/Treat";
// import ChatRoom from "components/websocket/ChatRoom";
import Practice from "components/websocket/Practice";

function App() {
  const state = useSelector((state) => state);
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
          <Route path="/chatroom" element={<Practice />} />
          <Route
            path="/mypage/*"
            element={<AuthRoute render={() => <MyPage />} />}
          />
        </Route>
        <Route element={<HeaderPage />}>
          <Route path="/user/*" element={<User />} />
          <Route path="/self-study/*" element={<SelfStudy />} />
        </Route>
        <Route path="/consult" element={<Consult />} />
        <Route path="/treat/:sessionId" element={<Treat />} />
      </Routes>
    </>
  );
}

export default App;
