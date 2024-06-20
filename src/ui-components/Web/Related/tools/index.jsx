import React from 'react'
import { List, ListItem, ListItemText, ListItemButton, Typography, Collapse, Skeleton, Box } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
//import { gql, useQuery } from '@apollo/client';
import { DataVerifier } from 'ui-components/utils';
import GU from './GU';

/** Tools en RegulonDB
 * GensorUnit
 */


export default function RelatedTools({ leftEndPosition, rightEndPosition, gene={}, organism={}, collapse=true }) {
  const [openSites, setOpenSites] = React.useState(collapse);
  const nav = useNavigate()
  //console.log(leftEndPosition);
  let regulonName = undefined;
  //let geneName = undefined;
  if (DataVerifier.isValidString(gene?.name)) {
    //geneName = gene.name;
    try {
      regulonName = gene.name.charAt(0).toUpperCase() + gene.name.slice(1);
    } catch (error) {
      // :) ;) 
    }
    
  }

  const goToDTT = ()=>{
    nav(`/dtt/leftEndPosition=${leftEndPosition}&rightEndPosition=${rightEndPosition}&organism=${organism?._id}`)
  }

  const handleClickSites = () => {
    setOpenSites(!openSites);
  };

  return (
    <React.Fragment>
      <ListItem disablePadding>
        <ListItemButton sx={{ pl: 1 }} dense onClick={handleClickSites}>
          <ListItemText primary={<Typography variant='irrelevantB' >RELATED TOOLS</Typography>} />
          {openSites ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={openSites} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {(DataVerifier.isValidNumber(leftEndPosition) && DataVerifier.isValidNumber(rightEndPosition)) && (
            <ListItemButton dense onClick={goToDTT}>
              <ListItemText primary={<Typography variant='irrelevantB' >Drawing Traces Tool</Typography>} />
            </ListItemButton>
          )}
          {regulonName && <GU regulonName={regulonName} />}
        </List>
      </Collapse>
    </React.Fragment>
  )
}