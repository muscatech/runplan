import { useCallback, useRef } from "react";
import { Typography } from "@mui/material";
import { useDrag } from "react-dnd";


import { EditableText } from "../../../components/EditableText";
import { ItemType } from "../../itemTypes/interfaces";
import type { Item } from "../interfaces";
import { useDroppableRow } from "../functions";

const ITEM_CELL_PADDING = 0.5;

interface RenderedPlanItemProps {
  editable?: boolean,
  index: number,
  item: Item,
  onInsert: (index: number, itemType: ItemType) => void,
  onMove: (itemID: string, newIndex: number) => void,
  onUpdate: (index: number, item: Item) => void,
  type: ItemType
}

export const RenderedPlanItem = ({ editable, index, item, onInsert, onMove, onUpdate, type }: RenderedPlanItemProps) => {

  const typeStyle = { backgroundColor: type.color, fontWeight: 'bold' };
  const typographyStyle = {
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    padding: ITEM_CELL_PADDING
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EXISTING_ITEM',
    canDrag: () => !!editable,
    collect: (monitor) => ({
      isDragging: monitor.isDragging() && monitor.getItem()?.id === item.id
    }),
    item: () => ({
      id: item.id,
      index
    })
  }));

  const ref = useRef<HTMLTableRowElement>(null);

  const [{ handlerId }, drop] = useDroppableRow(ref, index, onInsert, onMove);

  drag(drop(ref));

  const updateItem = useCallback(
    (newAttrs: object={}) => {
      onUpdate(index, { ...item, ...newAttrs });
    },
    [index, item]
  );

  return (
    <tr
      data-handler-id={handlerId}
      ref={ref}
      style={{
        opacity: isDragging ? 0.1 : 1
      }}
    >
      <td style={typeStyle}></td>
      {
        !type.isSectionHeading && (
          <td style={typeStyle}>
            <Typography sx={typographyStyle}>
              { type.name }
            </Typography>
          </td>
        )
      }
      <td
        colSpan={type.isSectionHeading ? 2 : undefined}
        style={typeStyle}
      >
        <EditableText
          edit={item.isNew && editable}
          locked={!editable || isDragging}
          onChange={(newName) => updateItem({ name: newName })}
          sx={typographyStyle}
          value={item.name}
        />
      </td>
      <td>
        <EditableText
          locked={!editable || isDragging}
          onChange={(newRemark) => updateItem({ remark: newRemark })}
          sx={typographyStyle}
          value={item.remark || ''}
        />
      </td>
    </tr>
  );
};
