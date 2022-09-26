import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from 'uuid';

import type { PayloadAction } from "@reduxjs/toolkit";
import type { ItemType, NewItemType } from "./interfaces";

const initialState: Record<string, ItemType> = {
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
    addNew: (state, action: PayloadAction<NewItemType>) => {
      const newbie = {
        id: uuidV4(),
        ...action.payload
      };

      // Only allow fixed-name item types if they're also section headings
      newbie.fixedName = newbie.fixedName && newbie.isSectionHeading;

      state[newbie.id] = newbie;
    }
  }
});

export const { addNew } = slice.actions;
export default slice.reducer;
