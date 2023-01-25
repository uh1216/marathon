import { React } from "react";
import { Routes, Route } from "react-router-dom";
import SideNav from "components/common/SideNav";
import ServiceInfo from "components/service-guide/ServiceInfo";
import ServicePartner from "components/service-guide/ServicePartner";

export default function ServiceGuide() {
  const sideNavTitle = "서비스 안내";
  const sideNavContent = ["서비스 정보", "파트너 재활사 소개", "지정병원 소개"];
  const urls = ["/guide", "/guide/partners", "/"];

  return (
    <>
      <div className="board">
        <div
          className="inner_board"
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
          }}
        >
          <SideNav
            sideNavTitle={sideNavTitle}
            sideNavContent={sideNavContent}
            urls={urls}
          />
          <Routes>
            <Route path="/" element={<ServiceInfo />} />
            <Route path="/partners" element={<ServicePartner />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
