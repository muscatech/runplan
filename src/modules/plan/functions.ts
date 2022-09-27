import { useDrop } from 'react-dnd';
import { v4 as uuidV4 } from 'uuid';

import type { Identifier, XYCoord } from 'dnd-core';

import type { DragItem, Plan } from './interfaces';
import { ItemType } from '../itemTypes/interfaces';
import { RefObject } from 'react';

export function createPlan(name: string, date?: number): Plan {
  const id = uuidV4();

  return {
    id,
    name,
    items: [],
    date,
    meta: {
      lastModified: Date.now()
    },
    people: []
  };
}

export const initialify = (name: string): string => {
  return name.split(/[ -]/).map(n => n[0]).join('').toUpperCase();
};

export const useDroppableRow = (
  ref: RefObject<HTMLTableRowElement>,
  index: number,
  onInsert: (index: number, itemType: ItemType) => void,
  onMove: (itemID: string, newIndex: number) => void
) => useDrop<
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
      onMove(item.id, hoverIndex);

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
