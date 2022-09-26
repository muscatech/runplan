import { RoleCategory } from "./constants";

export interface Role {
  id: string,
  name: string,
  category: RoleCategory,
  useInitialsNotRole?: boolean
}

export type NewRole = Omit<Role, 'id'>;
