import { useDispatch } from "react-redux";
import { Box, Button, ButtonGroup } from "@mui/material";

import type { ItemType } from "../../itemTypes/interfaces";

import { selectors as itemTypeSelectors } from '../../itemTypes';
import { actions as dialogActions } from '../../dialogs';
import { addItem } from "../slice";

interface Props {
  planID: string
}

export const AddItemButtons = ({ planID }: Props) => {

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
      <ButtonGroup
        fullWidth
        orientation='vertical'
      >
        {
          Object.values(allTypes).map(
            (t: ItemType) => (
              <Button
                fullWidth
                key={t.id}
                onClick={() => addItemToPlan(t)}
                variant='contained'
              >
                { t.name }
              </Button>
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
