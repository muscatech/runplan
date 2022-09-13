export interface Plan {
  id: string,
  name: string,
  items: Item[]
}

export interface Item {
  type: string,
  name: string,
  isNew?: boolean,
  remark?: string
}
