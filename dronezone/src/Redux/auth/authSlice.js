import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuth: false,
    email: null,
    userID: null,
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
            state.userID = null;
        },
        login(state, action) {
            const {email, userID, firstname, lastname, phone} = action.payload;

            state.isAuth = true;
            state.firstname = firstname;
            state.lastname = lastname;
            state.phone = phone;
            state.email = email;
            state.userID = userID;
        },
        setUser(state, action) {
            const { firstname, lastname, phone, userID } = action.payload;

            state.firstname = firstname;
            state.lastname = lastname;
            state.phone = phone;
            state.userID = userID;
        }
    }
});

export const { logout, login, setUser } = authSlice.actions;
export default authSlice.reducer;