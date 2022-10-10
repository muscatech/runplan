import { useState } from "react";
import type { SyntheticEvent } from 'react';
import { Box, Button, ButtonGroup, Tab, Tabs, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { actions as dialogActions } from '../../dialogs';
import { NEW_ROLE_DIALOG } from "../../roles";
import type { Role } from '../../roles';
import { allRolesSelector } from "../../roles/selectors";
import { CreatePersonDialog } from "./CreatePersonDialog";
import { TabPanel } from "../../../components/TabPanel";

function a11yProps(index: number) {
  return {
    id: `role-tab-${index}`,
    'aria-controls': `role-tabpanel-${index}`,
  };
}

const RoleGroups = ({ onSelectRole }: { onSelectRole: (r: Role) => void }) => {
  const [currentGroup, setCurrentGroup] = useState<number>(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <Tabs
          onChange={(e: SyntheticEvent, newGroup: number) => setCurrentGroup(newGroup)}
          value={currentGroup}
        >
          <Tab
            label="All"
            {...a11yProps(0)}
          />
          <Tab
            label="Talent"
            {...a11yProps(1)}
          />
          <Tab
            label="Tech"
            {...a11yProps(2)}
          />
          <Tab
            label="Band"
            {...a11yProps(2)}
          />
        </Tabs>
        <TabPanel
          index={0}
          value={currentGroup}
        >
          <RoleGroup onSelectRole={onSelectRole} />
        </TabPanel>
        <TabPanel
          index={1}
          value={currentGroup}
        >
          <RoleGroup
            filter={(r) => r.category === 'talent'}
            onSelectRole={onSelectRole}
          />
        </TabPanel>
        <TabPanel
          index={2}
          value={currentGroup}
        >
          <RoleGroup
            filter={(r) => r.category === 'tech'}
            onSelectRole={onSelectRole}
          />
        </TabPanel>
        <TabPanel
          index={3}
          value={currentGroup}
        >
          <RoleGroup
            filter={(r) => r.category === 'band'}
            onSelectRole={onSelectRole}
          />
        </TabPanel>
      </Box>
    </>
  );
};

interface RoleGroupProps {
  filter?: (r: Role) => boolean,
  onSelectRole: (r: Role) => void
}

const RoleGroup = ({ filter = () => true, onSelectRole }: RoleGroupProps) => {

  const allRoles: Role[] = Object.values(allRolesSelector());

  return (
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
        allRoles.filter(filter).sort((a, b) => a.name.localeCompare(b.name)).map(
          role => (
            <Button
              key={role.id}
              onClick={() => onSelectRole(role)}
            >
              {role.name}
            </Button>
          )
        )
      }
    </ButtonGroup>
  );
};

interface Props {
  planID: string
}

export const AddPeopleButtons = ({ planID }: Props) => {

  const dispatch = useDispatch();

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
      <Typography>
        Click a role to add to the plan
      </Typography>
      <RoleGroups onSelectRole={setPendingAdd} />
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
