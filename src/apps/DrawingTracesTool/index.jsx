import React from 'react'
//import Home from './Home';
import Ecoli from './Ecoli';
import { useParams } from 'react-router-dom';
import { secureRange } from './Ecoli/definitions';



export const PATH_DTT = {
  path: "dtt",
  element: <DTT />,
  children: [{ path: ":parameters" }],
};

export default function DTT() {
  const {parameters} = useParams()
  let dataForm = {};
  if(parameters){
    const params = new URLSearchParams(parameters);

    if (params.get("leftEndPosition") && params.get("leftEndPosition")) {
      //const organism = params.get("organism")
      try{
        dataForm = {
          covered: false,
          leftEndPosition: parseInt(params.get("leftEndPosition")),
          rightEndPosition: parseInt(params.get("rightEndPosition")),
          strand: "both",
          draw:true
        };
        if (!secureRange(dataForm.leftEndPosition,dataForm.rightEndPosition)) {
          alert("Incorrect positions, please check that the left position is smaller than the right position and that the difference is less than 100,000bp.")
          dataForm = {}
        }
      }catch{
        console.error("left or right position invalid");
      }
      
    }
  }
  return <Ecoli dataForm={dataForm} />
}
