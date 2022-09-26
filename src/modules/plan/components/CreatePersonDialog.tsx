import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

import type { Role } from "../../roles";
import type { NewPerson } from "../interfaces";
import { useDispatch } from "react-redux";
import { addPerson } from "../slice";

interface Props {
  clearRole: () => void,
  planID: string,
  role?: Role
}

export const CreatePersonDialog = ({ planID, role, clearRole }: Props) => {

  const [name, setName] = useState<string>('');
  const dispatch = useDispatch();

  const close = () => {
    setName('');
    clearRole();
  };

  const createPerson = () => {
    if (role && name !== '') {
      const person: NewPerson = {
        role,
        name
      };

      close();
      dispatch(addPerson({ planID, person }));
    }
  };

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && name !== '') {
      createPerson();
    }
  };

  return (
    <Dialog
      fullWidth
      open={!!role}
    >
      <DialogTitle>Add person to role: {role?.name}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label='Name'
          margin='dense'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          onKeyUp={handleKeypress}
          value={name}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          disabled={name === ''}
          onClick={createPerson}
          variant='contained'
        >
          Add person
        </Button>

      </DialogActions>

    </Dialog>
  );
};
