import React from 'react'
import Typography from "@mui/material/Typography";
import { useLazySearchGene } from "webServices/queries"
import { DISPATCH } from '../static';
import { InputSearch } from './InputSearch';
import { DataVerifier } from 'ui-components/utils';


export default function SearchList({dispatch,state}) {
  const [getGenes, {loading}] = useLazySearchGene()

  const handleSelectView = (viewType)=>{
    dispatch({type:DISPATCH.UPDATE_VIEW,viewType})
  }

  const handleSearch = (search)=>{
    if (DataVerifier.isValidString(search)) {
      getGenes(search,
      (genes)=>{
        dispatch({type: DISPATCH.SEARCH, search: search, genes: genes})
      }
      )
    }
    
  }
  return (
    <div style={{ padding: "16px" }}>
      <Typography gutterBottom variant="relevant" component="div">
        Options
      </Typography>
      <InputSearch handleSearch={handleSearch} />
    </div>
  )
}
