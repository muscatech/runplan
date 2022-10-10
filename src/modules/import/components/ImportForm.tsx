import { useCurrentStepSelector } from "../selectors";
import { ImportStep } from "../types";
import { LoginPage } from "./LoginPage";
import { PlanTypeSelection } from "./PlanTypeSelection";

const Pages: Record<string, () => JSX.Element> = {
  [ImportStep.NOT_STARTED]: LoginPage,
  [ImportStep.BEGIN]: LoginPage,
  [ImportStep.AUTH_TOKEN_OBTAINED]: PlanTypeSelection
};

export const ImportForm = () => {
  const currentStep: ImportStep = useCurrentStepSelector();

  const CurrentPage = Pages[currentStep];

  return <CurrentPage />;
};
