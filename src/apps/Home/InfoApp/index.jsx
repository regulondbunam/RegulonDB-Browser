import React, { useState } from 'react'
import Release from './Release'
import Mirrors from './Mirrors';
import Summary from './Summary';
import "./style.css"
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NewspaperIcon from "@mui/icons-material/Newspaper";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountTreeIcon from "@mui/icons-material/AccountTree";


import { isMobile } from 'react-device-detect';


export default function InfoApp() {
  if (isMobile) {
    return <MovileLayout />
  }
  return <DesktopLayout />
}

function MovileLayout() {
  const [option, setOption] = useState(3)
  const handleSelect = (value) => {
    if (option === value) {
      setOption(3)
    }else{
      setOption(value)
    }
    
  }
  return (
    <div>
      <ListItemButton onClick={() => { handleSelect(0) }}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary={"Summary"} />
        {option === 0 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={option === 0} timeout="auto" unmountOnExit>
        <Summary unTitle />
      </Collapse>
      <ListItemButton onClick={() => { handleSelect(1) }}>
        <ListItemIcon>
          <NewspaperIcon />
        </ListItemIcon>
        <ListItemText primary={"Relese"} />
        {option === 1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={option === 1} timeout="auto" unmountOnExit>
        <Release unTitle />
      </Collapse>
      <ListItemButton onClick={() => { handleSelect(2) }}>
        <ListItemIcon>
          <AccountTreeIcon />
        </ListItemIcon>
        <ListItemText primary={"Mirrors Sites"} />
        {option === 2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={option === 2} timeout="auto" unmountOnExit>
        <Mirrors unTitle />
      </Collapse>
    </div>
  )
}

function DesktopLayout() {
  return (
    <div className='rdb_home_infoApp' >
      <Summary />
      <Release />
      <Mirrors />
    </div>
  )
}
