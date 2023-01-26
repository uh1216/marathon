import { createSlice } from "@reduxjs/toolkit";

const loginUser = createSlice({
  name: "loginUser",
  initialState: null,
  reducers: {
    userLogin(state) {
      // 등급, 이미지url, 이름을 세션에서 가져옴
      state = {
        userName: "홍길동",
        userProfile:
          "https://img1.daumcdn.net/thumb/C500x500/?fname=http://t1.daumcdn.net/brunch/service/user/6qYm/image/eAFjiZeA-fGh8Y327AH7oTQIsxQ.png",
        userRole: "normal",
      };
      // 이거 나중에 삭제하기
      console.log(state);
    },
    userLogout(state) {
      state = null;
    },
  },
});

export const { userLogin, userLogout } = loginUser.actions;
export { loginUser };
