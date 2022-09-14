import { Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { EditableText } from "../../../components/EditableText";
import type { Item, Plan } from "../interfaces";
import { updatePlan } from "../slice";
import { RenderedPlanItems } from "./RenderedPlanItems";

interface Props {
  plan: Plan
}

export const RenderedPlan = ({ plan }: Props): JSX.Element => {

  const dispatch = useDispatch();
  const commitUpdate = (plan: Plan) => dispatch(updatePlan(plan));

  return (
    <Paper
      sx={{
        minHeight: '80vh',
        padding: [2, 8]
      }}
    >
      <EditableText
        onChange={(newName) => commitUpdate({ ...plan, name: newName })}
        sx={{ textAlign: 'right', width: '100%' }}
        value={plan.name}
        variant="h4"
      />
      <RenderedPlanItems
        items={plan.items}
        onUpdate={(newItems: Item[]) => commitUpdate({ ...plan, items: newItems })}
      />
    </Paper>
  );
};
