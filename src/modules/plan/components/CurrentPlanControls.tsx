import { Paper } from "@mui/material";
import styled from "styled-components";
import type { Plan } from "../interfaces";
import { AddItemButtons } from "./AddItemButtons";
import { AddPeopleButtons } from "./AddPeopleButtons";

interface Props {
  plan: Plan
}

const Inner = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: auto;
  height: 100%;
`;

export const CurrentPlanControls = ({ plan }: Props) : JSX.Element => {
  return (
    <Paper
      sx={{
        height: '100%'
      }}
    >
      <Inner>
        <AddItemButtons planID={plan.id} />
        <AddPeopleButtons />
      </Inner>
    </Paper>
  );
};
