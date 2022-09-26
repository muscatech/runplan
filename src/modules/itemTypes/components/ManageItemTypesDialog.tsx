import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import { actions as dialogActions, selectors as dialogSelectors } from '../../dialogs';
import { allItemTypes } from '../selectors';
import type { ItemType } from '../interfaces';
import { deleteType } from '../slice';

interface TypeEntryButtonsProps {
  onDelete: () => void
}

const TypeEntryButtons = ({ onDelete }: TypeEntryButtonsProps) => {
  return (
    <ButtonGroup>
      <IconButton title='Edit'>
        <Edit />
      </IconButton>
      <IconButton
        color='error'
        onClick={onDelete}
        title='Delete'
      >
        <Delete />
      </IconButton>
    </ButtonGroup>
  );
};

interface TypeEntryProps {
  itemType: ItemType,
  onDelete: (itemType: ItemType) => void
}

const TypeEntry = ({ itemType, onDelete }: TypeEntryProps) => {
  return (
    <ListItem
      secondaryAction={(
        <TypeEntryButtons
          onDelete={() => onDelete(itemType)}
        />
      )}
      sx={{
        backgroundColor: itemType.color,
        fontWeight: 'bold'
      }}
    >
      {itemType.name}
    </ListItem>
  );
};

interface DeleteConfirmationDialogProps {
  pendingDelete: ItemType | null,
  setPendingDelete: (itemType: ItemType | null) => void
}

const DeleteConfirmationDialog = ({ pendingDelete, setPendingDelete }: DeleteConfirmationDialogProps) => {
  const close = () => setPendingDelete(null);

  const dispatch = useDispatch();

  const doDeletion = () => {
    const id = pendingDelete?.id;
    close();
    id && dispatch(deleteType(id));
  };

  return (
    <Dialog
      components={{
        Backdrop: undefined
      }}
      onClose={close}
      open={!!pendingDelete}
    >
      <DialogTitle>Delete item type?</DialogTitle>
      <DialogContent>
        Do you really want to delete <strong>{pendingDelete?.name}?</strong>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>No, don&apos;t delete</Button>
        <Button
          color='error'
          onClick={doDeletion}
          variant='contained'
        >
          Yes, delete it
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const ManageItemTypesDialog = () => {
  const currentDialog = dialogSelectors.useActiveDialog();
  const isOpen = currentDialog === 'manageItemTypes';
  const dispatch = useDispatch();

  const allTypes: ItemType[] = Object.values(allItemTypes());

  const [pendingDelete, setPendingDelete] = useState<ItemType | null>(null);

  const close = () => {
    dispatch(dialogActions.hide());
  };

  return (
    <Dialog
      fullWidth
      onClose={close}
      open={isOpen}
      scroll='paper'
    >
      <DialogTitle>Manage item types</DialogTitle>
      <DialogContent>
        <List>
          {
            allTypes.map(
              it => (
                <TypeEntry
                  itemType={it}
                  key={it.id}
                  onDelete={setPendingDelete}
                />
              )
            )
          }
        </List>
        <DeleteConfirmationDialog
          pendingDelete={pendingDelete}
          setPendingDelete={setPendingDelete}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
