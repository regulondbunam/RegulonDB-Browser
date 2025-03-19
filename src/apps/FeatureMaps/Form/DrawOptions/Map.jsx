import * as React from 'react';
import { ACTIONS } from '../../static.js'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import LineStyleOutlinedIcon from '@mui/icons-material/LineStyleOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { HexColorPicker } from "react-colorful";

/*
 * Map Options:
 * - Measure Step
 * - Display Limits : Auto / From, TO, Origin
 * - BackgroundColor
*/

export default function Map({
  state,
  dispatch
}) {
  const { measure, limits, backgroundColor } = state._controlState
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChangeMeasureStep = (e) => {
    dispatch({ type: ACTIONS.SET_MEASURE, value: Number(e.target.value) })
  }

  const handleChangeStartLimit = (e) => {
    dispatch({ type: ACTIONS.SET_START_LIMIT, value: Number(e.target.value) })
  }

  const handleChangeEndLimit = (e) => {
    dispatch({ type: ACTIONS.SET_END_LIMIT, value: Number(e.target.value) })
  }

  const handleSetColor = (color)=>{
    dispatch({type: ACTIONS.SET_BACKGROUND_COLOR, value: color+""})
    
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <LineStyleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Map Options" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <div>
              <FormControl variant="outlined">
                <p>Measure in scale bar</p>
                <OutlinedInput
                  id="outlined-adornment-Measure-Step"
                  endAdornment={<InputAdornment position="end">bp</InputAdornment>}
                  aria-describedby="outlined-Measure-Step-helper-text"
                  inputProps={{
                    'aria-label': 'Measure-Step',
                  }}
                  value={measure}
                  onChange={handleChangeMeasureStep}
                  type="number"
                />
                <FormHelperText id="outlined-Measure-Step-helper-text">Measure Step</FormHelperText>
              </FormControl>
              <FormControl variant="outlined">
                <p>Display Limits</p>
                <OutlinedInput
                  id="outlined-adornment-Start"
                  aria-describedby="outlined-Start-helper-text"
                  inputProps={{
                    'aria-label': 'Start',
                  }}
                  value={limits.start}
                  onChange={handleChangeStartLimit}
                  type="number"
                />
                <FormHelperText id="outlined-Start-helper-text">Start</FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-End"
                  aria-describedby="outlined-End-helper-text"
                  inputProps={{
                    'aria-label': 'End',
                  }}
                  value={limits.end}
                  onChange={handleChangeEndLimit}
                  type="number"
                />
                <FormHelperText id="outlined-End-helper-text">End</FormHelperText>
              </FormControl>
              <p>Background Color</p>
              <br />
              <HexColorPicker color={backgroundColor} onChange={handleSetColor} />
            </div>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
