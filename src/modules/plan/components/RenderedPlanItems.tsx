import styled from "styled-components";
import { ItemType } from "../../itemTypes/interfaces";
import { allItemTypes } from "../../itemTypes/selectors";
import { Item } from "../interfaces";

interface Props {
  items: Item[]
}

const ItemsTable = styled.table`

  border: 1px solid black;
  border-collapse: collapse;
  width: 100%;

  margin-top: ${ props => props.theme.spacing(4) };

  font-family: Arial, sans-serif;

  & td {
    border: 1px solid black;
    padding: ${props => props.theme.spacing(1)};
  }

`;

const ItemRow = ({ item, type }: { item: Item, type: ItemType }) => {

  const typeStyle = { backgroundColor: type.color, fontWeight: 'bold' };

  return (
    <tr>
      <td></td>
      <td style={typeStyle}>
        {
          type.name
        }
      </td>
      <td style={typeStyle}>
        {item.name}
      </td>
      <td>
        {item.remark}
      </td>
    </tr>
  );
};

export const RenderedPlanItems = ({ items }: Props) => {

  const itemTypes = allItemTypes();

  return (
    <ItemsTable>
      <colgroup>
        <col width='10%' />
        <col width='15%' />
        <col />
        <col width='15%' />
      </colgroup>
      <tbody>
        {
          items.map(
            (item, idx) => (
              <ItemRow
                item={item}
                key={idx}
                type={itemTypes[item.type]}
              />
            )
          )
        }
      </tbody>
    </ItemsTable>
  );
};
