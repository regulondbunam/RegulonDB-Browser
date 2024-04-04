import React, { useState } from 'react'
import { Typography, Divider } from '@mui/material'


export default function Results({ search = "" }) {
  const [totalResults, setTotalResults] = useState(0)

  const handleUpdateResults = (nResults)=>{
    setTotalResults(n=>n+nResults)
  }
  
  return (
    <div style={{ marginLeft: "10%", marginRight: "5%" }} >

      <Typography variant='h2' >
        Results
      </Typography>
      <Typography variant='irrelevant' >
        total results ({totalResults})
      </Typography>
      <Divider sx={{borderTop: "1px solid #d59f0f"}} />
      <div>

      </div>
    </div>
  )
}
