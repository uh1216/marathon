import { configureStore } from "@reduxjs/toolkit";
import { nowSideNav } from "./toggle.store";

export default configureStore({
  reducer: {
    nowSideNav: nowSideNav.reducer,
  },
});
