import React from 'react'
import { List, ListItem, ListItemText, ListItemButton, Typography, Collapse, Skeleton, Box } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { DataVerifier } from 'ui-components/utils';

/** Tools en RegulonDB
 * DrawingTraces positions http://localhost:3000/dtt/leftEndPosition=4638590&rightEndPosition=4641306&organism=ecoli
 * GeneCoexpression
 * GensorUnit
 */


export default function RelatedTools({ leftEndPosition, rightEndPosition, gene, organism }) {
  const [openSites, setOpenSites] = React.useState(true);
  const nav = useNavigate()

  const goToDTT = ()=>{
    nav(`/dtt/leftEndPosition=${leftEndPosition}&rightEndPosition=${rightEndPosition}&organism=${organism}`)
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
        </List>
      </Collapse>
    </React.Fragment>
  )
}