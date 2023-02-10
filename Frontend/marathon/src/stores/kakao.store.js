import { createSlice } from "@reduxjs/toolkit";

const kakaoInfo = createSlice({
  name: "kakaoInfo",
  initialState: {
    kakaoId: "",
    userEmail: "",
    userName: "",
    userImgUrl: "",
  },
  reducers: {
    setInfo: (state, action) => {
      return {
        kakaoId: action.payload.id.toString(),
        userEmail: action.payload.kakao_account.email,
        userName: action.payload.kakao_account.profile.nickname,
        userImgUrl: action.payload.kakao_account.profile.profile_image_url,
      };
    },

    reset: () => {
      return {
        kakaoId: "",
        userEmail: "",
        userName: "",
        userImgUrl: "",
      };
    },
  },
});

export let { setInfo, reset } = kakaoInfo.actions;
export { kakaoInfo };
