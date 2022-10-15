import { RenderedPlan } from "../../plan";
import { useGetPlanItemsQuery, useGetPlanQuery } from "../api";
import { usePlanMapper } from "../functions";
import { useSelectedPlanIDSelector, useSelectedServiceTypeSelector } from "../selectors";

export const FinaliseImport = () => {

  const serviceTypeID = useSelectedServiceTypeSelector();
  const planID = useSelectedPlanIDSelector();

  const queryParams = {
    serviceTypeID,
    planID
  };

  const { data: plan, isLoading: planLoading } = useGetPlanQuery(queryParams);
  const { data: items, isLoading: itemsLoading } = useGetPlanItemsQuery(queryParams);

  const isLoading = itemsLoading || planLoading;

  const mappedPlan = usePlanMapper(plan, items);

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
