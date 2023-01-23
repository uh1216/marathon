import { configureStore, createSlice } from "@reduxjs/toolkit";

// 현재의 SideNav가 무엇을 선택하고 있는지 저장하는 state
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

export default configureStore({
  reducer: {
    nowSideNav: nowSideNav.reducer,
  },
});
