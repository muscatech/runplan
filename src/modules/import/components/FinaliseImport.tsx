import { DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { RenderedPlan } from "../../plan";
import { useGetPlanItemsQuery, useGetPlanQuery } from "../api";
import { usePlanMapper } from "../functions";
import { useSelectedPlanIDSelector, useSelectedServiceTypeSelector } from "../selectors";
import { ItemTypeMapping } from "../types";
import { MappingControl } from "./MappingControl";

const Inner = styled.div`

  display: flex;

`;

const Pane = styled.div`
  flex: 0 0 50%;
`;

export const FinaliseImport = () => {

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
    </>
  );
};
