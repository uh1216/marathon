import { createSlice } from "@reduxjs/toolkit";

const loginUser = createSlice({
  name: "loginUser",
  initialState: {
    userName: "",
    userProfileImg: "",
    userRole: "",
  },
  reducers: {
    userLogin: (state) => {
      state.userName = "홍길동";
      state.userProfileImg =
        "https://img1.daumcdn.net/thumb/C500x500/?fname=http://t1.daumcdn.net/brunch/service/user/6qYm/image/eAFjiZeA-fGh8Y327AH7oTQIsxQ.png";
      state.userRole = "teacher";
      // console.log(state.userName);
      // console.log(state.userProfileImg);
      // console.log(state.userRole);
    },
    userLogout: (state) => {
      state = null;
    },
  },
});

export let { userLogin, userLogout } = loginUser.actions;
export { loginUser };
