import { useEffect, useState } from "react";
import { RenderedPlan } from "../../plan";
import { Plan } from "../../plan/interfaces";
import { useGetPlanItemsQuery, useGetPlanQuery } from "../api";
import { mapPlan } from "../functions";
import { useSelectedPlanIDSelector, useSelectedServiceTypeSelector } from "../selectors";

export const FinaliseImport = () => {

  const [mappedPlan, setMappedPlan] = useState<Plan>();

  const serviceTypeID = useSelectedServiceTypeSelector();
  const planID = useSelectedPlanIDSelector();

  const queryParams = {
    serviceTypeID,
    planID
  };

  const { data: plan, isLoading: planLoading } = useGetPlanQuery(queryParams);
  const { data: items, isLoading: itemsLoading } = useGetPlanItemsQuery(queryParams);

  const isLoading = itemsLoading || planLoading;

  useEffect(
    () => {
      if (items && plan && !isLoading) {
        setMappedPlan(
          mapPlan(
            plan,
            items
          )
        );
      }
    },
    [items, plan]
  );

  if (isLoading || !mappedPlan) {
    return (<p>Loading, please wait...</p>);
  }

  return (
    <RenderedPlan
      additionalTypes={[
        { id: 'PCO-header', name: 'Heading', color: '#FFFFFF', isSectionHeading: true }
      ]}
      editable={false}
      plan={mappedPlan}
    />
  );
};
