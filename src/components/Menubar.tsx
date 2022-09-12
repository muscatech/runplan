import styled from 'styled-components';
import { Section } from './Section';

const Inner = styled(Section)`
  grid-area: menu;
  background-color: red;
`;

export const Menubar = (): JSX.Element => (
  <Inner>
    Menubar here
  </Inner>
);
