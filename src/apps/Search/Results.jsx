import React, { useState } from 'react'
import { Typography, Divider } from '@mui/material'
import Genes from './Genes'
import { DataVerifier } from 'ui-components/utils';


export default function Results({ search = "" }) {
  const [count, setCount] = useState(0)


  const handleUpdateResultCount = (state) => {
    console.log("state",state);
    //dispatch({type: "UPDATE_COUNT",id:state.id,n:state.nResults})
    //setCount(c=>c+state.nResults)
  }

  //const count = countResults(state)
  if (count > 0) {
    // localStorage.setItem("resent")
  }

  return (
    <div style={{ marginLeft: "5%", marginRight: "5%" }} >

      <Typography variant='h2' >
        Results ({count})
      </Typography>
      <Divider sx={{ borderTop: "1px solid #d59f0f" }} />
      <div>
        <Genes id="genes" search={search} onComplete={handleUpdateResultCount} />
      </div>
    </div>
  )
}

function countResults(state) {
  let count = 0
  if (DataVerifier.isValidArray(state)) {
    state.forEach(result => {
      count += result.n
    });
  }
  return count
}
