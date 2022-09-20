import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';

import { actions } from '../../dialogs';

const MenuButton = (props: ButtonProps) => (
  <Button
    sx={{ ...(props.sx || {}), my: 2, color: 'white', display: 'block' }}
    {...props}
  />
);

export const Menu = () => {
  const dispatch = useDispatch();

  const showModal = (modalName: string) => useCallback(
    () => {
      dispatch(actions.show(modalName));
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
      <MenuButton
        onClick={showModal('newPlan')}
      >
        New plan
      </MenuButton>
      <MenuButton
        onClick={showModal('choosePlan')}
      >
        Plans&hellip;
      </MenuButton>
      <MenuButton
        onClick={sendPrintMessage}
      >
        Print
      </MenuButton>
    </>
  );
};
