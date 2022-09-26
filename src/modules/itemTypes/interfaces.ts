export interface NewItemType {
  name: string,
  color: string,
  isSectionHeading?: boolean,
  fixedName?: boolean
}

export interface ItemType extends NewItemType {
  id: string
}
