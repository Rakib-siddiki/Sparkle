import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeValue: localStorage.getItem("goingToChat")
    ? JSON.parse(localStorage.getItem("goingToChat"))
    : '',
};
export const activeChatSlice = createSlice({
  name: "goingToChat",
  initialState,
  reducers: {
    activeChat: (state, action) => {
      state.activeValue = action.payload;
    },
  },
});

export const { activeChat } = activeChatSlice.actions;
export default activeChatSlice.reducer;
