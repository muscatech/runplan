import { Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { RenderedPlan } from "../../plan";
import { choosePlan, importPlan } from "../../plan/slice";
import { useGetPlanItemsQuery, useGetPlanQuery } from "../api";
import { usePlanMapper } from "../functions";
import { useSelectedPlanIDSelector, useSelectedServiceTypeSelector } from "../selectors";
import { actions as dialogActions } from '../../dialogs';
import { ImportStep, ItemTypeMapping } from "../types";
import { MappingControl } from "./MappingControl";
import { setCurrentStep } from "../slice";

const Inner = styled.div`

  display: flex;

`;

const Pane = styled.div`
  flex: 0 0 50%;
`;

export const FinaliseImport = () => {

  const dispatch = useDispatch();

  const serviceTypeID = useSelectedServiceTypeSelector();
  const planID = useSelectedPlanIDSelector();

  const queryParams = {
    serviceTypeID,
    planID
  };

  const { data: plan, isLoading: planLoading } = useGetPlanQuery(queryParams);
  const { data: items, isLoading: itemsLoading } = useGetPlanItemsQuery(queryParams);

  const [ mapping, setMapping ] = useState<ItemTypeMapping>({} as ItemTypeMapping);

  const mappedPlan = usePlanMapper(mapping, plan, items);

  const doImport = useCallback(
    () => {
      if (mappedPlan) {
        dispatch(importPlan(mappedPlan));
        dispatch(choosePlan(mappedPlan.id));
        dispatch(dialogActions.hide());
        dispatch(setCurrentStep(ImportStep.NOT_STARTED));
      }
    },
    [mappedPlan]
  );

  const isLoading = itemsLoading || planLoading;
  if (isLoading || !mappedPlan) {
    return (<p>Loading, please wait...</p>);
  }

  return (
    <>
      <DialogTitle>Finalise import</DialogTitle>
      <DialogContent>
        <Inner>
          <Pane>
            <MappingControl
              mapping={mapping}
              setMapping={setMapping}
            />
          </Pane>
          <Pane>
            <RenderedPlan
              additionalTypes={[
                { id: 'PCO-header', name: 'Heading', color: '#FFFFFF', isSectionHeading: true }
              ]}
              editable={false}
              plan={mappedPlan}
            />
          </Pane>
        </Inner>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!mappedPlan}
          onClick={doImport}
          variant='contained'
        >
          Import
        </Button>
      </DialogActions>
    </>
  );
};
