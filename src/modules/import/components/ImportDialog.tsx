import { Dialog } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { actions as dialogActions, selectors as dialogSelectors } from '../../dialogs';
import { ImportForm } from "./ImportForm";

export const ImportDialog = () => {
  const dispatch = useDispatch();
  const currentDialog = dialogSelectors.useActiveDialog();
  const isOpen = currentDialog === 'import';

  const close = useCallback(
    () => {
      dispatch(dialogActions.hide());
    },
    []
  );

  return (
    <Dialog
      fullWidth
      onClose={close}
      open={isOpen}
    >
      <ImportForm />
    </Dialog>
  );
};
