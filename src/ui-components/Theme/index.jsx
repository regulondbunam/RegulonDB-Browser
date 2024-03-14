import { createTheme } from '@mui/material/styles';
import { COLOR_PALETTE } from './ColorPalette';
import { TYPOGRAPHY } from './Typography';

export const THEME = createTheme({
    palette: COLOR_PALETTE,
    typography: TYPOGRAPHY,
  });