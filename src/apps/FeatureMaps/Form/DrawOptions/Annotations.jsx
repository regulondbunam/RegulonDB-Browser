import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ACTIONS, HANDLE_ANNOTATIONS } from '../../static'
import { HexColorPicker } from "react-colorful";

/**
 * Annotations:
 * - Show by column
 * - 
 * 
 */

const FEATURE_MAP_COLUMNS = [
  "type",
  "identifier",
  "strand",
  "sequence",
]

export default function Annotations({
  state,
  dispatch
}) {
  const { labelColumn, featureBaseColor } = state._controlState
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = (e) => {
    dispatch({ type: ACTIONS.SET_COLUMN_LABEL, value: e.target.value })
  }
/*
  const handleSelectBaseColor = (color) => {
    dispatch({ type: ACTIONS.SET_BASE_COLOR, value: color })
  }
*/
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <LoyaltyOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Annotations Options" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <div style={{width: "100%"}} >
              <FormControl fullWidth>
                <InputLabel id="LabelByColumn-simple-select-label">Label by column</InputLabel>
                <Select
                  labelId="LabelByColumn-simple-select-label"
                  id="LabelByColumn-simple-select"
                  value={labelColumn}
                  label="Label by column"
                  onChange={handleChange}
                >
                  {FEATURE_MAP_COLUMNS.map((column) => (
                    <MenuItem value={column}>{column}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/*labelColumn === "score" && (
                <>
                  <p style={{ margin: "5px 0 15px 0" }} >Select Base Color</p>
                  <HexColorPicker color={featureBaseColor} onChange={handleSelectBaseColor} />
                </>
              )*/}
            </div>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
