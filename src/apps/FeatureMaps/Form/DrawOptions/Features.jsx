import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import AlignVerticalCenterOutlinedIcon from '@mui/icons-material/AlignVerticalCenterOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ACTIONS, HANDLE_ANNOTATIONS, COLOR_PALETTE_OPTIONS, COLOR_OPACITY_BY } from '../../static'
import { Divider } from '@mui/material';

/*
 * Features Options:
 * - Handle : simbol / color dot
 * - Color
 * - - Palette: color / monochromatic / colorblindness / ColorFile
 * - - Opacity by : none / score / evidence
*/

export default function Features({
  state,
  dispatch
}) {
  const [open, setOpen] = React.useState(false);
  const { handleAnnotation, colorPalette, colorOpacity } = state._controlState

  const handleChange = (e) => {
    dispatch({ type: ACTIONS.SET_HANDLE_ANNOTATIONS, value: e.target.value })
  };

  const handleColorPalette=()=>{

  }

  const handleColorOpacity=()=>{

  }

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AlignVerticalCenterOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Features Options" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <div style={{ width: "100%" }} >
              <FormControl fullWidth>
                <InputLabel id="Handle-simple-select-label">Handle</InputLabel>
                <Select
                  labelId="Handle-simple-select-label"
                  id="Handle-simple-select"
                  value={handleAnnotation}
                  label="Handle"
                  onChange={handleChange}
                >
                  <MenuItem value={undefined}>
                    <em>None</em>
                  </MenuItem>
                  {Object.keys(HANDLE_ANNOTATIONS).map((key) => (
                    <MenuItem value={HANDLE_ANNOTATIONS[key]}>{key}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Divider sx={{mt: 1, mb: 1}} />
              <p style={{marginBottom: "10px"}} >Color Options</p>
              <FormControl fullWidth>
                <InputLabel id="ColorPalette-simple-select-label">Palette</InputLabel>
                <Select
                  labelId="ColorPalette-simple-select-label"
                  id="ColorPalette-simple-select"
                  value={colorPalette}
                  label="Palette"
                  onChange={handleColorPalette}
                >
                  {Object.keys(COLOR_PALETTE_OPTIONS).map((key) => (
                    <MenuItem value={COLOR_PALETTE_OPTIONS[key]}>{key}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{mt: 2}} fullWidth>
                <InputLabel id="ColorOpacity-simple-select-label">Opacity by</InputLabel>
                <Select
                  labelId="ColorOpacity-simple-select-label"
                  id="ColorOpacity-simple-select"
                  value={colorOpacity}
                  label="Opacity by"
                  onChange={handleColorOpacity}
                >
                  {Object.keys(COLOR_OPACITY_BY).map((key) => (
                    <MenuItem value={COLOR_OPACITY_BY[key]}>{key}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
