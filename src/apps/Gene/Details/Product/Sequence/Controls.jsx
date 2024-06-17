import React, { useState } from 'react'
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
//import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { OPTION } from './static';


export default function Controls({ dispatch, sequence, state, }) {
    return (
        <div style={{ display: "flex", gap: "5px" }}>
            <FontSize dispatch={dispatch} state={state} />
        </div>
    )
}

function FontSize({ dispatch, state }) {

    const handleChange = (event, newValue) => {
        dispatch({ type: OPTION.fontSize, fontSize: newValue })
    }

    return (
        <div>
            <div><Typography variant='irrelevant' >Font size</Typography></div>
            <div style={{ width: 100 }}>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <Typography variant='irrelevantB' fontSize={8}>A</Typography>
                    <Slider aria-label="Volume" value={state.fontSize} onChange={handleChange} max={30} min={10} />
                    <Typography variant='irrelevantB' fontSize={18} >A</Typography>
                </Stack>
            </div>
        </div>
    )
}


/**
  <Button
          id="demo-customized-button"
          variant="outlined"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDown />}
          sx={{ height: 30 }}
        >
          Options
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>
            <FormControlLabel
              control={
                
              }
              label="Color"
            />
          </MenuItem>
        </Menu>
 */