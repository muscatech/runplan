import { Box } from '@mui/material';
import styled from 'styled-components';
import { RenderedPlan } from '../modules/plan';
import { currentPlanSelector } from '../modules/plan/selectors';

const Inner = styled(Box)`
  grid-area: preview;
  padding: ${ props => props.theme.spacing(4) } ${ props => props.theme.spacing(16) };

  overflow-y: auto;
`;

export const Preview = (): JSX.Element => {

  const currentPlan = currentPlanSelector();

  return (
    <Inner>
      { currentPlan ? <RenderedPlan plan={currentPlan} /> : null }
    </Inner>
  );
};
