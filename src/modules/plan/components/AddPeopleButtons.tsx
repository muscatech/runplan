import { useState } from "react";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { actions as dialogActions } from '../../dialogs';
import { NEW_ROLE_DIALOG } from "../../roles";
import type { Role } from '../../roles';
import { allRolesSelector } from "../../roles/selectors";
import { CreatePersonDialog } from "./CreatePersonDialog";

interface Props {
  planID: string
}

export const AddPeopleButtons = ({ planID }: Props) => {

  const dispatch = useDispatch();

  const allRoles: Role[] = Object.values(allRolesSelector());

  const [pendingAdd, setPendingAdd] = useState<Role>();

  const showNewRoleDialog = () => {
    dispatch(dialogActions.show(NEW_ROLE_DIALOG));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 32px)',
        minHeight: 0,
        padding: 2
      }}
    >
      <Typography variant='h6'>Add people to plan</Typography>
      <Typography sx={{ mb: 2 }}>
        Click a role to add to the plan
      </Typography>
      <ButtonGroup
        fullWidth
        orientation='vertical'
        sx={{
          flexGrow: 1,
          minHeight: 0,
          overflowY: 'auto'
        }}
      >
        {
          allRoles.sort((a, b) => a.name.localeCompare(b.name)).map(
            role => (
              <Button
                key={role.id}
                onClick={() => setPendingAdd(role)}
              >
                {role.name}
              </Button>
            )
          )
        }
      </ButtonGroup>
      <ButtonGroup fullWidth>
        <Button
          onClick={showNewRoleDialog}
          sx={{
            my: 0.5
          }}
        >
          Add role
        </Button>
        <Button
          // onClick={showManageTypesDialog}
          sx={{
            my: 0.5
          }}
        >
          Manage roles
        </Button>
      </ButtonGroup>
      <CreatePersonDialog
        clearRole={() => setPendingAdd(undefined)}
        planID={planID}
        role={pendingAdd}
      />
    </Box>
  );
};
