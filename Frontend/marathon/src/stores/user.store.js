import { createSlice } from "@reduxjs/toolkit";
import { Buffer } from "buffer";

const loginUser = createSlice({
  name: "loginUser",
  initialState: {
    userName: "",
    userProfileImg: "",
    userRole: "",

    // 얘 수정해서 없애버릴꺼임!!!!!
    unReadMsgNum: 2,
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
        state.userProfileImg = result.url;
        if (result.roles[0] === "ROLE_PATIENT") {
          state.userRole = "patient";
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
  },
});

export let { userLogin, userLogout, changeMsgNum } = loginUser.actions;
export { loginUser };
