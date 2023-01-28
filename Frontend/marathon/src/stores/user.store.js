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
      //SesstionStorage에서 JWT 불러와서 데이터를 변경시켜줌 - 즉 로그인 클릭시 axios.then 토큰저장 로직을 실행후 호출
      state.userName = "홍길동";
      state.userProfileImg =
        "https://img1.daumcdn.net/thumb/C500x500/?fname=http://t1.daumcdn.net/brunch/service/user/6qYm/image/eAFjiZeA-fGh8Y327AH7oTQIsxQ.png";
      state.userRole = "patient";
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

export let { userLogin, userLogout } = loginUser.actions;
export { loginUser };
