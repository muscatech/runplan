import { Delete, Edit } from "@mui/icons-material";
import { ButtonGroup, IconButton, ListItem } from "@mui/material";
import type { ItemType } from "../interfaces";

interface TypeEntryButtonsProps {
  onDelete: () => void,
  onEdit: () => void
}

const TypeEntryButtons = ({ onDelete, onEdit }: TypeEntryButtonsProps) => {
  return (
    <ButtonGroup>
      <IconButton
        onClick={onEdit}
        title='Edit'
      >
        <Edit />
      </IconButton>
      <IconButton
        color='error'
        onClick={onDelete}
        title='Delete'
      >
        <Delete />
      </IconButton>
    </ButtonGroup>
  );
};

interface TypeListEntryProps {
  itemType: ItemType,
  onDelete: (itemType: ItemType) => void,
  onEdit: (itemType: ItemType) => void
}

export const TypeListEntry = ({ itemType, onDelete, onEdit }: TypeListEntryProps) => {
  return (
    <ListItem
      secondaryAction={(
        <TypeEntryButtons
          onDelete={() => onDelete(itemType)}
          onEdit={() => onEdit(itemType)}
        />
      )}
      sx={{
        backgroundColor: itemType.color,
        fontWeight: 'bold'
      }}
    >
      {itemType.name}
    </ListItem>
  );
};
