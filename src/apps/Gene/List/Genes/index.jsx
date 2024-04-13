import React from 'react'
import Typography from "@mui/material/Typography";
import { List } from 'ui-components/Web/List';

export default function GeneList({data}) {
  return (
    <List
            elevation={0}
            square
            data={data}
            title={
              <Typography gutterBottom variant="relevant" component="div">
                {"List (" + data.length + ")"}
              </Typography>}
            defaultExpanded={true} pagination />
  )
}
