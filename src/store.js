import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./slices/userSlice";
import activeReducer from "./slices/activeChatSlice";
export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    activeChat: activeReducer,
  },
  middleware: [thunk],
});
