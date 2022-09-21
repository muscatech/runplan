import { useDispatch } from "react-redux";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";

import type { ItemType } from "../../itemTypes/interfaces";

import { selectors as itemTypeSelectors } from '../../itemTypes';
import { actions as dialogActions } from '../../dialogs';
import { addItem } from "../slice";
import { useDrag } from "react-dnd";

interface AddItemProps {
  itemType: ItemType,
  onClick?: () => void
}

const AddItem = ({ itemType, onClick }: AddItemProps): JSX.Element => {

  const [, drag] = useDrag(() => ({
    type: 'NEW_ITEM_OF_TYPE',
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    item: () => ({
      itemType
    })
  }));

  return (
    <Button
      fullWidth
      onClick={onClick}
      ref={drag}
      variant='contained'
    >
      { itemType.name }
    </Button>
  );
};

interface AddItemButtonsProps {
  planID: string
}

export const AddItemButtons = ({ planID }: AddItemButtonsProps) => {

  const dispatch = useDispatch();

  const showNewTypeDialog = () => {
    dispatch(dialogActions.show('newItemType'));
  };

  const addItemToPlan = (type: ItemType) => {
    dispatch(addItem({ planID, type }));
  };

  const allTypes: ItemType[] = itemTypeSelectors.allItemTypes();

  return (
    <Box
      sx={{
        padding: 2
      }}
    >
      <Typography sx={{ mb: 2 }}>
        Click or drag into the plan to add items
      </Typography>
      <ButtonGroup
        fullWidth
        orientation='vertical'
      >
        {
          Object.values(allTypes).map(
            (t: ItemType) => (
              <AddItem
                itemType={t}
                key={t.id}
                onClick={() => addItemToPlan(t)}
              />
            )
          )
        }
        <Button
          onClick={showNewTypeDialog}
        >
          Add item type
        </Button>
      </ButtonGroup>

    </Box>
  );
};
