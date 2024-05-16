import React from 'react'
import { useGetGeneticElements } from 'webServices/queries'


export default function Track({state,dispatch}) {
  const objectType = []
  state.objectType.forEach(ge => {
    if (ge.isCheck) {
      objectType.push(ge.key)
    }
  });
  const {geneticElements} = useGetGeneticElements({...state, objectType: objectType})
  console.log(geneticElements);
  return (
    <div>Track</div>
  )
}

