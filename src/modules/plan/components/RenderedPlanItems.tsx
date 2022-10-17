import { useRef } from "react";
import styled from "styled-components";

import { UnknownItemType } from "../../itemTypes";
import type { ItemType } from "../../itemTypes";
import { allItemTypes } from "../../itemTypes/selectors";
import { useDroppableRow } from "../functions";
import type { Item } from "../interfaces";
import { RenderedPlanItem } from "./RenderedPlanItem";
import { usePlan } from "../context";

interface Props {
  additionalTypes?: ItemType[],
  editable?: boolean,
  onAddItem?: (idx: number, itemType: ItemType) => void,
  onMoveItem?: (itemID: string, newIdx: number) => void,
  onUpdate?: (idx: number, item: Item) => void
}

const ItemsTable = styled.table`

  border-collapse: collapse;
  width: 100%;

  margin-top: ${ props => props.theme.spacing(2) };

  font-family: Arial, sans-serif;
  font-size: 11pt;

  & td {
    border: 1px solid black;
    vertical-align: top;
  }

`;

interface DummyRowProps {
  index: number,
  onAddItem: (idx: number, itemType: ItemType) => void,
  onMoveItem: (itemID: string, newIdx: number) => void
}

const DummyCell = styled.td.attrs({ colSpan: 4 })`
  background-color: #F5F5F5;
  border: 1px dotted #808080 !important;
  color: #808080;
  font-style: italic;
  padding: ${ props => props.theme.spacing(1) };
  text-align: center;
`;

const DummyRow = ({ index, onAddItem, onMoveItem }: DummyRowProps) => {
  const ref = useRef<HTMLTableRowElement>(null);
  const [{ handlerId }, drop] = useDroppableRow(
    ref,
    index,
    (idx, itemType) => onAddItem(idx, itemType),
    (itemID, newIdx) => onMoveItem(itemID, newIdx)
  );

  drop(ref);

  return (
    <tr
      data-handler-id={handlerId}
      ref={ref}
    >
      <DummyCell>
        Drag and drop items here
      </DummyCell>
    </tr>
  );
};

export const RenderedPlanItems = ({ additionalTypes = [], editable, onAddItem, onMoveItem, onUpdate }: Props) => {

  const plan = usePlan();

  const itemTypes = { ...allItemTypes() };
  additionalTypes.forEach(
    t => {
      itemTypes[t.id] = t;
    }
  );

  const addItem = (idx: number, itemType: ItemType) => {
    if (onAddItem) {
      onAddItem(idx, itemType);
    }
  };

  const updateItem = (idx: number, newItem: Item) => {
    if (onUpdate) {
      onUpdate(idx, newItem);
    }
  };

  const moveItem = (itemID: string, newIdx: number) => {
    if (onMoveItem) {
      onMoveItem(itemID, newIdx);
    }
  };

  return (
    <ItemsTable>
      <colgroup>
        <col width='10%' />
        <col width='15%' />
        <col width='55%' />
        <col width='20%' />
      </colgroup>
      <tbody>
        {
          (plan?.items || []).map(
            (item, idx) => (
              <RenderedPlanItem
                editable={editable}
                index={idx}
                item={item}
                key={item.id || idx}
                onInsert={addItem}
                onMove={moveItem}
                onUpdate={updateItem}
                type={itemTypes[item.type] || UnknownItemType}
              />
            )
          )
        }
        {
          editable && onAddItem && onMoveItem && (
            <DummyRow
              index={plan?.items?.length || 0}
              onAddItem={onAddItem}
              onMoveItem={onMoveItem}
            />
          )
        }
      </tbody>
    </ItemsTable>
  );
};
