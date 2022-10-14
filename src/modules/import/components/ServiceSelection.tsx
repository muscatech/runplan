import { DialogContent, DialogTitle, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useGetPlansOfTypeQuery } from "../api";
import { useSelectedServiceTypeSelector } from "../selectors";

export const ServiceSelection = (): JSX.Element => {

  const serviceTypeID = useSelectedServiceTypeSelector();

  const { data, isLoading } = useGetPlansOfTypeQuery(serviceTypeID);

  return (
    <>
      <DialogTitle>Select plan to import</DialogTitle>
      <DialogContent>
        {
          isLoading && <Typography>Loading, please wait...</Typography>
        }
        <List>
          {
            data && data.map(
              plan => (
                <ListItemButton
                  key={plan.id}
                >
                  <ListItemText
                    primary={plan.dates}
                    secondary={`${plan.items_count} items`}
                  />
                </ListItemButton>
              )
            )
          }
        </List>

      </DialogContent>
    </>
  );
};
