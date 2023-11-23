import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeValue: localStorage.getItem("activeUser")
    ? JSON.parse(localStorage.getItem("activeUser"))
    : null,
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
