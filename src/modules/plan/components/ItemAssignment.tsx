import { useMemo, useRef, useState } from "react";
import { Popover, styled, Typography } from "@mui/material";

import { usePlan } from "../context";
import type { Item, Person, Plan } from "../interfaces";
import { ItemAssignmentMenu } from "./ItemAssignmentMenu";
import { initialify } from "../functions";

const Inner = styled(Typography)({
  fontWeight: 'normal',
  fontStyle: 'italic',
  fontSize: 'small',
  padding: 4,
  cursor: 'pointer',
  minHeight: '1em',
  lineHeight: 1.5,
  width: '100%'
});

interface Props {
  item: Item,
  onUpdate: (attrs: Partial<Item>) => void
}

const getAssignedPeople = (plan: Plan, assignedPeople: string[]): Person[] => {
  const currentAssignments: Person[] = [];

  assignedPeople?.forEach(
    pid => {
      const maybePerson = plan.people.find(p => p.id === pid);
      if (maybePerson) {
        currentAssignments.push(maybePerson);
      }
    }
  );

  return currentAssignments;
};

export const ItemAssignment = ({ item, onUpdate }: Props) => {

  const plan = usePlan();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const anchor = useRef<HTMLSpanElement>(null);

  if (!plan) {
    return null;
  }

  const currentAssignments = useMemo(
    () => getAssignedPeople(plan, (item.assignedPeople || [])),
    [plan, item]
  );

  const hideMenu = () => setShowMenu(false);

  return (
    <>
      <Inner
        onClick={() => setShowMenu(true)}
        ref={anchor}
      >
        { currentAssignments.map(p => p.role.useInitialsNotRole ? p.initials : initialify(p.role.name)).join('/') }
      </Inner>
      <Popover
        anchorEl={anchor.current?.parentElement}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={hideMenu}
        open={showMenu}
      >
        <ItemAssignmentMenu
          item={item}
          onChange={(newPeople: string[]) => onUpdate({ assignedPeople: newPeople })}
          onClose={hideMenu}
          people={plan.people}
        />
      </Popover>
    </>
  );
};
