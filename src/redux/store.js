import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from './features/counter/counterSlice'\
import globalDataReducer from "./globalDataSlice";
import matrixSettingsReducer from "./matrixSettingsSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    globalData: globalDataReducer,
    matrixSettings: matrixSettingsReducer,
  },
});
