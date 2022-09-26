import { Delete, Edit } from "@mui/icons-material";
import { ButtonGroup, IconButton, ListItem } from "@mui/material";
import type { ItemType } from "../interfaces";

interface TypeEntryButtonsProps {
  onDelete: () => void
}

const TypeEntryButtons = ({ onDelete }: TypeEntryButtonsProps) => {
  return (
    <ButtonGroup>
      <IconButton title='Edit'>
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
  onDelete: (itemType: ItemType) => void
}

export const TypeListEntry = ({ itemType, onDelete }: TypeListEntryProps) => {
  return (
    <ListItem
      secondaryAction={(
        <TypeEntryButtons
          onDelete={() => onDelete(itemType)}
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
