import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    token:localStorage.getItem("token")||null,
    isLoggedIn:localStorage.getItem("token") ? true : false,
};
const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value) {
            state.token = value.payload;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.token = null;
            state.isLoggedIn = false;
            localStorage.removeItem("token");
        },
    },
});
export const{setToken,logout} = authSlice.actions;
export default authSlice.reducer;