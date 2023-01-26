import { configureStore } from "@reduxjs/toolkit";
import { nowSideNav } from "./toggle.store";
import { loginUser } from "./user.store";

export default configureStore({
  reducer: {
    nowSideNav: nowSideNav.reducer,
    loginUser: loginUser.reducer,
  },
});
