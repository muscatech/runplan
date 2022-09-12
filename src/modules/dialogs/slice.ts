import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface DialogState {
  currentDialog: null | string
}

const initialState: DialogState = {
  currentDialog: null
};

const slice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<string>) => {
      state.currentDialog = action.payload;
    },
    hide: (state) => {
      state.currentDialog = null;
    }
  }
});

export const { hide, show } = slice.actions;
export default slice.reducer;
