import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import Genes from './Genes'
import Operon from './Operon';
import Regulon from './Regulon';
import Sigmulon from './Sigmulon';
import GensorUnit from './GensorUnit';
import { ACTION } from '../static';
import { LocalStorage } from 'ui-components/utils';



export default function Results({ state, dispatch }) {

  const setCount=(results)=>{
    dispatch({type: ACTION.UPDATE_RESULTS, results: results})
  }

  return (
    <div style={{ marginLeft: "5%", marginRight: "5%" }} >
      <Typography variant='h2' >
        Results of {state.search} ({state.nResults})
      </Typography>
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}} >
        <Genes id="genes" search={state.search}
          onCompleted={(state) => {
            if (state.nResults > 0) {
              LocalStorage.SaveRecentSearches(state.search)
            }
            setCount({ genes: state.nResults })
          }}
        />
        <Operon id="operon" search={state.search}
          onCompleted={(state) => {
            if (state.nResults > 0) {
              LocalStorage.SaveRecentSearches(state.search)
            }
            setCount({ operon: state.nResults })
          }}
        />
        <Regulon id="regulon" search={state.search}
          onCompleted={(state) => {
            if (state.nResults > 0) {
              LocalStorage.SaveRecentSearches(state.search)
            }
            setCount({ regulon: state.nResults })
          }}
        />
        <Sigmulon id="sigmulon" search={state.search}
          onCompleted={(state) => {
            if (state.nResults > 0) {
              LocalStorage.SaveRecentSearches(state.search)
            }
            setCount({ sigmulon: state.nResults })
          }}
        />
        <GensorUnit id="gensorUnit" search={state.search}
          onCompleted={(state) => {
            if (state.nResults > 0) {
              LocalStorage.SaveRecentSearches(state.search)
            }
            setCount({ gu: state.nResults })
          }}
        />
      </div>
    </div>
  )
}


