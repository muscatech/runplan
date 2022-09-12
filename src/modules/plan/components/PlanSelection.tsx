import { useDispatch } from "react-redux";
import { allPlansSelector } from "../selectors";

export const PlanSelection = (): JSX.Element => {
  const dispatch = useDispatch();
  const allPlans = Object.values(allPlansSelector());

  if (allPlans.length > 0) {
    return (
      <p>You have created {allPlans.length} plan(s)</p>
    );
  }
  else {
    return (
      <p>You've not created a plan yet.</p>
    );

  }

};
