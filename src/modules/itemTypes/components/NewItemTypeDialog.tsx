import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  TextField
} from '@mui/material';

import { actions as dialogActions, selectors as dialogSelectors } from '../../dialogs';
import { addNew } from '../slice';
import { ColorPicker } from '../../../components/ColorPicker';
import type { NewItemType } from '../interfaces';

const NEW_ITEM_TYPE: NewItemType = { name: '', color: '#ffffff', isSectionHeading: false, fixedName: false };

export const NewItemTypeDialog = () => {

  const currentDialog = dialogSelectors.useActiveDialog();
  const isOpen = currentDialog === 'newItemType';
  const dispatch = useDispatch();

  const [it, setIt] = useState<NewItemType>(NEW_ITEM_TYPE);

  const close = () => {
    dispatch(dialogActions.hide());
    setIt(NEW_ITEM_TYPE);
  };

  const submit = () => {
    dispatch(addNew(it));
    close();
  };

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && it.name && it.color !== '') {
      submit();
    }
  };

  return (
    <Dialog
      fullWidth
      onClose={close}
      onKeyUp={handleKeypress}
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
        <Stack direction='row'>
          <FormControlLabel
            control={
              <Switch
                checked={it.isSectionHeading}
                onChange={e => setIt(i => ({ ...i, isSectionHeading: e.target.checked, fixedName: i.fixedName && e.target.checked }))}
              />
            }
            label="This is a section heading"
          />
          <FormControlLabel
            control={
              <Switch
                checked={it.isSectionHeading && it.fixedName}
                disabled={!it.isSectionHeading}
                onChange={e => setIt(i => ({ ...i, fixedName: e.target.checked }))}
              />
            }
            label="Always use type name as item name"
          />
        </Stack>
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
