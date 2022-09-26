import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { RoleCategory } from "../constants";
import { NewRole, Role } from "../interfaces";

interface Props {
  role: NewRole,
  onChange: (attrs: Partial<Role>) => void
}

export const RoleEditForm = ({ role, onChange }: Props) => {
  return (
    <>
      <TextField
        autoFocus
        fullWidth
        label='Item type name'
        margin="dense"
        onChange={e => onChange({ name: e.target.value })}
        required
        value={role.name}
      />
      <FormControl
        fullWidth
        required
        sx={{ mt: 1, minWidth: 120 }}
      >
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          label='Category'
          labelId='category-label'
          margin="dense"
          onChange={e => onChange({ category: e.target.value as RoleCategory })}
          value={role.category}
        >
          {
            Object.entries(RoleCategory).map(
              ([ key, value ]) => (
                <MenuItem
                  key={key}
                  value={value}
                >
                  {key}
                </MenuItem>
              )
            )
          }
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            checked={role.useInitialsNotRole}
            onChange={e => onChange({
              useInitialsNotRole: e.target.checked
            })}
          />
        }
        label="Display person's initials not role name"
      />
    </>
  );
};
