import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
  TextField
} from '@mui/material';

import { actions as dialogActions, selectors as dialogSelectors } from '../../dialogs';
import { createNew } from '../slice';

export const NewPlanDialog = () => {

  const currentDialog = dialogSelectors.useActiveDialog();
  const isOpen = currentDialog === 'newPlan';
  const dispatch = useDispatch();

  const [planName, setPlanName] = useState('');

  const close = () => {
    dispatch(dialogActions.hide());
    setPlanName('');
  };

  const submit = () => {
    dispatch(createNew(planName));
    close();
  };

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && planName !== '') {
      submit();
    }
  };

  return (
    <Dialog
      fullWidth
      onClose={close}
      open={isOpen}
    >
      <DialogTitle>Create new plan</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label='Plan name'
          margin="dense"
          onChange={e => setPlanName(e.target.value)}
          onKeyUp={handleKeypress}
          required
          value={planName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button
          disabled={!planName}
          onClick={submit}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
