import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Plan } from './interfaces';
import { createPlan } from './functions';
import type { ItemType } from '../itemTypes/interfaces';

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

interface AddItemOptions {
  planID: string,
  type: ItemType
}

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
    },
    addItem: (state, action: PayloadAction<AddItemOptions>) => {
      const currentPlan = state.plans[action.payload.planID];
      state.plans[action.payload.planID] = {
        ...currentPlan,
        items: [
          ...currentPlan.items,
          {
            type: action.payload.type.id,
            name: `New ${action.payload.type.name}`
          }
        ]
      };
    }
  }
});

export const { addItem, createNew, updatePlan } = plansSlice.actions;
export default plansSlice.reducer;
