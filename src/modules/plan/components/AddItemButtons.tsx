import { useDispatch } from "react-redux";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";

import type { ItemType } from "../../itemTypes";

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
        { itemType.isSectionHeading && !itemType.fixedName ? 'Heading' : 'Item' }
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

  const showManageTypesDialog = () => {
    dispatch(dialogActions.show('manageItemTypes'));
  };

  const addItemToPlan = (type: ItemType) => {
    dispatch(addItem({ planID, type }));
  };

  const allTypes: ItemType[] = itemTypeSelectors.allItemTypes();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 32px)',
        minHeight: 0,
        padding: 2
      }}
    >
      <Typography variant='h6'>Add items to plan</Typography>
      <Typography sx={{ mb: 2 }}>
        Click or drag into the plan to add items
      </Typography>
      <ButtonGroup
        fullWidth
        orientation='vertical'
        sx={{
          flexGrow: 1,
          minHeight: 0,
          overflowY: 'auto'
        }}
      >
        {
          Object.values(allTypes).sort(
            (a, b) => a.name.localeCompare(b.name)
          ).map(
            (t: ItemType) => (
              <AddItem
                itemType={t}
                key={t.id}
                onClick={() => addItemToPlan(t)}
              />
            )
          )
        }
      </ButtonGroup>
      <ButtonGroup fullWidth>
        <Button
          onClick={showNewTypeDialog}
          sx={{
            my: 0.5
          }}
        >
          Add item type
        </Button>
        <Button
          onClick={showManageTypesDialog}
          sx={{
            my: 0.5
          }}
        >
          Manage item types
        </Button>
      </ButtonGroup>
    </Box>
  );
};
