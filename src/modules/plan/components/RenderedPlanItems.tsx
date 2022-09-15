import { Typography } from "@mui/material";
import styled from "styled-components";
import { EditableText } from "../../../components/EditableText";
import { ItemType } from "../../itemTypes/interfaces";
import { allItemTypes } from "../../itemTypes/selectors";
import { Item } from "../interfaces";

interface Props {
  items: Item[],
  onUpdate?: (items: Item[]) => void
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

const ITEM_CELL_PADDING = 0.5;

const ItemRow = ({ item, onUpdate, type }: { item: Item, onUpdate: (item: Item) => void, type: ItemType }) => {

  const typeStyle = { backgroundColor: type.color, fontWeight: 'bold' };
  const typographyStyle = {
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    padding: ITEM_CELL_PADDING
  };

  return (
    <tr>
      <td></td>
      <td style={typeStyle}>
        <Typography sx={typographyStyle}>
          { type.name }
        </Typography>
      </td>
      <td style={typeStyle}>
        <EditableText
          edit={item.isNew}
          onChange={(newName) => onUpdate({ ...item, name: newName })}
          sx={typographyStyle}
          value={item.name}
        />
      </td>
      <td>
        <EditableText
          onChange={(newRemark) => onUpdate({ ...item, remark: newRemark })}
          sx={typographyStyle}
          value={item.remark || ''}
        />
      </td>
    </tr>
  );
};

export const RenderedPlanItems = ({ items, onUpdate }: Props) => {

  const itemTypes = allItemTypes();

  const updateItem = (idx: number) => (newItem: Item) => {
    if (onUpdate) {
      const newItems = [...items];
      delete newItem.isNew;
      if (newItem.name) {
        newItems.splice(idx, 1, newItem);
      }
      else {
        newItems.splice(idx, 1);
      }
      onUpdate(newItems);
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
              <ItemRow
                item={item}
                key={idx}
                onUpdate={updateItem(idx)}
                type={itemTypes[item.type]}
              />
            )
          )
        }
      </tbody>
    </ItemsTable>
  );
};
