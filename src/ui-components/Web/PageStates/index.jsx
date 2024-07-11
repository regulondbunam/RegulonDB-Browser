import React from 'react'
import { Cover } from '../Cover'
import { Typography } from '@mui/material'

export default function PageState({state = "done",title = ""}) {
  return (
    <Cover state={state} >
        <Typography variant='h1' sx={{m:"2%"}} >{title}</Typography>
    </Cover>
  )
}
