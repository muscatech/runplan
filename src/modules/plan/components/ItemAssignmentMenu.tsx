import { Checkbox, List, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import type { SyntheticEvent } from 'react';
import styled from "styled-components";
import type { Item, Person, Plan } from "../interfaces";
import { TabPanel } from "../../../components/TabPanel";
import { usePlan } from "../context";

interface Props {
  item: Item,
  onChange: (newPeopleIDs: string[]) => void,
  onClose: () => void,
  people: Person[]
}

const Inner = styled.div`

  min-height: 10vh;
  max-height: 50vh;
  min-width: 10vw;


  padding: ${ props => props.theme.spacing(2) };

`;

interface PersonListProps {
  categoryFilter: string,
  displayFunc: (p: Person) => string | undefined,
  item: Item,
  plan: Plan,
  togglePerson: (id: string) => void
}

const PersonList = ({ categoryFilter, displayFunc, item, plan, togglePerson }: PersonListProps): JSX.Element => (
  <List dense>
    {
      plan.people.filter(
        p => p.role.category === categoryFilter
      ).map(
        p => {
          const id = `people-list-${p.id}`;
          const included = (item.assignedPeople || []).includes(p.id);
          return (
            <ListItemButton
              dense
              key={p.id}
              onClick={() => togglePerson(p.id)}
              role="listitem"
            >
              <ListItemIcon>
                <Checkbox
                  checked={included}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': id,
                  }}
                  tabIndex={-1}
                />
              </ListItemIcon>
              <ListItemText
                id={id}
                primary={displayFunc(p)}
              />
            </ListItemButton>
          );
        }
      )
    }
  </List>
);

enum ShowMode {
  TALENT,
  ROLES
}

export const ItemAssignmentMenu = ({ item, onChange }: Props): JSX.Element | null => {

  const [showMode, setShowMode] = useState<ShowMode>(ShowMode.TALENT);
  const plan = usePlan();

  if (!plan) {
    return null;
  }

  const togglePerson = (personID: string) => {
    if (item.assignedPeople?.includes(personID)) {
      onChange(item.assignedPeople.filter(p => p !== personID));
    }
    else {
      onChange([...(item.assignedPeople || []), personID]);
    }
  };

  return (
    <Inner>
      <Typography variant='h6'>
        Assign people to &quot;{item.name}&quot;
      </Typography>
      <Tabs
        onChange={(e: SyntheticEvent, newMode: ShowMode) => setShowMode(newMode)}
        value={showMode}
      >
        <Tab label='Talent' />
        <Tab label='Roles' />
      </Tabs>
      <TabPanel
        index={ShowMode.TALENT}
        value={showMode}
      >
        <PersonList
          categoryFilter='talent'
          displayFunc={(p: Person) => p.name}
          item={item}
          plan={plan}
          togglePerson={togglePerson}
        />
      </TabPanel>
      <TabPanel
        index={ShowMode.ROLES}
        value={showMode}
      >
        <PersonList
          categoryFilter='tech'
          displayFunc={(p: Person) => p.role.name}
          item={item}
          plan={plan}
          togglePerson={togglePerson}
        />
      </TabPanel>
    </Inner>
  );
};
