import { RoleCategory } from "./constants";

export interface Role {
  id: string,
  name: string,
  category: RoleCategory,
  useInitialsNotRole?: boolean,
  sortKey?: number
}

export type NewRole = Omit<Role, 'id'>;
