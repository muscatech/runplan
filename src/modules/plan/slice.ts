import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Plan } from './interfaces';
import { createPlan } from './functions';

interface Plans {
  [index: string]: Plan
}

export interface PlansState {
  currentPlan?: string,
  plans: Plans
}

const initialState: PlansState = {
  currentPlan: undefined,
  plans: {}
};

export const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    createNew: (state, action: PayloadAction<string>) => {
      const newPlan: Plan = createPlan(action.payload);
      state.plans[newPlan.id] = newPlan;
      state.currentPlan = newPlan.id;
    },
    updatePlan: (state, action: PayloadAction<Plan>) => {
      state.plans[action.payload.id] = {
        ...state.plans[action.payload.id],
        ...action.payload
      };
    }
  }
});

export const { createNew, updatePlan } = plansSlice.actions;
export default plansSlice.reducer;
