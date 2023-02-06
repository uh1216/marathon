import { createSlice } from "@reduxjs/toolkit";

const nowBoardInfo = createSlice({
  name: "nowBoardInfo",
  initialState: { consultingSeq: "" },
  reducers: {
    changeNowBoardInfo(state, action) {
      state.consultingSeq = action.payload;
    },
  },
});
export let { changeNowBoardInfo } = nowBoardInfo.actions;
export { nowBoardInfo };
