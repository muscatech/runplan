import { Paper, TextField } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import type { Plan } from "../interfaces";
import { updatePlan } from "../slice";

interface Props {
  plan: Plan
}

export const CurrentPlanControls = ({ plan }: Props) : JSX.Element => {

  const dispatch = useDispatch();

  const handleUpdate = useCallback(
    (partialPlan: Record<string, unknown>) => {
      dispatch(
        updatePlan({
          ...plan,
          ...partialPlan
        })
      );
    },
    []
  );

  return (
    <Paper>
      <TextField
        fullWidth
        label='Plan name'
        margin="dense"
        onChange={(e) => handleUpdate({ name: e.target.value })}
        value={plan.name}
      />
    </Paper>
  );
};
