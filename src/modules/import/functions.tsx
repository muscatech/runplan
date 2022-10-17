import { Item as RunplanItem, Person as RunplanPerson, Plan as RunplanPlan } from "../plan/interfaces";
import { Item, ItemTypeMapping, Plan, PlanPerson, TeamCategoryMapping } from "./types";
import { useEffect, useState } from "react";
import { RoleCategory } from "../roles";

export const getCodeFromQueryString = () => {
  const qs = window.location.search;
  const params = new URLSearchParams(qs);
  return params.get('code');
};

export const usePlanMapper = (
  plan: Plan | undefined,
  itemMapping: ItemTypeMapping,
  items: Item[] | undefined,
  teamMapping: TeamCategoryMapping,
  people: PlanPerson[] | undefined
) => {
  const [mappedPlan, setMappedPlan] = useState<RunplanPlan>();

  useEffect(
    () => {
      if (items && plan) {
        setMappedPlan(
          mapPlan(
            plan,
            itemMapping,
            items,
            teamMapping,
            people
          )
        );
      }
    },
    [itemMapping, items, plan, people]
  );

  return mappedPlan;
};

export const mapPlan = (
  plan: Plan,
  itemMapping: ItemTypeMapping,
  items: Item[] = [],
  teamMapping: TeamCategoryMapping,
  people: PlanPerson[] = []
): RunplanPlan => ({
  id: `PCO-${plan.id}`,
  name: plan.title || 'Imported plan',
  date: Date.parse(plan.sort_date) / 1000,
  items: items.map(mapItem(itemMapping)).filter((i): i is RunplanItem => !!i),
  people: people.map(mapPerson(teamMapping)).filter((i): i is RunplanPerson => !!i),
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

export const mapPerson = (mapping: TeamCategoryMapping) => (planPerson: PlanPerson): RunplanPerson | null => {

  if (planPerson.team && !mapping[planPerson.team.id]) {
    return null;
  }

  if (planPerson.status !== 'C') {
    return null;
  }

  return {
    id: String(planPerson.id),
    name: planPerson.name,
    role: {
      name: planPerson.team_position_name,
      category: planPerson.team ? mapping[planPerson.team.id] : RoleCategory.Talent
    }
  };
};
