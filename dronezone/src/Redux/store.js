import { configureStore } from "@reduxjs/toolkit";
import dummyReducer from "./dummy/dummySlice";
import authReducer from "./auth/authSlice";
import gpsPosReducer from "./gpsPos/gpsPosSlice";



export const store = configureStore({
  reducer: {
    dummy: dummyReducer,
    auth: authReducer,
    gpsPos: gpsPosReducer,
  },
});

export default store;
