import { createSlice } from "@reduxjs/toolkit";

const gameState = createSlice({
  name: "gameState",
  initialState: {
    type: 0,
    mode: "",
    stageNow: 0,
    record: [],
  },
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setStageNow: (state, action) => {
      state.stageNow = action.payload;
    },
    /** 문제를 맞췄으면 true가 추가, 그렇지 않으면 false가 추가 */
    addRecord: (state, action) => {
      state.record.push(action.payload);
    },
    resetRecord: (state) => {
      state.record = [];
    },
    resetAll(state) {
      state = this.initialState;
    },
  },
});

export let { setType, setMode, setStageNow, addRecord, resetRecord, resetAll } =
  gameState.actions;
export { gameState };
