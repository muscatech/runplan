import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';

import { actions as dialogActions, selectors as dialogSelectors } from '../../dialogs';
import { PlanChooser } from './PlanChooser';
import { choosePlan } from '../slice';

export const ChoosePlanDialog = () => {

  const currentDialog = dialogSelectors.useActiveDialog();
  const isOpen = currentDialog === 'choosePlan';
  const dispatch = useDispatch();


  const close = () => {
    dispatch(dialogActions.hide());
  };

  const handleSelect = (planID: string) => {
    dispatch(choosePlan(planID));
    close();
  };

  return (
    <Dialog
      fullWidth
      maxWidth='xl'
      onClose={close}
      open={isOpen}
      scroll='paper'
    >
      <DialogTitle>Plans</DialogTitle>
      <DialogContent>
        <PlanChooser
          onSelect={handleSelect}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
