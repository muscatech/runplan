import { Dialog } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { actions as dialogActions, selectors as dialogSelectors } from '../../dialogs';
import { setCurrentStep } from "../slice";
import { ImportStep } from "../types";
import { ImportForm } from "./ImportForm";

export const ImportDialog = () => {
  const dispatch = useDispatch();
  const currentDialog = dialogSelectors.useActiveDialog();
  const isOpen = currentDialog === 'import';

  const close = useCallback(
    () => {
      dispatch(dialogActions.hide());
      dispatch(setCurrentStep(ImportStep.NOT_STARTED));
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
