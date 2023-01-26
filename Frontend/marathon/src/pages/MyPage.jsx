import { Route, Routes } from "react-router-dom";
import UserInformation from "components/my-page/UserInformation";
import SideNav from "components/common/SideNav";

export default function MyPage() {
  const sideNavContent = [
    "회원 정보 관리",
    "알림 / 메시지",
    "재활 일정",
    "스스로 학습 통계",
    "로그아웃",
  ];
  const urls = ["", "", "", "", ""];

  return (
    <div>
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
          sideNavContent={sideNavContent}
          urls={urls}
        />
        <Routes>
          <Route path="information" element={<UserInformation />}></Route>
          <Route path="" element={<div />}></Route>
          <Route path="" element={<div />}></Route>
          <Route path="" element={<div />}></Route>
          <Route path="" element={<div />}></Route>
          <Route path="" element={<div />}></Route>
          <Route path="" element={<div />}></Route>
        </Routes>
      </div>
    </div>
  );
}
