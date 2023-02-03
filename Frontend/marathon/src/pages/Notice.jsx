import React from "react";
import { Routes, Route } from "react-router-dom";
import NoticeBoard from "components/notice/NoticeBoard";
import NoticeCreate from "components/notice/NoticeCreate";
import NoticeDetail from "components/notice/NoticeDetail";
import NoticeUpdate from "components/notice/NoticeUpdate";
import style from "./Notice.module.css";

export default function Notice() {
  return (
    <div>
      <div
        className={style.banner}
        style={{ animation: "1s ease-in-out loadEffect1" }}
      >
        <p
          className={style.title}
          style={{ animation: "1s ease-in-out loadEffect2" }}
        >
          공지사항
        </p>
      </div>
      <Routes>
        <Route path=":pageNum" element={<NoticeBoard />} />
        <Route path="notice-create" element={<NoticeCreate />} />
        <Route path="detail/:num" element={<NoticeDetail />} />
        <Route path="detail/:num/update" element={<NoticeUpdate />} />
      </Routes>
    </div>
  );
}
