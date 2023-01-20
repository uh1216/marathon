import React from "react";
import NoticeBoard from "components/notice/NoticeBoard";

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
