import styled from 'styled-components';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Menu } from '../modules/menu';

const Inner = styled(AppBar)`
  grid-area: menu;
  z-index: 100;
`;

export const Menubar = (): JSX.Element => (
  <Inner position='static'>
    <Toolbar>
      <Menu />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        RunPlan
      </Typography>
    </Toolbar>
  </Inner>
);
