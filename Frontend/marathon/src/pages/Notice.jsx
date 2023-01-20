import React from "react";
import { Routes, Route } from "react-router-dom";
import NoticeBoard from "components/notice/NoticeBoard";
import NoticeCreate from "components/notice/NoticeCreate";
import style from "./Notice.module.css";

export default function Notice() {
  return (
    <div>
      <div className={style.banner}></div>
      <Routes>
        <Route path="/" element={<NoticeBoard />} />
        <Route path="notice-create" element={<NoticeCreate />} />
      </Routes>
    </div>
  );
}
