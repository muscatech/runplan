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
      const newID = uuidV4();
      state[newID] = {
        id: newID,
        ...action.payload
      };
    }
  }
});

export const { addNew } = slice.actions;
export default slice.reducer;
