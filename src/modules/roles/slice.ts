import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from 'uuid';
import { RoleCategory } from "./constants";

import type { NewRole, Role } from "./interfaces";

type State = Record<string, Role>;

const initialState: State = {
  '_talent': {
    id: '_talent',
    category: RoleCategory.Talent,
    name: 'Talent',
    useInitialsNotRole: true
  }
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    addRole: (state: State, action: PayloadAction<NewRole>) => {
      const id = uuidV4();
      state[id] = {
        id,
        ...action.payload
      };
    }
  }
});

export const { addRole } = rolesSlice.actions;
export default rolesSlice.reducer;
