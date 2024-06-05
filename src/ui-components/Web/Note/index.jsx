import React from 'react'
//import { NoteCitations } from 'ui-components/utils/citations'
import { Typography } from '@mui/material'

export default function Note({note, allCitations}) {
  return (
    <div style={{marginTop: "10px"}}>
      <Typography><span dangerouslySetInnerHTML={{__html: note}} /></Typography>
    </div>
  )
}
