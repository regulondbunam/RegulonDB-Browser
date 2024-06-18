import React from 'react'
import { List, ListItem, ListItemText, ListItemButton, Typography, Collapse } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


export default function RelatedSites({RDBObject}) {
    const [openSites, setOpenSites] = React.useState(true);

 const handleClickSites = () => {
    setOpenSites(!openSites);
  };
  return (
    <React.Fragment>
        <ListItem disablePadding>
        <ListItemButton dense onClick={handleClickSites}>
          <ListItemText disablePadding primary={<Typography variant='irrelevantB' >RELATED SITES</Typography>} />
          {openSites ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={openSites} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        </List>
      </Collapse>
    </React.Fragment>
  )
}
