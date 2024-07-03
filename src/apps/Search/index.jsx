import React, { useState, useId, useRef, useReducer } from 'react'
import style from "./search.module.css"
import { Cover } from 'ui-components/Web/Cover'
import { Typography } from '@mui/material'
import { useParams } from "react-router-dom";
import Results from './Results';
import ResentSearch from './ResentSearch';
import { InputSearch } from './InputSearch';
import CoexpressionResults from './Rooting/coexpression';
import PanelSearch from './PanelSearch';
import Drawers from 'apps/Drawers';
import { ACTION, countResults } from './static';

const PATH_SEARCH = {
  path: "search",
  element: <Search />,
  children: [
    { path: ":keyword" }
  ]
}

export { PATH_SEARCH, InputSearch }

export default function Search() {
  let { keyword } = useParams()
  if (/coexpression/.test(keyword)) {
    return <CoexpressionResults keyword={keyword} />
  }
  return <SearchTool keyword={keyword} />
}

function initState({ keyword }) {
  return {
    search: keyword,
    results: {},
    nResults: 0
  }
}

function reducer(state, action) {
  switch (action.type) {
    case ACTION.SEARCH:
      return { ...state, search: action.search }
    case ACTION.UPDATE_RESULTS:
      const newResults = { ...state.results, ...action.results }
      return {
        ...state,
        results: newResults,
        nResults: countResults(newResults)
      }
    default:
      return state
  }
}


function SearchTool({ keyword }) {

  const [state, dispatch] = useReducer(reducer, { keyword }, initState)

  console.log(state);

  return (
    <div>
      <div>
        <Cover>
          <Typography variant='h1' sx={{ marginLeft: "10%" }} >
            Search
          </Typography>
        </Cover>
      </div>
      <div style={{ display: "flex" }} >
        <Drawers
          open
          title={`Search ${state.search && `results of ${state.search} (${state.nResults})`}`}
          drawers={[
            <PanelSearch search={state.search} />,
          ]}
        />
        <div className={style.results}>
          {state.search ? (<Results state={state} dispatch={dispatch} />) : (
            <ResentSearch setSearch={(_search) => {
              dispatch({ type: ACTION.SEARCH, search: _search })
            }} />
          )}
        </div>
      </div>
    </div>
  )
}


/*
  <div className={style.tools}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <InputSearchPage inputTextId={inputTextId} setSearch={setSearch} handleOnSearch={handleOnSearch} />
          </div>
        </div>
    return (
    
      <div>
        
        <div >
          <div className={style.resultContainer} >
            {search && (
              
            )}
            
          </div>
        </div>
      </div>
    )
      
    function InputSearchPage({ inputTextId, setSearch, handleOnSearch }) {

  return (
    <Paper
      elevation={0}
      sx={{ m: 1, width: "100%" }}
    >
      <TextField
        size='small'
        fullWidth
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained"
          size='small'
          onClick={handleOnSearch}
        >
          search
        </Button>
      </Box>

    </Paper>
  )
}
    
    */