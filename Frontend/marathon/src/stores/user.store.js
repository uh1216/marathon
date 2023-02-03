import { createSlice } from "@reduxjs/toolkit";
import { Buffer } from "buffer";

const loginUser = createSlice({
  name: "loginUser",
  initialState: {
    userName: "",
    userProfileImg: "",
    userRole: "",
    unReadMsgNum: 0,
  },
  reducers: {
    userLogin: (state) => {
      //SesstionStorage에서 JWT 불러와서 데이터를 변경시켜줌 - 즉 로그인 클릭시 axios.then 토큰저장 로직을 실행후 호출
      const token = sessionStorage.getItem("access-token");
      if (token) {
        let base64Payload = token.split(".")[1];
        let payload = Buffer.from(base64Payload, "base64");
        let result = JSON.parse(payload.toString());

        state.userName = result.name;
        // 실제로는 이걸로 바꿔야 한다
        // state.userProfileImg = result.url;
        state.userProfileImg =
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwX-eqkkKMB3CD4rksUziVvafltd3iiqZeHw&usqp=CAU";

        if (result.roles[0] === "ROLE_PATIENT") {
          state.userRole = "patient";
        }
        if (result.roles[0] === "ROLE_DOCTOR") {
          state.userRole = "doctor";
        }
        if (result.roles[0] === "ROLE_ADMIN") {
          state.userRole = "admin";
        }
      }
    },

    userLogout: () => {
      sessionStorage.removeItem("access-token");
      return {
        userName: "",
        userProfileImg: "",
        userRole: "",
      };
    },

    updateUnReadMsgNum: (state, action) => {
      state.unReadMsgNum = action.payload;
    },
  },
});

export let { userLogin, userLogout, changeMsgNum, updateUnReadMsgNum } =
  loginUser.actions;
export { loginUser };
