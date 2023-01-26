import { Route, Routes } from "react-router-dom";
import UserInformation from "components/my-page/UserInformation";

export default function MyPage() {
  return (
    <div>
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
  );
}
