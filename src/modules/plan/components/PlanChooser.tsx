import { Delete } from "@mui/icons-material";
import { IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import type { Plan } from "../interfaces";
import { allPlansSelector, currentPlanSelector } from "../selectors";

interface PlanEntryProps {
  onClick?: () => void,
  plan: Plan,
  selected?: boolean
}

const PlanEntry = ({ onClick, plan, selected }: PlanEntryProps): JSX.Element => {

  const itemsText = `${plan.items.length} item${plan.items.length === 1 ? '' : 's'}`;
  const lastModifiedText = `Last modified ${new Date(plan.meta?.lastModified).toDateString()}`;

  return (
    <ListItem
      secondaryAction={
        <IconButton
          aria-label="Delete"
          disabled
          edge="end"
        >
          <Delete />
        </IconButton>
      }
    >
      <ListItemButton
        onClick={onClick}
        selected={selected}
      >
        <ListItemText
          primary={plan.name}
          secondary={`${itemsText} - ${lastModifiedText}`}
        />
      </ListItemButton>
    </ListItem>
  );
};

interface PlanChooserProps {
  onSelect: (planID: string) => void
}

export const PlanChooser = ({ onSelect }: PlanChooserProps) => {
  const plans: Plan[] = Object.values(allPlansSelector());
  const currentPlan = currentPlanSelector();

  plans.sort(
    (a: Plan, b: Plan): number => {
      return (b.meta?.lastModified || 0) - (a.meta?.lastModified || 0);
    }
  );

  return (
    <List>
      {
        plans.map(
          p => (
            <PlanEntry
              key={p.id}
              onClick={() => onSelect(p.id)}
              plan={p}
              selected={p.id === currentPlan?.id}
            />
          )
        )
      }
    </List>
  );
};
