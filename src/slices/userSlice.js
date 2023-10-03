import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userValue: localStorage.getItem("userData",)? JSON.parse(localStorage.getItem("userData")) :null
}; 
export const userSlice = createSlice({
    name:'userInfo',
    initialState,
    reducers:{
        userLogInfo: (state,action) =>{
            state.userValue = action.payload
        }
    }
});

export const {userLogInfo}=userSlice.actions
export default userSlice.reducer