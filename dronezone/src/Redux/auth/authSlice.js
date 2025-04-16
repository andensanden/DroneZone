import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuth: false,
    email: null,
    firstname: null,
    lastname: null,
    phone: null
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
        },
        setUser(state, action) {
            const { firstname, lastname, phone } = action.payload;

            state.firstname = firstname;
            state.lastname = lastname;
            state.phone = phone;
        }
    }
});

export const { logout, login, setUser } = authSlice.actions;
export default authSlice.reducer;