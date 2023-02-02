import { configureStore } from "@reduxjs/toolkit";
import { nowSideNav } from "./toggle.store";
import { loginUser } from "./user.store";
import { gameState } from "./game.store";
import { nowBoardInfo } from "./content.store";

export default configureStore({
  reducer: {
    nowSideNav: nowSideNav.reducer,
    loginUser: loginUser.reducer,
    gameState: gameState.reducer,
    nowBoardInfo: nowBoardInfo.reducer,
  },
});
