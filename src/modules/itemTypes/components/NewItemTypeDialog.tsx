import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';

import { actions as dialogActions, selectors as dialogSelectors } from '../../dialogs';
import { addNew } from '../slice';
import type { NewItemType } from '../interfaces';
import { EditItemTypeForm } from './EditItemTypeForm';

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
        <EditItemTypeForm
          itemType={it}
          onChange={(i: Partial<NewItemType>) => setIt( (oldIt: NewItemType) => ({ ...oldIt, ...i }))}
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
