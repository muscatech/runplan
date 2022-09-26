import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useDispatch } from "react-redux";

import type { ItemType } from "../interfaces";
import { deleteType } from "../slice";

interface Props {
  pendingDelete: ItemType | null,
  setPendingDelete: (itemType: ItemType | null) => void
}

export const DeleteConfirmationDialog = ({ pendingDelete, setPendingDelete }: Props) => {
  const close = () => setPendingDelete(null);

  const dispatch = useDispatch();

  const doDeletion = () => {
    const id = pendingDelete?.id;
    close();
    id && dispatch(deleteType(id));
  };

  return (
    <Dialog
      components={{
        Backdrop: undefined
      }}
      onClose={close}
      open={!!pendingDelete}
    >
      <DialogTitle>Delete item type?</DialogTitle>
      <DialogContent>
        Do you really want to delete <strong>{pendingDelete?.name}?</strong>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>No, don&apos;t delete</Button>
        <Button
          color='error'
          onClick={doDeletion}
          variant='contained'
        >
          Yes, delete it
        </Button>
      </DialogActions>
    </Dialog>
  );
};
