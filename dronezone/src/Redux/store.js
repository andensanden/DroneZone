import { configureStore } from "@reduxjs/toolkit";
import dummyReducer from "./dummy/dummySlice";


export const store = configureStore({
  reducer: {
    dummy: dummyReducer
  },
});

export default store;
