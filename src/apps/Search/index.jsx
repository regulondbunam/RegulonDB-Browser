import React, { useState, useId } from 'react'
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
import CoexpressionResults from './Rooting/coexpression';

const PATH_SEARCH = {
  path: "search",
  element: <Search />,
  children: [
    { path: ":keyword" }
  ]
}

export { PATH_SEARCH, InputSearch }

function InputSearchPage({ inputTextId, setSearch, handleOnSearch }) {

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
        id={inputTextId}
        aria-describedby="input-searcht"
        InputProps={{
          startAdornment: <SearchIcon />,
          'aria-label': 'search-keyword',
        }}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            handleOnSearch()
          }
        }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Button variant="contained" color='error'
        onClick={handleOnSearch}
      >
        search
      </Button>
    </Paper>
  )
}

export default function Search() {
  let { keyword } = useParams()
  const inputTextId = useId()
  const [search, setSearch] = useState(keyword)

  const handleOnSearch = () => {
    const inputText = document.getElementById(inputTextId)
    if (inputTextId) {
      const value = inputText.value
      window.history.replaceState(null, null, "/" + PATH_SEARCH.path + "/" + value)
      setSearch(value)
    }
  }

  if(/coexpression/.test(search)){
    return <CoexpressionResults keyword={search} />
}

  return (
    <div>
      <Cover>
        <Typography variant='h1' sx={{ marginLeft: "10%" }} >
          Search
        </Typography>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <InputSearchPage inputTextId={inputTextId} setSearch={setSearch} handleOnSearch={handleOnSearch} />
        </div>
      </Cover>
      <div >
        <div className={style.resultContainer} >
          {search && (
            <Results search={search} />
          )}
          <ResentSearch setSearch={(_search) => {
            const inputText = document.getElementById(inputTextId)
            if (inputTextId) {
              inputText.value = _search
              handleOnSearch()
            }
          }} />
        </div>
      </div>
    </div>
  )
}
