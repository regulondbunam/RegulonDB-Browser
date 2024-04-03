import React from 'react'
import style from "./search.module.css"
import { Cover } from 'ui-components/Web/Cover'
import { Typography, Button, Paper } from '@mui/material'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';


export default function Search() {
  return (
    <div>
      <Cover>
        <Typography variant='h1' sx={{ marginLeft: "10%" }} >
          Search
        </Typography>
      </Cover>
      <div >
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Paper
            component="form"
            elevation={0}
            sx={{ m: 1, display: 'flex', alignItems: 'center', width: "80vw" }}
          >
            <TextField
              sx={{
                width: "80vw"
              }}
              id="outlined-search"
              aria-describedby="input-searcht"
              InputProps={{
                startAdornment: <SearchIcon />,
                'aria-label': 'search-keyword',
              }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Button variant="contained" color='secondary' >search</Button>
          </Paper>
        </div>
        <div className={style.resultContainer} >results</div>
      </div>
    </div>
  )
}
