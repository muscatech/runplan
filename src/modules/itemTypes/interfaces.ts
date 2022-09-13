export interface NewItemType {
  name: string,
  color: string
}

export interface ItemType extends NewItemType {
  id: string
}
