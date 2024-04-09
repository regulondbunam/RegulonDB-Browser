import React, { useState } from 'react'
import style from "./search.module.css"
import { Cover } from 'ui-components/Web/Cover'
import { Typography, Button, Paper } from '@mui/material'
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import Results from './Results';
import ResentSearch from './ResentSearch';
import { InputSearch } from './InputSearch';

const PATH_SEARCH = {
  path: "search",
  element: <Search />,
  children: [
    { path: ":keyword" }
  ]
}

export {PATH_SEARCH, InputSearch}

function InputSearchPage({ search, setSearch }) {
  const [value, setValue] = useState(search)
  const handelOnSearch = () => {
    window.history.replaceState(null, null, "/" + PATH_SEARCH.path + "/" + value)
    setSearch(value)
  }
  return (
    <Paper
      elevation={0}
      sx={{ m: 1, display: 'flex', alignItems: 'center', width: "80vw" }}
    >
      <TextField
        size='small'
        sx={{
          width: "80vw"
        }}
        id="searchInput"
        aria-describedby="input-searcht"
        InputProps={{
          startAdornment: <SearchIcon />,
          'aria-label': 'search-keyword',
        }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            handelOnSearch()
          }
        }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Button variant="contained" color='error'
        onClick={handelOnSearch}
      >
        search
      </Button>
    </Paper>
  )
}

export default function Search() {
  let { keyword } = useParams()
  const [search, setSearch] = useState(keyword)
  return (
    <div>
      <Cover>
        <Typography variant='h1' sx={{ marginLeft: "10%" }} >
          Search
        </Typography>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <InputSearchPage search={search} setSearch={setSearch} />
        </div>
      </Cover>
      <div >
        <div className={style.resultContainer} >
          {search && (
            <Results search={search} />
          )}
          <ResentSearch setSearch={setSearch} />
        </div>
      </div>
    </div>
  )
}
