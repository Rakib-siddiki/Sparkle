import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeValue: ""
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
