import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderFooterPage from "pages/router-page/HeaderFooterPage";
import HeaderPage from "pages/router-page/HeaderFooterPage";
import Main from "pages/Main";
import ServiceGuide from "pages/ServiceGuide";
import Notice from "pages/Notice";
import User from "pages/User";

function App() {
  return (
    <>
      <Routes>
        <Route element={<HeaderFooterPage />}>
          <Route path="/" element={<Main />} />
          <Route path="/consult-enroll" element={<div>상담신청</div>} />
          <Route path="/guide/*" element={<ServiceGuide />} />
          <Route path="/notice/*" element={<Notice />} />
          <Route path="/self-study/*" element={<div>스스로 학습</div>} />
          <Route path="/schedule-manage" element={<div>일정관리(선생)</div>} />
          <Route path="/treat-enroll" element={<div>수업예약(환자)</div>} />
          <Route path="/mypage/*" element={<div>마이페이지</div>} />
        </Route>
        <Route element={<HeaderPage />}>
          <Route path="/user/*" element={<User />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
