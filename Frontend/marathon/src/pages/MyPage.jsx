import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import UserInformation from "components/my-page/UserInformation";
import SideNav from "components/common/SideNav";
import style from "./MyPage.module.css";
import Messenger from "components/my-page/Messenger";
import Schedule from "components/my-page/Schedule";
import Statistics from "components/my-page/Statistics";

export default function MyPage() {
  const state = useSelector((state) => state);

  const sideNavContentPatient = [
    "회원 정보 관리",
    "알림 / 메시지",
    "재활 일정",
    "스스로 학습 통계",
    "로그아웃",
  ];
  const sideNavContentDoctor = [
    "회원 정보 관리",
    "알림 / 메시지",
    "재활 일정",
    "수업 기록",
    "로그아웃",
  ];
  const sideNavContentAdmin = [
    "회원 정보 관리",
    "알림 / 메시지",
    "상담 관리",
    "로그아웃",
  ];
  const urlsPatient = ["information", "messenger", "schedule/1", ""];
  const urlsDoctor = ["information", "messenger", "schedule/1", ""];
  const urlsAdmin = ["information", "messenger", ""];

  return (
    <div className="container">
      <div
        className="inner_container"
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
        }}
      >
        <SideNav
          sideNavTitle="마이페이지"
          sideNavContent={
            state.loginUser.userRole === "patient"
              ? sideNavContentPatient
              : state.loginUser.userRole === "doctor"
              ? sideNavContentDoctor
              : sideNavContentAdmin
          }
          urls={
            state.loginUser.userRole === "patient"
              ? urlsPatient
              : state.loginUser.userRole === "doctor"
              ? urlsDoctor
              : urlsAdmin
          }
        />
        <div className={style.side_right_board}>
          <Routes>
            <Route path="information" element={<UserInformation />}></Route>
            <Route path="messenger" element={<Messenger />}></Route>
            <Route path="schedule" element={<Schedule />}></Route>
            <Route path="statistics" element={<Statistics />}></Route>
            <Route path="" element={<div />}></Route>
            <Route path="" element={<div />}></Route>
            <Route path="" element={<div />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
