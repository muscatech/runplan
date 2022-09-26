import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { arrayMoveImmutable } from 'array-move';
import { v4 as uuidV4 } from 'uuid';

import type { Item, NewPerson, Person, Plan } from './interfaces';
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

interface CreateNewOptions {
  name: string,
  date?: number
}

interface AddItemOptions {
  planID: string,
  type: ItemType,
  index?: number
}

interface UpdatePlanItemOptions {
  planID: string,
  itemIndex: number,
  item: Item
}

interface MovePlanItemOptions {
  planID: string,
  sourceID: string,
  destinationIndex: number
}

interface DeletePlanItemOptions {
  planID: string,
  index: number
}

interface AddPersonOptions {
  planID: string,
  person: NewPerson
}

export const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    createNew: (state: PlansState, action: PayloadAction<CreateNewOptions>) => {
      const newPlan: Plan = createPlan(action.payload.name, action.payload.date);
      state.plans[newPlan.id] = newPlan;
      state.currentPlan = newPlan.id;
    },

    choosePlan: (state: PlansState, action: PayloadAction<string>) => {
      if (state.plans[action.payload]) {
        state.currentPlan = action.payload;
      }
    },

    updatePlan: (state: PlansState, action: PayloadAction<Plan>) => {
      state.plans[action.payload.id] = {
        ...state.plans[action.payload.id],
        ...action.payload,
        meta: {
          ...state.plans[action.payload.id].meta,
          lastModified: Date.now()
        }
      };
    },

    addItem: (state: PlansState, action: PayloadAction<AddItemOptions>) => {
      const currentPlan = state.plans[action.payload.planID];

      currentPlan.items.splice(
        action.payload.index || currentPlan.items.length,
        0,
        {
          id: uuidV4(),
          type: action.payload.type.id,
          name: `New ${action.payload.type.name}`,
          isNew: true
        }
      );

      currentPlan.meta.lastModified = Date.now();
    },

    updatePlanItem: (state: PlansState, action: PayloadAction<UpdatePlanItemOptions>) => {
      const currentPlan = state.plans[action.payload.planID];
      const currentItem = currentPlan.items[action.payload.itemIndex];

      const newItem = { ...currentItem, ...action.payload.item };

      delete newItem.isNew;

      if (newItem.name === '') {
        currentPlan.items.splice(action.payload.itemIndex, 1);
      }
      else {
        currentPlan.items.splice(action.payload.itemIndex, 1, newItem);
      }

      currentPlan.meta.lastModified = Date.now();
    },

    movePlanItem: (state: PlansState, action: PayloadAction<MovePlanItemOptions>) => {
      const currentPlan = state.plans[action.payload.planID];

      const sourceIndex = currentPlan.items.findIndex(i => i.id === action.payload.sourceID);

      currentPlan.items = arrayMoveImmutable(
        currentPlan.items,
        sourceIndex,
        action.payload.destinationIndex
      );

      currentPlan.meta.lastModified = Date.now();
    },

    deletePlanItem: (state: PlansState, action: PayloadAction<DeletePlanItemOptions>) => {
      const currentPlan = state.plans[action.payload.planID];
      currentPlan.items.splice(action.payload.index, 1);
    },

    addPerson: (state: PlansState, action: PayloadAction<AddPersonOptions>) => {
      const currentPlan = state.plans[action.payload.planID];

      const newPerson: Person = {
        id: uuidV4(),
        ...action.payload.person
      };

      currentPlan.people.push(newPerson);
    }
  }
});

export const {
  addItem, deletePlanItem, movePlanItem, updatePlanItem,
  choosePlan, createNew, updatePlan,
  addPerson
} = plansSlice.actions;
export default plansSlice.reducer;
