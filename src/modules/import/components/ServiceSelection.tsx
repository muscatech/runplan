import { useCallback } from "react";
import { DialogContent, DialogTitle, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useGetPlansOfTypeQuery } from "../api";
import { useSelectedServiceTypeSelector } from "../selectors";
import { selectPlan } from "../slice";

export const ServiceSelection = (): JSX.Element => {

  const serviceTypeID = useSelectedServiceTypeSelector();

  const { data, isLoading } = useGetPlansOfTypeQuery(serviceTypeID);
  const dispatch = useDispatch();

  const handleSelect = useCallback(
    (planID: number) => () => {
      dispatch(selectPlan(planID));
    },
    []
  );

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
                  onClick={handleSelect(plan.id)}
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
