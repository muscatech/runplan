import { DialogContent, DialogTitle, List, ListItemButton, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useGetServiceTypesQuery } from "../api";
import { selectServiceType } from "../slice";

export const PlanTypeSelection = (): JSX.Element => {

  const { data, isLoading } = useGetServiceTypesQuery();
  const dispatch = useDispatch();

  const handleSelect = useCallback(
    (serviceType: number) => () => {
      dispatch(selectServiceType(serviceType));
    },
    []
  );


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
                  onClick={handleSelect(st.id)}
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
