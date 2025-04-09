import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuth: false,
    email: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.isAuth = false;
            state.email = null;
        },
        login(state, action) {
            const email = action.payload;

            state.isAuth = true;
            state.email = email;
        }
    }
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;