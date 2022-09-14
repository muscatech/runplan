import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
  TextField
} from '@mui/material';

import { actions as dialogActions, selectors as dialogSelectors } from '../../dialogs';
import { addNew } from '../slice';
import { ColorPicker } from '../../../components/ColorPicker';



export const NewItemTypeDialog = () => {

  const currentDialog = dialogSelectors.useActiveDialog();
  const isOpen = currentDialog === 'newItemType';
  const dispatch = useDispatch();

  const [it, setIt] = useState({ name: '', color: '#ffffff' });

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
          sx={{
            backgroundColor: it.color
          }}
          value={it.name}
        />
        <ColorPicker
          onChange={c => setIt(i => ({ ...i, color: c }))}
          value={it.color}
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
