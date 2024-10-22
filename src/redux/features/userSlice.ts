import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user";


// default value
const initialState : null | User = null


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => action.payload,
        logout: () => initialState, // null
    },
})

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;