import React from 'react'
import { ListItemText, ListItemButton, Typography } from '@mui/material'
import { DataVerifier } from 'ui-components/utils';
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom';

const query_getGu = gql`
  query getGu($advancedSearch: String) {
    getGUsBy(advancedSearch: $advancedSearch) {
      data {
        _id
      }
    }
  }
`;

export default function GU({ regulonName }) {
  const nav = useNavigate()
  const { data, error } = useQuery(query_getGu, {
    variables: {
      advancedSearch: `${regulonName}[gensorUnit.name]`,
    },
  });
  if (error) { return null }
  
  if (data) {
    let idGU = undefined
    if (DataVerifier.isValidArray(data.getGUsBy.data)) {
      idGU = data.getGUsBy.data[0]._id;
    }
    if (!idGU) {
      return null
    }
    return (
      <ListItemButton dense onClick={() => { nav("/gu/" + idGU) }}>
        <ListItemText primary={<Typography variant='irrelevantB' >Gensor Unit Map</Typography>} />
      </ListItemButton>
    )
  }
  return null
}
