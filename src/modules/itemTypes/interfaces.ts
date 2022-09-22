export interface NewItemType {
  name: string,
  color: string,
  isSectionHeading?: boolean
}

export interface ItemType extends NewItemType {
  id: string
}
