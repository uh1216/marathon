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

const treatSessionId = createSlice({
  name: "treatSessionId",
  initialState: { sessionId: "" },
  reducers: {
    changeTreatSessionId(state, action) {
      state.sessionId = action.payload;
    },
  },
});

export let { changeNowBoardInfo } = nowBoardInfo.actions;
export let { changeTreatSessionId } = treatSessionId.actions;
export { nowBoardInfo, treatSessionId };
