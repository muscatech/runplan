import { Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { EditableText } from "../../../components/EditableText";
import type { Item, Plan } from "../interfaces";
import { updatePlan, updatePlanItem } from "../slice";
import { RenderedPlanItems } from "./RenderedPlanItems";

interface Props {
  editable?: boolean,
  plan: Plan
}

export const RenderedPlan = ({ editable, plan }: Props): JSX.Element => {

  const dispatch = useDispatch();
  const commitUpdate = (plan: Plan) => dispatch(updatePlan(plan));

  return (
    <Paper
      sx={{
        minHeight: '60vh',
        padding: [2, 8],
        '@media print': {
          boxShadow: 0
        }
      }}
    >
      <EditableText
        locked={!editable}
        onChange={(newName) => newName !== '' && commitUpdate({ ...plan, name: newName })}
        sx={{ textAlign: 'right', width: '100%' }}
        value={plan.name}
        variant="h4"
      />
      <RenderedPlanItems
        editable={editable}
        items={plan.items}
        onUpdate={(idx: number, item: Item) => dispatch(updatePlanItem({ planID: plan.id, itemIndex: idx, item }))}
      />
    </Paper>
  );
};
