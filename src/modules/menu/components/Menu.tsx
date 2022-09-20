import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';

import { actions } from '../../dialogs';

export const Menu = () => {
  const dispatch = useDispatch();
  const newPlan = useCallback(
    () => {
      dispatch(actions.show('newPlan'));
    },
    []
  );

  const sendPrintMessage = useCallback(
    () => {
      window.postMessage({
        type: 'RUNPLAN_PRINT'
      }, '*');
    },
    []
  );

  return (
    <>
      <Button
        onClick={newPlan}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        New plan
      </Button>
      <Button
        onClick={sendPrintMessage}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        Print
      </Button>
    </>
  );
};
