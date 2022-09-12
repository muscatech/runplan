import styled from 'styled-components';
import { Section } from './Section';

const Inner = styled(Section)`
  grid-area: controls;
  background-color: yellow;
`;

export const Controls = (): JSX.Element => (
  <Inner>
    Controls here
  </Inner>
);
