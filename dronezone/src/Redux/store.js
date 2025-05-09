import { configureStore } from "@reduxjs/toolkit";
import dummyReducer from "./dummy/dummySlice";
import authReducer from "./auth/authSlice";
import gpsPosReducer from "./gpsPos/gpsPosSlice";
import eventReducer from "./event/eventSlice";



export const store = configureStore({
  reducer: {
    dummy: dummyReducer,
    auth: authReducer,
    gpsPos: gpsPosReducer,
    event: eventReducer,
  },
});

export default store;
