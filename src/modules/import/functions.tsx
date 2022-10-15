import { Item as RunplanItem, Plan as RunplanPlan } from "../plan/interfaces";
import { ItemType as RunplanItemType } from '../itemTypes';
import { Item, ItemType, Plan } from "./types";

export const getCodeFromQueryString = () => {
  const qs = window.location.search;
  const params = new URLSearchParams(qs);
  return params.get('code');
};

export const mapPlan = (plan: Plan, items: Item[] = []): RunplanPlan => ({
  id: `PCO-${plan.id}`,
  name: plan.title || 'Imported plan',
  date: Date.parse(plan.sort_date) / 1000,
  items: items.map(mapItem),
  people: [],
  meta: {
    lastModified: Date.now()
  }
});

export const mapItem = (item: Item): RunplanItem => {
  return {
    id: String(item.id),
    name: item.key_name ? `${item.title} (${item.key_name})` : item.title,
    type: `PCO-${item.item_type}`,
    remark: item.description || undefined
  };
};

export const mapItemType = (item: Item): RunplanItemType => ({
  id: `PCO-${item.item_type}`,
  name: item.item_type,
  color: '#FFFFFF',
  isSectionHeading: item.item_type === ItemType.Header
});
