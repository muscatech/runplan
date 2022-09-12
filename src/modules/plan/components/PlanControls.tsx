import { currentPlanSelector } from "../selectors"
import { CurrentPlanControls } from "./CurrentPlanControls";
import { PlanSelection } from "./PlanSelection";

export const PlanControls = () => {
  const currentPlan = currentPlanSelector();

  if (currentPlan) {
    return <CurrentPlanControls plan={currentPlan} />
  }
  else {
    return <PlanSelection />;
  }
}
