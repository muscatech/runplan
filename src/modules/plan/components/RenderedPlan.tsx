import { Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import dayjs from 'dayjs';

import { EditableDate } from "../../../components/EditableDate";
import { EditableText } from "../../../components/EditableText";
import type { ItemType } from "../../itemTypes";
import type { Item, Person, Plan } from "../interfaces";
import { addItem, movePlanItem, updatePerson, updatePlan, updatePlanItem } from "../slice";
import { RenderedPlanItems } from "./RenderedPlanItems";
import { RenderedPlanPeople } from "./RenderedPlanPeople";
import { PlanContextProvider } from "../context";

interface Props {
  additionalTypes?: ItemType[],
  editable?: boolean,
  plan: Plan
}

export const RenderedPlan = ({ additionalTypes, editable, plan }: Props): JSX.Element => {

  const dispatch = useDispatch();
  const commitUpdate = (plan: Plan) => dispatch(updatePlan(plan));

  return (
    <PlanContextProvider value={plan}>
      <Paper
        sx={{
          minHeight: '60vh',
          fontSize: '11pt',
          padding: [2, 8],
          '@media print': {
            boxShadow: 0,
            padding: 0
          },
          maxWidth: '210mm'
        }}
      >
        <EditableText
          locked={!editable}
          onChange={(newName) => newName !== '' && commitUpdate({ ...plan, name: String(newName) })}
          sx={{ textAlign: 'right', width: '100%' }}
          value={plan.name}
          variant="h5"
        />
        <EditableDate
          dateFormat='D MMMM YYYY'
          locked={!editable}
          onChange={d => commitUpdate({ ...plan, date: (!d || typeof d === 'string') ? undefined : d })}
          sx={{ textAlign: 'right', width: '100%' }}
          value={plan.date ? dayjs(plan.date * 1000) : undefined}
          variant='h5'
        />
        <RenderedPlanPeople
          editable={editable}
          onUpdate={(p: Person) => dispatch(updatePerson({ planID: plan.id, person: p }))}
          people={plan.people}
        />
        <RenderedPlanItems
          additionalTypes={additionalTypes}
          editable={editable}
          onAddItem={(idx: number, itemType: ItemType) => {
            dispatch(addItem({ planID: plan.id, type: itemType, index: idx }));
          }}
          onMoveItem={(itemID: string, toIdx: number) => {
            dispatch(movePlanItem({ planID: plan.id, sourceID: itemID, destinationIndex: toIdx }));
          }}
          onUpdate={(idx: number, item: Item) => dispatch(updatePlanItem({ planID: plan.id, itemIndex: idx, item }))}
        />
      </Paper>
    </PlanContextProvider>
  );
};
