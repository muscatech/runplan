interface PlanMeta {
  lastModified: number
}

export interface Plan {
  id: string,
  name: string,
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
