import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthToken, ImportState } from "./types";
import { ImportStep } from './types';

const initialState: ImportState = {
  auth: null,
  currentStep: ImportStep.NOT_STARTED,
  selectedServiceType: null,
  selectedPlanID: null,
};

const importSlice = createSlice({
  name: 'import',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    setCurrentStep: (state: ImportState, action: PayloadAction<ImportStep>) => {
      state.currentStep = action.payload;
    },
    setToken: (state: ImportState, action: PayloadAction<AuthToken>) => {
      state.auth = action.payload;
    },
    selectServiceType: (state: ImportState, action: PayloadAction<number>) => {
      state.selectedServiceType = action.payload;
      state.currentStep = ImportStep.SERVICE_TYPE_SELECTED;
    },
    selectPlan: (state: ImportState, action: PayloadAction<number>) => {
      state.selectedPlanID = action.payload;
      state.currentStep = ImportStep.PLAN_SELECTED;
    }
  }
});

export default importSlice.reducer;

export const { reset, selectPlan, selectServiceType, setCurrentStep, setToken } = importSlice.actions;
