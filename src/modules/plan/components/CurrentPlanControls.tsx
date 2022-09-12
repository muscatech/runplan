import type { Plan } from "../interfaces";

interface Props {
  plan: Plan
}

export const CurrentPlanControls = ({ plan }: Props) : JSX.Element => {
  return <p>{plan.name}</p>
}
