import React from 'react'
import RegulonLogo from "static/images/regulonDB.png"
import { Typography } from '@mui/material'

export default function Header({title = ""}) {
  return (
    <div style={{margin: "10px"}} >
        <img src={RegulonLogo} alt="RegulonDB Logo" style={{width: "150px"}} />
        <br />
        <Typography variant='relevantB' >{title}</Typography>
    </div>
  )
}
