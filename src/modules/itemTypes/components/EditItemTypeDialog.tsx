import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useDispatch } from "react-redux";
import { ItemType } from "../interfaces";
import { updateType } from "../slice";
import { EditItemTypeForm } from "./EditItemTypeForm";

interface Props {
  editingType: ItemType | null,
  setEditingType: (itemType: ItemType | null) => void
}

export const EditItemTypeDialog = ({ editingType, setEditingType }: Props) => {
  const dispatch = useDispatch();

  const close = () => setEditingType(null);

  const update = (attrs: Partial<ItemType>): void => {
    if (editingType) {
      setEditingType({ ...editingType, ...attrs });
    }
  };

  const save = () => {
    editingType && dispatch(updateType(editingType));
    close();
  };

  return (
    <Dialog
      components={{
        Backdrop: undefined
      }}
      onClose={close}
      open={!!editingType}
    >
      <DialogTitle>Edit item type: {editingType?.name}</DialogTitle>
      <DialogContent>
        {
          editingType && (
            <EditItemTypeForm
              itemType={editingType}
              onChange={update}
            />
          )
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button
          color='primary'
          onClick={save}
          variant='contained'
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
