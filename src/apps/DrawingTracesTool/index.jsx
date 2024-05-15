import React from 'react'
import Home from './Home';
import Ecoli from './Ecoli';



export const PATH_DTT = {
  path: "dtt",
  element: <DTT />,
  children: [{ path: ":parameters" }],
};

export default function DTT() {
  return <Ecoli />
}
