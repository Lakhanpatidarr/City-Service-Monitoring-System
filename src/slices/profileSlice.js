import { createSlice } from "@reduxjs/toolkit";



let storedUser = null;
try {
    const temp = localStorage.getItem("user");
    storedUser = temp ? JSON.parse(temp) : null;
} 
catch (error) {
    storedUser = null;
}
const initialState = {
    user: storedUser,
};
const profileSlice = createSlice({
    name:"profile",
    initialState,
    reducers: {
        setUser(state,value) {
            state.user = value.payload;
        },
        logoutUser(state) {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
});
export const { setUser, logoutUser } = profileSlice.actions;
export default profileSlice.reducer;