import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from './features/counter/counterSlice'\
import globalDataReducer from "./globalDataSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    globalData: globalDataReducer,
  },
});
