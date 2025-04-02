import { configureStore } from "@reduxjs/toolkit";
import dummyReducer from "./dummy/dummySlice";
import authReducer from "./auth/authSlice";


export const store = configureStore({
  reducer: {
    dummy: dummyReducer,
    auth: authReducer
  },
});

export default store;
