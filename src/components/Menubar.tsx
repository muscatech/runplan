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
      <Typography
        component="div"
        sx={{ flexGrow: 1 }}
        variant="h6"
      >
        RunPlan
      </Typography>
    </Toolbar>
  </Inner>
);
