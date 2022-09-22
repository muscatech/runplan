import { useDispatch } from "react-redux";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";

import type { ItemType } from "../../itemTypes/interfaces";

import { selectors as itemTypeSelectors } from '../../itemTypes';
import { actions as dialogActions } from '../../dialogs';
import { addItem } from "../slice";
import { useDrag } from "react-dnd";
import styled from "styled-components";

interface AddItemProps {
  itemType: ItemType,
  onClick?: () => void
}

const AddItemInner = styled.div`
  padding: ${ props => props.theme.spacing(1) };
  border: 1px solid black;
  margin: ${ props => props.theme.spacing(0.25) };
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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
    <AddItemInner
      onClick={onClick}
      ref={drag}
      style={{ backgroundColor: itemType.color }}
    >
      { itemType.name }
      <Typography
        sx={{ color: 'text.secondary', lineHeight: 1 }}
        variant='overline'
      >
        { itemType.isSectionHeading ? 'Heading' : 'Item' }
      </Typography>
    </AddItemInner>
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
          sx={{
            my: 0.5
          }}
        >
          Add item type
        </Button>
      </ButtonGroup>

    </Box>
  );
};
