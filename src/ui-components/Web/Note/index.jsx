import React from 'react'
import { insertCitations } from 'ui-components/utils/References'
import { Typography } from '@mui/material'

export default function Note({note, references}) {
  
  return (
    <div style={{marginTop: "10px"}}>
      <Typography variant='normal' ><span dangerouslySetInnerHTML={{__html: insertCitations(note,references)}} /></Typography>
    </div>
  )
}
