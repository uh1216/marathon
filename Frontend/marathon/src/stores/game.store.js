import { createSlice } from "@reduxjs/toolkit";

const gameState = createSlice({
  name: "gameState",
  initialState: {
    type: 0, // 3개의 게임 중, 몇 번째 게임인지 (1, 2, 3)
    mode: "", // easy, normal, hard 모드
    stage: 0, // 현재 몇 번째 단계 문제를 풀고 있는지
    record: [], // 각 stage별 정답 여부(true, false)가 최대 10개까지 담긴다.
    isReady: 0, // 0이면 문제 보여주기, 1이면 문제 풀기, 2이면 답 보여주기
  },
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setStage: (state, action) => {
      state.stage = action.payload;
    },
    setIsReady: (state, action) => {
      state.isReady = action.payload;
    },
    /** 문제를 맞췄으면 true가 추가, 그렇지 않으면 false가 추가 */
    addRecord: (state, action) => {
      state.record.push(action.payload);
    },
    resetRecord: (state) => {
      state.record = [];
    },
    resetAll(state) {
      return {
        type: 0,
        stage: 1,
        record: [],
        isReady: 0,
      };
    },
  },
});

export let {
  setType,
  setMode,
  setStage,
  setIsReady,
  addRecord,
  resetRecord,
  resetAll,
} = gameState.actions;
export { gameState };
