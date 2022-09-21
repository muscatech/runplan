import { useCallback, useRef } from "react";
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
  onInsert: (index: number, itemType: ItemType) => void,
  onMove: (oldIndex: number, newIndex: number) => void,
  onUpdate: (index: number, item: Item) => void,
  type: ItemType
}

interface DragItem {
  index: number
  id: string
  type: string,
  itemType?: ItemType
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

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ['EXISTING_ITEM', 'NEW_ITEM_OF_TYPE'],
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
    drop(item: DragItem, monitor) {
      if (monitor.getItemType() === 'NEW_ITEM_OF_TYPE') {
        const droppedItem = monitor.getItem();
        if (droppedItem.itemType) {
          onInsert(index, droppedItem.itemType);
        }
      }
    }
  });

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
