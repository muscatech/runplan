import { useCurrentStepSelector } from "../selectors";
import { ImportStep } from "../types";
import { FinaliseImport } from "./FinaliseImport";
import { LoginPage } from "./LoginPage";
import { PlanTypeSelection } from "./PlanTypeSelection";
import { ServiceSelection } from "./ServiceSelection";

const Pages: Record<string, () => JSX.Element> = {
  [ImportStep.NOT_STARTED]: LoginPage,
  [ImportStep.BEGIN]: LoginPage,
  [ImportStep.AUTH_TOKEN_OBTAINED]: PlanTypeSelection,
  [ImportStep.SERVICE_TYPE_SELECTED]: ServiceSelection,
  [ImportStep.PLAN_SELECTED]: FinaliseImport
};

export const ImportForm = () => {
  const currentStep: ImportStep = useCurrentStepSelector();

  const CurrentPage = Pages[currentStep];

  return <CurrentPage />;
};
