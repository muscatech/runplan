import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { actions as dialogActions } from '../../dialogs';
import { NEW_ROLE_DIALOG } from "../../roles";

export const AddPeopleButtons = () => {

  const dispatch = useDispatch();

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
    </Box>
  );
};
