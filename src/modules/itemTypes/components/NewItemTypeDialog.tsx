import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
  FormControlLabel,
  Switch,
  TextField
} from '@mui/material';

import { actions as dialogActions, selectors as dialogSelectors } from '../../dialogs';
import { addNew } from '../slice';
import { ColorPicker } from '../../../components/ColorPicker';
import type { NewItemType } from '../interfaces';



export const NewItemTypeDialog = () => {

  const currentDialog = dialogSelectors.useActiveDialog();
  const isOpen = currentDialog === 'newItemType';
  const dispatch = useDispatch();

  const [it, setIt] = useState<NewItemType>({ name: '', color: '#ffffff', isSectionHeading: false });

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
        <FormControlLabel
          control={
            <Switch
              onChange={e => setIt(i => ({ ...i, isSectionHeading: e.target.checked }))}
              value={it.isSectionHeading}
            />
          }
          label="This is a section heading"
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
