import 'styled-components';
import { Theme } from '@mui/material/styles';

interface CustomTheme {
  // For future expansion
}

declare module '@mui/material/styles' {
    interface Theme extends CustomTheme {}
    interface ThemeOptions extends CustomTheme {}
}

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
