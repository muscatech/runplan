import type { ItemType } from "../itemTypes";
import type { Role } from "../roles";

interface PlanMeta {
  lastModified: number
}

export interface Person {
  id: string,
  name: string,
  role: Role
}

export type NewPerson = Omit<Person, 'id'>;

export interface Plan {
  id: string,
  name: string,
  date?: number,
  items: Item[],
  meta: PlanMeta,
  people: Person[]
}

export interface Item {
  id: string,
  type: string,
  name: string,
  isNew?: boolean,
  remark?: string
}

export interface DragItem {
  index: number
  id: string
  type: string,
  itemType?: ItemType
}
