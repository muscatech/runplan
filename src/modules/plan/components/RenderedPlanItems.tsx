import styled from "styled-components";
import type { ItemType } from "../../itemTypes/interfaces";
import { allItemTypes } from "../../itemTypes/selectors";
import type { Item } from "../interfaces";
import { RenderedPlanItem } from "./RenderedPlanItem";

interface Props {
  editable?: boolean,
  items: Item[],
  onAddItem?: (idx: number, itemType: ItemType) => void,
  onMoveItem?: (oldIdx: number, newIdx: number) => void,
  onUpdate?: (idx: number, item: Item) => void
}

const ItemsTable = styled.table`

  border: 1px solid black;
  border-collapse: collapse;
  width: 100%;

  margin-top: ${ props => props.theme.spacing(4) };

  font-family: Arial, sans-serif;

  & td {
    border: 1px solid black;
    vertical-align: top;
  }

`;

export const RenderedPlanItems = ({ editable, items, onAddItem, onMoveItem, onUpdate }: Props) => {

  const itemTypes = allItemTypes();

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

  const moveItem = (oldIdx: number, newIdx: number) => {
    if (onMoveItem) {
      onMoveItem(oldIdx, newIdx);
    }
  };

  return (
    <ItemsTable>
      <colgroup>
        <col width='10%' />
        <col width='15%' />
        <col />
        <col width='20%' />
      </colgroup>
      <tbody>
        {
          items.map(
            (item, idx) => (
              <RenderedPlanItem
                editable={editable}
                index={idx}
                item={item}
                key={item.id || idx}
                onInsert={addItem}
                onMove={moveItem}
                onUpdate={updateItem}
                type={itemTypes[item.type]}
              />
            )
          )
        }
      </tbody>
    </ItemsTable>
  );
};
