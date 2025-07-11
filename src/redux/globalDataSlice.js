import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const globalDataSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {
    setGlobalData(state, action) {
      state.data = action.payload;
    },
    resetGlobalData(state) {
      state.data = {};
    },
  },
});

export const { setGlobalData, resetGlobalData } = globalDataSlice.actions;
export default globalDataSlice.reducer;
