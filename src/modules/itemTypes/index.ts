import type { ItemType } from './interfaces';

export { default as reducer } from './slice';
export * as selectors from './selectors';

export { ItemType };

export const UnknownItemType: ItemType = {
  id: '_itemType',
  name: 'Item',
  color: '#FFFFFF'
};
