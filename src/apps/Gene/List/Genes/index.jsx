import React from 'react'
import Typography from "@mui/material/Typography";
import LinearProgress from '@mui/material/LinearProgress';
import { List } from 'ui-components/Web/List';

export default function GeneList({ data, loading = false }) {
  return (
    <List
      elevation={0}
      square
      data={data}
      title={loading ? (<>
        <Typography gutterBottom variant="irrelevant" component="div">
          {"loading..."}
        </Typography>
        <LinearProgress />
      </>) : (
        <Typography gutterBottom variant="relevant" component="div">
          {"" + data.length + " genes"}
        </Typography>
      )}
      pagination />
  )
}
