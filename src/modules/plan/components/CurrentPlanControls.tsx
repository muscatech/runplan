import { Paper, Typography } from "@mui/material";
import type { Plan } from "../interfaces";
import { AddItemButtons } from "./AddItemButtons";

interface Props {
  plan: Plan
}

export const CurrentPlanControls = ({ plan }: Props) : JSX.Element => {
  return (
    <Paper
      sx={{
        height: '75vh',
        padding: 2
      }}
    >
      <Typography variant='h6'>Add item to plan</Typography>
      <AddItemButtons planID={plan.id} />
    </Paper>
  );
};
