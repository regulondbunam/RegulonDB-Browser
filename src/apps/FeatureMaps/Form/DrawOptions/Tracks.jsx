import * as React from 'react';
import { ACTIONS } from '../../static.js'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import CalendarViewDayOutlinedIcon from '@mui/icons-material/CalendarViewDayOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { HexColorPicker } from "react-colorful";

/**
* Track Options:
 * - Height
 * - BackgroundColor
 */

export default function Track({
  state,
  dispatch
}) {
  const { trackHeight, trackColor } = state._controlState
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleTrackHeight = (e)=>{
    dispatch({type: ACTIONS.SET_TRACK_HEIGHT, value: Number(e.target.value)})
  }

  const handleTrackColor = (color)=>{
    dispatch({type: ACTIONS.SET_TRACK_COLOR, value: color+""})
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <CalendarViewDayOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Tracks Options" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <div>
            <FormControl variant="outlined">
                <p>Height Track</p>
                <OutlinedInput
                  id="outlined-adornment-Measure-Step"
                  endAdornment={<InputAdornment position="end">bp</InputAdornment>}
                  aria-describedby="outlined-Measure-Step-helper-text"
                  inputProps={{
                    'aria-label': 'Measure-Step',
                  }}
                  value={trackHeight}
                  onChange={handleTrackHeight}
                  type="number"
                />
              </FormControl>
              <p style={{margin: "5px 0 10px 0"}} >Background Color</p>
              <HexColorPicker color={trackColor} onChange={handleTrackColor} />
            </div>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
