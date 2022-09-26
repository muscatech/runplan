import { FormControlLabel, Stack, Switch, TextField } from "@mui/material";
import { ColorPicker } from "../../../components/ColorPicker";
import { NewItemType } from "../interfaces";

interface Props {
  itemType: NewItemType,
  onChange: (partialType: Partial<NewItemType>) => void
}

export const EditItemTypeForm = ({ itemType, onChange }: Props) => {
  return (
    <>
      <TextField
        fullWidth
        label='Item type name'
        margin="dense"
        onChange={e => onChange({ name: e.target.value })}
        required
        sx={{
          backgroundColor: itemType.color
        }}
        value={itemType.name}
      />
      <ColorPicker
        onChange={c => onChange({ color: c })}
        value={itemType.color}
      />
      <Stack direction='row'>
        <FormControlLabel
          control={
            <Switch
              checked={itemType.isSectionHeading}
              onChange={e => onChange({
                isSectionHeading: e.target.checked,
                fixedName: itemType.fixedName && e.target.checked
              })}
            />
          }
          label="This is a section heading"
        />
        <FormControlLabel
          control={
            <Switch
              checked={itemType.isSectionHeading && itemType.fixedName}
              disabled={!itemType.isSectionHeading}
              onChange={e => onChange({
                fixedName: e.target.checked
              })}
            />
          }
          label="Always use type name as item name"
        />
      </Stack>
    </>
  );
};
