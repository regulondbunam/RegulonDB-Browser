import React from 'react'
import { List, ListItem, ListItemText, ListItemButton, Typography, Collapse } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { DataVerifier } from 'ui-components/utils';



export default function RelatedExternal({ externalCrossReferences, collapse = false }) {
  const [openSites, setOpenSites] = React.useState(collapse);
  if (!DataVerifier.isValidArray) {
    return null
  }
  const handleClickSites = () => {
    setOpenSites(!openSites);
  };
  return (
    <React.Fragment>
      <ListItem disablePadding>
        <ListItemButton sx={{ pl: 1 }} dense onClick={handleClickSites}>
          <ListItemText primary={<Typography variant='irrelevantB' >EXTERNAL REFERENCES</Typography>} />
          {openSites ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={openSites} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {externalCrossReferences.map(ref => (
            <>
              {ref?.url ? (
                <ListItemButton sx={{ pl: 4 }} dense  >
                  <a
                    href={`${ref.url}`}
                    className="p_accent"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: "12px" }}
                  >
                    <Typography variant='irrelevantB' >
                      {`${ref.externalCrossReferenceName}`}
                    </Typography>

                  </a>
                </ListItemButton>
              ) : (<></>)}
            </>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  )
}