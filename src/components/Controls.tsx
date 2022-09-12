import styled from 'styled-components';
import { PlanControls } from '../modules/plan';
import { Section } from './Section';

const Inner = styled(Section)`
  grid-area: controls;
`;

export const Controls = (): JSX.Element => (
  <Inner>
    <PlanControls />
  </Inner>
);
