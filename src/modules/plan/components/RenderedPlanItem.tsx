import { useRef } from "react";
import { Typography } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from 'dnd-core';

import { EditableText } from "../../../components/EditableText";
import { ItemType } from "../../itemTypes/interfaces";
import type { Item } from "../interfaces";

const ITEM_CELL_PADDING = 0.5;

interface RenderedPlanItemProps {
  editable?: boolean,
  index: number,
  item: Item,
  onMove: (oldIndex: number, newIndex: number) => void,
  onUpdate: (index: number, item: Item) => void,
  type: ItemType
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const RenderedPlanItem = ({ editable, index, item, onMove, onUpdate, type }: RenderedPlanItemProps) => {

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
      isDragging: !!monitor.isDragging()
    }),
    item: () => ({
      index
    })
  }));

  const ref = useRef<HTMLTableRowElement>(null);

  const [, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ['EXISTING_ITEM'],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }

      if (monitor.getItemType() === 'EXISTING_ITEM') {
        const dragIndex = item.index;
        const hoverIndex = index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        // Time to actually perform the action
        onMove(dragIndex, hoverIndex);

        item.index = hoverIndex;
      }


    },
  });

  drag(drop(ref));

  return (
    <tr
      ref={ref}
      style={{
        opacity: isDragging ? 0.1 : 1
      }}
    >
      <td></td>
      <td style={typeStyle}>
        <Typography sx={typographyStyle}>
          { type.name }
        </Typography>
      </td>
      <td style={typeStyle}>
        <EditableText
          edit={item.isNew && editable}
          locked={!editable || isDragging}
          onChange={(newName) => onUpdate(index, { ...item, name: newName })}
          sx={typographyStyle}
          value={item.name}
        />
      </td>
      <td>
        <EditableText
          locked={!editable || isDragging}
          onChange={(newRemark) => onUpdate(index, { ...item, remark: newRemark })}
          sx={typographyStyle}
          value={item.remark || ''}
        />
      </td>
    </tr>
  );
};
