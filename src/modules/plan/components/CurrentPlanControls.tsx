import { Box, Paper, TextField } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import type { Plan } from "../interfaces";
import { updatePlan } from "../slice";
import { AddItemButton } from "./AddItemButton";

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
    <Paper
      sx={{
        height: '100%',
      }}
    >
      <Box
        sx={{
          padding: 2
        }}
      >
        <TextField
          fullWidth
          label='Plan name'
          margin="dense"
          onChange={(e) => handleUpdate({ name: e.target.value })}
          value={plan.name}
        />
        <AddItemButton planID={plan.id} />
      </Box>
    </Paper>
  );
};
