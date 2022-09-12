import styled from 'styled-components';
import { Section } from './components/Section';

const Inner = styled(Section)`
  grid-area: statusbar;
  background-color: green;
`;

export const Statusbar = (): JSX.Element => (
  <Inner>
    Statusbar here
  </Inner>
);
