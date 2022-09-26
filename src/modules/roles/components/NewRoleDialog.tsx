import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { actions as dialogActions, selectors as dialogSelectors } from '../../dialogs';
import { NEW_ROLE_DIALOG, RoleCategory } from '../constants';
import { NewRole } from '../interfaces';
import { RoleEditForm } from './RoleEditForm';
import { addRole } from '../slice';

const NEW_ROLE = {
  name: '',
  category: RoleCategory.Band
};

export const NewRoleDialog = () => {

  const [workingCopy, setWorkingCopy] = useState<NewRole>(NEW_ROLE);

  const currentDialog = dialogSelectors.useActiveDialog();
  const isOpen = currentDialog === NEW_ROLE_DIALOG;
  const dispatch = useDispatch();

  const close = () => {
    dispatch(dialogActions.hide());
    setWorkingCopy(NEW_ROLE);
  };

  const submit = () => {
    const newRole = { ...workingCopy };
    close();
    dispatch(addRole(newRole));
  };

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && workingCopy.name !== '') {
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
      <DialogTitle>Create new role</DialogTitle>
      <DialogContent>
        <RoleEditForm
          onChange={(attrs) => setWorkingCopy(wc => ({ ...wc, ...attrs }))}
          role={workingCopy}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button
          disabled={workingCopy.name === ''}
          onClick={submit}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
