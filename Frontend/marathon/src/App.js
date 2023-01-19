import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./pages/Main";
import Notice from "./pages/Notice";
import Header from "./components/common/Header.jsx";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/consult-enroll" element={<div>상담신청</div>}></Route>
        <Route path="/guide" element={<div>서비스 안내</div>}></Route>
        <Route path="/notice/*" element={<Notice />}></Route>
        <Route path="/self-study" element={<div>스스로 학습</div>}></Route>
        <Route
          path="/schedule-manage"
          element={<div>일정관리(선생님)</div>}
        ></Route>
        <Route
          path="/treat-enroll"
          element={<div>수업예약(환자분)</div>}
        ></Route>
        <Route path="/member" element={<div>로그인/회원가입</div>}></Route>
        <Route path="/mypage" element={<div>마이페이지</div>}></Route>
      </Routes>
    </>
  );
}

export default App;
