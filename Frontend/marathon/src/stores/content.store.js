import { createSlice } from "@reduxjs/toolkit";

const nowBoardInfo = createSlice({
  name: "nowBoardInfo",
  initialState: "",
  reducers: {
    changeNowBoardInfo(state, action) {
      return action.payload;
    },
  },
});
export let { changeNowBoardInfo } = nowBoardInfo.actions;
export { nowBoardInfo };
export {};
