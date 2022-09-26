import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from 'uuid';

import type { PayloadAction } from "@reduxjs/toolkit";
import type { ItemType, NewItemType } from "./interfaces";

type State = Record<string, ItemType>;

const initialState: State = {
  '_section': {
    id: '_section',
    name: 'Section',
    color: '#FFFFFF',
    isSectionHeading: true
  }
};

const slice = createSlice({
  name: 'itemTypes',
  initialState,
  reducers: {
    addNew: (state: State, action: PayloadAction<NewItemType>) => {
      const newbie = {
        id: uuidV4(),
        ...action.payload
      };

      // Only allow fixed-name item types if they're also section headings
      newbie.fixedName = newbie.fixedName && newbie.isSectionHeading;

      state[newbie.id] = newbie;
    },
    deleteType: (state: State, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    updateType: (state: State, action: PayloadAction<ItemType>) => {
      state[action.payload.id] = action.payload;
    }
  }
});

export const { addNew, deleteType, updateType } = slice.actions;
export default slice.reducer;
