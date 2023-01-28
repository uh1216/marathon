import { createSlice } from "@reduxjs/toolkit";

const loginUser = createSlice({
  name: "loginUser",
  initialState: {
    userName: "홍길동",
    userProfileImg:
      "https://img1.daumcdn.net/thumb/C500x500/?fname=http://t1.daumcdn.net/brunch/service/user/6qYm/image/eAFjiZeA-fGh8Y327AH7oTQIsxQ.png",
    userRole: "doctor",
  },
  reducers: {
    userLogin: (state) => {
      state.userName = "홍길동";
      state.userProfileImg =
        "https://img1.daumcdn.net/thumb/C500x500/?fname=http://t1.daumcdn.net/brunch/service/user/6qYm/image/eAFjiZeA-fGh8Y327AH7oTQIsxQ.png";
      state.userRole = "doctor";
    },
    userLogout: () => {
      //JWT토큰 삭제해 주자
      return {
        userName: "",
        userProfileImg: "",
        userRole: "",
      };
    },
  },
});

export let { userLogin, userLogout } = loginUser.actions;
export { loginUser };
