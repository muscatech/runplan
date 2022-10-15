import { Item as RunplanItem, Plan as RunplanPlan } from "../plan/interfaces";
import { Item, ItemTypeMapping, Plan } from "./types";
import { useEffect, useState } from "react";

export const getCodeFromQueryString = () => {
  const qs = window.location.search;
  const params = new URLSearchParams(qs);
  return params.get('code');
};

export const usePlanMapper = (mapping: ItemTypeMapping, plan: Plan | undefined, items: Item[] | undefined) => {
  const [mappedPlan, setMappedPlan] = useState<RunplanPlan>();

  useEffect(
    () => {
      if (items && plan) {
        setMappedPlan(
          mapPlan(
            mapping,
            plan,
            items
          )
        );
      }
    },
    [mapping, items, plan]
  );

  return mappedPlan;
};

export const mapPlan = (mapping: ItemTypeMapping, plan: Plan, items: Item[] = []): RunplanPlan => ({
  id: `PCO-${plan.id}`,
  name: plan.title || 'Imported plan',
  date: Date.parse(plan.sort_date) / 1000,
  items: items.map(mapItem(mapping)).filter((i): i is RunplanItem => !!i),
  people: [],
  meta: {
    lastModified: Date.now()
  }
});

export const mapItem = (mapping: ItemTypeMapping) => (item: Item): RunplanItem | null => {
  if (!mapping[item.item_type] || mapping[item.item_type] === 'ignore') {
    return null;
  }
  return {
    id: String(item.id),
    name: item.key_name ? `${item.title} (${item.key_name})` : item.title,
    type: mapping[item.item_type] || `PCO-${item.item_type}`,
    remark: item.description || undefined
  };
};
