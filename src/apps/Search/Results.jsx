import React, { useReducer, useState } from 'react'
import { Typography, Divider } from '@mui/material'
import Genes from './Genes'


const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_COUNT":
      const resultIndex = state.findIndex(r=>r.id===action.id)
      const result = {...state[resultIndex], n: action.n}
      state[resultIndex] = result
      return state
    default:
      return state;
  }
};


export default function Results({ search = "" }) {
  const [state, dispatch] = useReducer(reducer, [
    {
      id: "genes",
      n: 0,
    }
  ])

  const handleUpdateResultCount = (state)=>{
    console.log("state",state);
    dispatch({type: "UPDATE_COUNT",id:state.id,n:state.nResults})
  }

  const resultComponets = [
    {
      id: "genes",
      component: <Genes id="genes" search={search} onGetResults={handleUpdateResultCount} />
    }
  ]
  console.log(state);

  return (
    <div style={{ marginLeft: "5%", marginRight: "5%" }} >

      <Typography variant='h2' >
        Results ()
      </Typography>
      <Divider sx={{borderTop: "1px solid #d59f0f"}} />
      <div>
        {resultComponets.map(result=>{
          return <div key={"searchResult-"+result.id}>
            {result.component}
          </div>
        })}
      </div>
    </div>
  )
}
