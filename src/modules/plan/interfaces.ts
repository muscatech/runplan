import type { ItemType } from "../itemTypes";

interface PlanMeta {
  lastModified: number
}

export interface Plan {
  id: string,
  name: string,
  date?: number,
  items: Item[],
  meta: PlanMeta
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
