import { createSlice } from "@reduxjs/toolkit";

/** 현재의 SideNav가 무엇을 선택하고 있는지 저장하는 state, 헤더나 sideNav에서 해당 메뉴를 onClick시
 *  해당 state도 같이 변화하도록 dispatch 해주세요!
 *  물론 기본적으로 sideNav를 사용하는 컴포넌트 에서는 useEffet로 처음 랜더링 시 최초 한번
 *  자신의 sideNav값을 아래 변수에 주입하도록 dispath 해주세요.
 */
const nowSideNav = createSlice({
  name: "nowSideNav",
  initialState: "",
  reducers: {
    changeNowSideNav(state, action) {
      return action.payload;
    },
  },
});
export let { changeNowSideNav } = nowSideNav.actions;
export { nowSideNav };
