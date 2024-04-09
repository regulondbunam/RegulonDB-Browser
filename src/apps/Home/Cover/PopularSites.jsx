import React from 'react'
import Chip from '@mui/material/Chip';
import { useNavigate } from "react-router-dom";

export default function PopularSites({sites}) {
  const navigate = useNavigate()
  return (
    <div style={{display: "ruby"}} >
      {sites.map(site=>{
        return  <Chip
        key={site.link}
        sx={{m: 1}}
        color="primary500"
        label={site.label}
        onClick={()=>{navigate(site.link)}}
      />
      })}
    </div>
  )
}
