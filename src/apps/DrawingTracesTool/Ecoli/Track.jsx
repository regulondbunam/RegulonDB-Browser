import React from 'react'
import DrawingTraces from './DrawingTraces';


export default function Track({state,dispatch}) {
  const objectType = []
  state.objectType.forEach(ge => {
    if (ge.isCheck) {
      objectType.push(ge.key)
    }
  });
  return(
    <div>
      <DrawingTraces 
        id="DttTool" 
        {...state} objectType={objectType} />
    </div>
  )
}



