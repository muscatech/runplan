import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
  TextField
} from '@mui/material';

import { actions as dialogActions, selectors as dialogSelectors } from '../../dialogs';
import { addNew } from '../slice';

export const NewItemTypeDialog = () => {

  const currentDialog = dialogSelectors.useActiveDialog();
  const isOpen = currentDialog === 'newItemType';
  const dispatch = useDispatch();

  const [it, setIt] = useState({ name: '', color: 'white' });

  const close = () => {
    dispatch(dialogActions.hide());
  };

  const submit = () => {
    dispatch(addNew(it));
    close();
  };

  return (
    <Dialog
      fullWidth
      onClose={close}
      open={isOpen}
    >
      <DialogTitle>Create new item type</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label='Item type name'
          margin="dense"
          onChange={e => setIt(i => ({ ...i, name: e.target.value }))}
          required
          value={it.name}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button
          disabled={!it.name || !it.color}
          onClick={submit}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
