import { Typography } from "@mui/material";
import { EditableText } from "../../../components/EditableText";
import { ItemType } from "../../itemTypes/interfaces";
import type { Item } from "../interfaces";

const ITEM_CELL_PADDING = 0.5;

interface ItemRowProps {
  editable?: boolean,
  item: Item,
  onUpdate: (item: Item) => void,
  type: ItemType
}

export const RenderedPlanItem = ({ editable, item, onUpdate, type }: ItemRowProps) => {

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
          edit={item.isNew && editable}
          locked={!editable}
          onChange={(newName) => onUpdate({ ...item, name: newName })}
          sx={typographyStyle}
          value={item.name}
        />
      </td>
      <td>
        <EditableText
          locked={!editable}
          onChange={(newRemark) => onUpdate({ ...item, remark: newRemark })}
          sx={typographyStyle}
          value={item.remark || ''}
        />
      </td>
    </tr>
  );
};
