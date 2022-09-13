import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Divider, Menu, MenuItem } from "@mui/material";

import type { ItemType } from "../../itemTypes/interfaces";

import { selectors as itemTypeSelectors } from '../../itemTypes';
import { actions as dialogActions } from '../../dialogs';
import { addItem } from "../slice";

const ItemTypeOption = ({ it, onClick }: { it: ItemType, onClick: () => void }) => (
  <MenuItem onClick={onClick}>{it.name}</MenuItem>
);

interface Props {
  planID: string
}

export const AddItemButton = ({ planID }: Props) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const handleClose = () => setAnchorEl(null);

  const showNewTypeDialog = () => {
    dispatch(dialogActions.show('newItemType'));
    handleClose();
  };

  const addItemToPlan = (type: ItemType) => {
    dispatch(addItem({ planID, type }));
    handleClose();
  };

  const allTypes = itemTypeSelectors.allItemTypes();

  return (
    <>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        id="add-item-button"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        variant='contained'
      >
        Add item
      </Button>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'add-item-button',
        }}
        anchorEl={anchorEl}
        id="add-item-menu"
        onClose={handleClose}
        open={open}
      >
        {
          Object.values(allTypes).map(
            (t) => (
              <ItemTypeOption
                it={t}
                key={t.id}
                onClick={() => addItemToPlan(t)}
              />
            )
          )
        }
        <Divider />
        <MenuItem onClick={showNewTypeDialog}>
          New item type...
        </MenuItem>
      </Menu>
    </>
  );
};
