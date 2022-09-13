import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import type { Plan } from "../interfaces";
import { RenderedPlanItems } from "./RenderedPlanItems";

interface Props {
  plan: Plan
}

const PlanName = styled(Typography)({
  textAlign: 'right'
});

export const RenderedPlan = ({ plan }: Props): JSX.Element => {
  return (
    <Paper
      sx={{
        minHeight: '80vh',
        padding: [2, 8]
      }}
    >
      <PlanName variant="h4">
        {plan.name}
      </PlanName>
      <RenderedPlanItems items={plan.items} />
    </Paper>
  );
};
