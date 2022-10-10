import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthToken, ImportState } from "./types";
import { ImportStep } from './types';

const initialState: ImportState = {
  auth: null,
  currentStep: ImportStep.NOT_STARTED,
};

const importSlice = createSlice({
  name: 'import',
  initialState,
  reducers: {
    setCurrentStep: (state: ImportState, action: PayloadAction<ImportStep>) => {
      state.currentStep = action.payload;
    },
    setToken: (state: ImportState, action: PayloadAction<AuthToken>) => {
      state.auth = action.payload;
    }
  }
});

export default importSlice.reducer;

export const { setCurrentStep, setToken } = importSlice.actions;
