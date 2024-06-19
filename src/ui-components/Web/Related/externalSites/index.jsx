import React from 'react'
import { List, ListItem, ListItemText, ListItemButton, Typography, Collapse } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';



export default function RelatedTools({ leftEndPosition, rightEndPosition, gene,  }) {
  const [openSites, setOpenSites] = React.useState(true);

  const handleClickSites = () => {
    setOpenSites(!openSites);
  };
  return (
    <React.Fragment>
      <ListItem disablePadding>
        <ListItemButton  sx={{ pl: 1 }} dense onClick={handleClickSites}>
          <ListItemText primary={<Typography variant='irrelevantB' >RELATED TOOLS</Typography>} />
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