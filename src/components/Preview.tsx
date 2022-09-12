import { Box } from '@mui/material';
import styled from 'styled-components';

const Inner = styled(Box)`
  grid-area: preview;
  background-color: rgb(245, 245, 245);
  padding: ${ props => props.theme.spacing(4) };
`;

export const Preview = (): JSX.Element => (
  <Inner>
    Preview here
  </Inner>
);
