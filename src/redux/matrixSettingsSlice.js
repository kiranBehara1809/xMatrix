import { createSlice } from "@reduxjs/toolkit";
import { QUADRANTS_CONSTANT } from "../db/quadrantsReConstant";

const initialState = {
  lockState: false,
};

const matrixSettingsSlice = createSlice({
  name: "matrixSettings",
  initialState,
  reducers: {
    setLockState(state, action) {
      state.lockState = action.payload;
    },
  },
});

export const { setLockState } = matrixSettingsSlice.actions;
export default matrixSettingsSlice.reducer;
