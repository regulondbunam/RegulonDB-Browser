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
      <DrawingTraces {...state} objectType={objectType} />
    </div>
  )
  /*
  const idTrack = "dtt_tool"
  const {geneticElements} = useGetGeneticElements({...state, objectType: objectType})
  if (!geneticElements) {
    return "loading..."
  }
  return (
    <div>
      <div>Controls</div>
      <div><DrawTrack idTrack={idTrack} geneticElements={geneticElements} leftEndPosition={state.leftEndPosition} rightEndPosition={state.rightEndPosition} /></div>
    </div>
  )
  */
}



