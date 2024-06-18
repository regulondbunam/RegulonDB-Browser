import React from 'react'
import { useGetRelatedObjectsByID } from './tools';
import RelatedSites from './sites';
import { List, ListItem, ListItemText, ListItemButton, Typography, Collapse } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
//import Operon from './sites/Operon';




export default function RelatedList({ regulonDB_id }) {
  useGetRelatedObjectsByID(regulonDB_id)

  const [open, setOpen] = React.useState(true);

  

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List disablePadding>
      <RelatedSites  />
    </List>
  )

  //const geneName = gene.name;
  // const regulonName = geneName.charAt(0).toUpperCase() + geneName.slice(1);
  //console.log(regulonName);


  return (
    <List disablePadding>
      
      <ListItem disablePadding>
        <ListItemButton dense onClick={handleClick}>
          <ListItemText disablePadding primary={<Typography variant='irrelevantB' >RELATED TOOLS</Typography>} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton dense >
            <ListItemText primary="algo" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  )
}
