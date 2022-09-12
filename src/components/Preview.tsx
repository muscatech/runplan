import styled from 'styled-components';
import { Section } from './Section';

const Inner = styled(Section)`
  grid-area: preview;
  background-color: blue;
`;

export const Preview = (): JSX.Element => (
  <Inner>
    Preview here
  </Inner>
);
