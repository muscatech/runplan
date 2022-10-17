import { Item as RunplanItem, Person as RunplanPerson, Plan as RunplanPlan } from "../plan/interfaces";
import type { Item, ItemTypeMapping, Plan, PlanPerson, TeamCategoryMapping } from "./types";
import { useEffect, useState } from "react";
import { RoleCategory } from "../roles";

export const getCodeFromQueryString = () => {
  const qs = window.location.search;
  const params = new URLSearchParams(qs);
  return params.get('code');
};

interface PlanMapperArguments {
  plan: Plan | undefined,
  itemMapping: ItemTypeMapping,
  items: Item[] | undefined,
  teamMapping: TeamCategoryMapping,
  people: PlanPerson[] | undefined,
  timeFilter: number[]
}

export const usePlanMapper = (
  args: PlanMapperArguments
) => {
  const [mappedPlan, setMappedPlan] = useState<RunplanPlan>();
  const { items, itemMapping, people, plan, teamMapping, timeFilter } = args;
  useEffect(
    () => {
      if (items && plan) {
        setMappedPlan(
          mapPlan(args)
        );
      }
    },
    [itemMapping, items, plan, people, teamMapping, timeFilter]
  );

  return mappedPlan;
};

export const mapPlan = (
  { items, itemMapping, people, plan, teamMapping, timeFilter }: PlanMapperArguments
): RunplanPlan => ({
  id: `PCO-${plan?.id}`,
  name: plan?.title || 'Imported plan',
  date: Date.parse(plan?.sort_date || '0') / 1000,
  items: items?.map(mapItem(itemMapping)).filter((i): i is RunplanItem => !!i) || [],
  people: people?.map(mapPerson(teamMapping, timeFilter)).filter((i): i is RunplanPerson => !!i) || [],
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

export const mapPerson = (mapping: TeamCategoryMapping, timeFilter: number[]) => (planPerson: PlanPerson): RunplanPerson | null => {

  if (planPerson.team && !mapping[planPerson.team.id]) {
    return null;
  }

  if (planPerson.status !== 'C') {
    return null;
  }

  if (timeFilter.length > 0 && planPerson.times.filter(t => timeFilter.includes(t)).length === 0) {
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
