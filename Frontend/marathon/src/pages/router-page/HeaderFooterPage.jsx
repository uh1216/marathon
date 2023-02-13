import React from "react";
import Header from "components/common/Header.jsx";
import Footer from "components/common/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function HeaderFooterPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
      }}
    >
      <Header />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
