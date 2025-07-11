import { createSlice } from "@reduxjs/toolkit";
import { QUADRANTS_CONSTANT } from "../db/quadrantsReConstant";

const initialState = {
  data: JSON.parse(JSON.stringify(QUADRANTS_CONSTANT)),
};

const globalDataSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {
    setGlobalData(state, action) {
      state.data = action.payload;
    },
    resetGlobalData(state) {
      state.data = JSON.parse(JSON.stringify(QUADRANTS_CONSTANT));
    },
  },
});

export const { setGlobalData, resetGlobalData } = globalDataSlice.actions;
export default globalDataSlice.reducer;
