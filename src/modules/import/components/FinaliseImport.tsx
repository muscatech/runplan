import { Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { choosePlan, importPlan } from "../../plan/slice";
import { useGetPlanItemsQuery, useGetPlanPeopleQuery, useGetPlanQuery, useGetServiceTypeTeamsQuery } from "../api";
import { usePlanMapper } from "../functions";
import { useSelectedPlanIDSelector, useSelectedServiceTypeSelector } from "../selectors";
import { actions as dialogActions } from '../../dialogs';
import { ImportStep, ItemTypeMapping, TeamCategoryMapping } from "../types";

import { RenderedPlan } from "../../plan";
import { ItemMappingControl } from "./ItemMappingControl";
import { setCurrentStep } from "../slice";
import { TeamMappingControl } from "./TeamMappingControl";

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
  const { data: people, isLoading: peopleLoading } = useGetPlanPeopleQuery(queryParams);
  const { data: teams, isLoading: teamsLoading } = useGetServiceTypeTeamsQuery(serviceTypeID);

  const [ itemMapping, setItemMapping ] = useState<ItemTypeMapping>({} as ItemTypeMapping);
  const [ teamMapping, setTeamMapping ] = useState<TeamCategoryMapping>({} as TeamCategoryMapping);
  const [ timeFilter, setTimeFilter ] = useState<number[]>([]);

  const mappedPlan = usePlanMapper({ plan, itemMapping, items, teamMapping, people, timeFilter });

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

  const isLoading = itemsLoading || planLoading || peopleLoading || teamsLoading;
  if (isLoading || !mappedPlan) {
    return (<p>Loading, please wait...</p>);
  }

  return (
    <>
      <DialogTitle>Finalise import</DialogTitle>
      <DialogContent>
        <Inner>
          <Pane>
            <ItemMappingControl
              mapping={itemMapping}
              setMapping={setItemMapping}
            />
            <TeamMappingControl
              mapping={teamMapping}
              setMapping={setTeamMapping}
              teams={teams}
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
