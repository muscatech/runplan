import styled from "styled-components";
import { allItemTypes } from "../../itemTypes/selectors";
import { Item } from "../interfaces";
import { RenderedPlanItem } from "./RenderedPlanItem";

interface Props {
  editable?: boolean,
  items: Item[],
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

export const RenderedPlanItems = ({ editable, items, onMoveItem, onUpdate }: Props) => {

  const itemTypes = allItemTypes();

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
