import { Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import dayjs from 'dayjs';

import { EditableDate } from "../../../components/EditableDate";
import { EditableText } from "../../../components/EditableText";
import type { ItemType } from "../../itemTypes";
import type { Item, Plan } from "../interfaces";
import { addItem, movePlanItem, updatePlan, updatePlanItem } from "../slice";
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
        onChange={(newName) => newName !== '' && commitUpdate({ ...plan, name: String(newName) })}
        sx={{ textAlign: 'right', width: '100%' }}
        value={plan.name}
        variant="h4"
      />
      <EditableDate
        dateFormat='D MMMM YYYY'
        locked={!editable}
        onChange={d => commitUpdate({ ...plan, date: (!d || typeof d === 'string') ? undefined : d })}
        sx={{ textAlign: 'right', width: '100%' }}
        value={plan.date ? dayjs(plan.date * 1000) : undefined}
        variant='h5'
      />
      <RenderedPlanItems
        editable={editable}
        items={plan.items}
        onAddItem={(idx: number, itemType: ItemType) => {
          dispatch(addItem({ planID: plan.id, type: itemType, index: idx }));
        }}
        onMoveItem={(itemID: string, toIdx: number) => {
          dispatch(movePlanItem({ planID: plan.id, sourceID: itemID, destinationIndex: toIdx }));
        }}
        onUpdate={(idx: number, item: Item) => dispatch(updatePlanItem({ planID: plan.id, itemIndex: idx, item }))}
      />
    </Paper>
  );
};
