import React from "react";
import { Routes, Route } from "react-router-dom";
export default function Notice() {
  return (
    <>
      <div>배너 이미지 삽입</div>
      <Routes>
        <Route path="/:pagenum" element={<div>리스트 들어감</div>}></Route>
      </Routes>
      <div>잘 나오냐?</div>
    </>
  );
}
