import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Item, Plan } from './interfaces';
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

interface UpdatePlanItemOptions {
  planID: string,
  itemIndex: number,
  item: Item
}

export const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    createNew: (state: PlansState, action: PayloadAction<string>) => {
      const newPlan: Plan = createPlan(action.payload);
      state.plans[newPlan.id] = newPlan;
      state.currentPlan = newPlan.id;
    },
    updatePlan: (state: PlansState, action: PayloadAction<Plan>) => {
      state.plans[action.payload.id] = {
        ...state.plans[action.payload.id],
        ...action.payload
      };
    },
    addItem: (state: PlansState, action: PayloadAction<AddItemOptions>) => {
      const currentPlan = state.plans[action.payload.planID];
      state.plans[action.payload.planID] = {
        ...currentPlan,
        items: [
          ...currentPlan.items,
          {
            type: action.payload.type.id,
            name: `New ${action.payload.type.name}`,
            isNew: true
          }
        ]
      };
    },
    updatePlanItem: (state: PlansState, action:PayloadAction<UpdatePlanItemOptions>) => {
      const currentPlan = state.plans[action.payload.planID];
      const currentItem = currentPlan.items[action.payload.itemIndex];

      const newItem = { ...currentItem, ...action.payload.item };

      if (newItem.name === '') {
        currentPlan.items.splice(action.payload.itemIndex, 1);
      }
      else {
        currentPlan.items.splice(action.payload.itemIndex, 1, newItem);
      }
    }
  }
});

export const { addItem, createNew, updatePlan, updatePlanItem } = plansSlice.actions;
export default plansSlice.reducer;
