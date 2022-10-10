import { DialogContent, DialogTitle, List, ListItemButton, Typography } from "@mui/material";
import { useGetServiceTypesQuery } from "../api";

export const PlanTypeSelection = (): JSX.Element => {

  const { data, isLoading } = useGetServiceTypesQuery();

  return (
    <>
      <DialogTitle>Select service type</DialogTitle>
      <DialogContent>
        {
          isLoading && <Typography>Loading, please wait...</Typography>
        }
        <List>
          {
            data && data.map(
              st => (
                <ListItemButton
                  key={st.id}
                >
                  { st.name }
                </ListItemButton>
              )
            )
          }
        </List>

      </DialogContent>
    </>
  );
};
