import { useSelector } from "react-redux";
import type { RootState } from '../../store';
import { Plan } from "./interfaces";

export const allPlansSelector = () => useSelector((state: RootState) => state.plans.plans);

export const currentPlanSelector = (): Plan | undefined => {
  const all = allPlansSelector();
  const currentPlanId = useSelector((state: RootState) => state.plans.currentPlan);

  return currentPlanId ? all[currentPlanId] : undefined;
}
