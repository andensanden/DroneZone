import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuth: true,
    name: null,
    lastName: null,
    email: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.isAuth = false;
            state.name = null;
            state.lastName = null;
            state.email = null;
        },
        login(state, action) {
            const {name, lastName, email} = action.payload;

            state.isAuth = true;
            state.name = name;
            state.lastName = lastName;
            state.email = email;
        }
    }
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;