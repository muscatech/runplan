import { useCallback, useRef } from "react";
import { Typography } from "@mui/material";
import { useDrag } from "react-dnd";


import { EditableText } from "../../../components/EditableText";
import { ItemType } from "../../itemTypes/interfaces";
import type { Item } from "../interfaces";
import { useDroppableRow } from "../functions";
import { ItemAssignment } from "./ItemAssignment";

const ITEM_CELL_PADDING = 0.5;

const createTypeStyle = (type: ItemType) =>  ({ backgroundColor: type.color, fontWeight: 'bold' });

const TYPOGRAPHY_STYLE = {
  fontFamily: 'inherit',
  fontWeight: 'inherit',
  padding: ITEM_CELL_PADDING
};

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

  const ref = useRef<HTMLTableRowElement>(null);

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

  const [{ handlerId }, drop] = useDroppableRow(ref, index, onInsert, onMove);

  drag(drop(ref));

  const updateItem = useCallback(
    (newAttrs: Partial<Item>={}) => {
      onUpdate(index, { ...item, ...newAttrs });
    },
    [index, item]
  );

  const typeStyle = createTypeStyle(type);

  return (
    <tr
      data-handler-id={handlerId}
      ref={ref}
      style={{
        opacity: isDragging ? 0.1 : 1
      }}
    >
      <td style={typeStyle}>
        <ItemAssignment
          item={item}
          onUpdate={updateItem}
        />
      </td>
      {
        !type.isSectionHeading && (
          <td style={typeStyle}>
            <Typography sx={TYPOGRAPHY_STYLE}>
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
          edit={item.isNew && editable && !type.fixedName}
          locked={!editable || isDragging || type.fixedName}
          onChange={(newName) => updateItem({ name: newName })}
          sx={TYPOGRAPHY_STYLE}
          value={type.fixedName ? type.name : item.name}
        />
      </td>
      <td>
        <EditableText
          locked={!editable || isDragging}
          onChange={(newRemark) => updateItem({ remark: newRemark })}
          sx={TYPOGRAPHY_STYLE}
          value={item.remark || ''}
        />
      </td>
    </tr>
  );
};
