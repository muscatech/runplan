import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List } from '@mui/material';

import { actions as dialogActions, selectors as dialogSelectors } from '../../dialogs';
import { allItemTypes } from '../selectors';
import type { ItemType } from '../interfaces';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { TypeListEntry } from './TypeListEntry';
import { EditItemTypeDialog } from './EditItemTypeDialog';



export const ManageItemTypesDialog = () => {
  const currentDialog = dialogSelectors.useActiveDialog();
  const isOpen = currentDialog === 'manageItemTypes';
  const dispatch = useDispatch();

  const allTypes: ItemType[] = Object.values(allItemTypes());

  const [pendingDelete, setPendingDelete] = useState<ItemType | null>(null);
  const [editingType, setEditingType] = useState<ItemType | null>(null);

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
                <TypeListEntry
                  itemType={it}
                  key={it.id}
                  onDelete={setPendingDelete}
                  onEdit={setEditingType}
                />
              )
            )
          }
        </List>
        <DeleteConfirmationDialog
          pendingDelete={pendingDelete}
          setPendingDelete={setPendingDelete}
        />
        <EditItemTypeDialog
          editingType={editingType}
          setEditingType={setEditingType}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
