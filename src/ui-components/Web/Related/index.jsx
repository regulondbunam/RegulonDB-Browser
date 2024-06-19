import React from 'react'
import { useGetRelatedObjectsByID } from './utils';
import RelatedSites from './sites';
import { List, ListItem, ListItemText, Skeleton, Box } from '@mui/material'
import IDObjectRDB from "ui-components/utils/IDParser";

//import Operon from './sites/Operon';


export function getObjectType(regulonDB_id) {
  try {
      return new IDObjectRDB(regulonDB_id)
  } catch (error) {
      console.error(error);
      return undefined
  }
}

export default function RelatedList({ regulonDB_id }) {
  const IDObjectRDB = getObjectType(regulonDB_id)
  const {ids, loading} = useGetRelatedObjectsByID(IDObjectRDB)
  if (loading) {
    return (
      <List disablePadding>
      <ListItem>
        <ListItemText primary="loading related elements.." />
        <Box sx={{position: 'absolute', width: "100%"}} >
          <Skeleton animation="pulse"  variant="rectangular" height={30} />
        </Box>
      </ListItem>
    </List>
    )
  }

  return (
    <List disablePadding>
      <RelatedSites ids={ids}  />
    </List>
  )
}
