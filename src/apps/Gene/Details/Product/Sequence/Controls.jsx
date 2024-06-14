import React, { useState } from 'react'
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { OPTION } from './static';


export default function Controls({dispatch,sequence,state,}) {
  return (
    <div>
        <FontSize dispatch={dispatch} state={state} />
    </div>
  )
}

function FontSize({dispatch,state}){

    const handleChange =(event, newValue)=>{
        dispatch({type: OPTION.fontSize, fontSize: newValue})
    }

    return (
        <div style={{ width: 150 }}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Typography variant='irrelevantB' fontSize={8}>A</Typography>
          <Slider aria-label="Volume" value={state.fontSize} onChange={handleChange} max={30} min={10} />
          <Typography variant='irrelevantB' fontSize={15} >A</Typography>
        </Stack>
      </div>
      )
}


function colorOptions(params) {
    
}