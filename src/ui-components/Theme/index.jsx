import { createTheme } from '@mui/material/styles';
import { COLOR_PALETTE } from './ColorPalette';
import { TYPOGRAPHY } from './Typography';
import { COMPONENTS } from './Components'

export const THEME = createTheme({
    palette: COLOR_PALETTE,
    typography: TYPOGRAPHY,
    components: COMPONENTS,
  });