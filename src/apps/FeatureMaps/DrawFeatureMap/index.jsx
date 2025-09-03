import { useStore } from "./store";
import React, { useEffect, useState } from "react";
import Controls from  "./views/Controls"
import Annotations from "./views/Annotations"
import { processRaw } from "./model/process";

export default function DrawFeatureMap({featureMapData}) {
  const { featureMapData: _fm,setFeatureMapData, isMenuOpen } = useStore()


  useEffect(() => {
    processRaw(featureMapData.rawData).then((data)=>{
      if (data){
        setTimeout(()=>{
          setFeatureMapData({...featureMapData, ...data });
        },500)
      }
    }).catch(e => console.log("error to create tracks"+e));
  }, [featureMapData, setFeatureMapData]);


  if (!_fm) return(
    <div>
      Loading...
    </div>
  )

  return(
    <div>
      <Controls />
      <div style={{ display: "grid", gridTemplateColumns: isMenuOpen ? "3fr 1fr" : "4fr", height: "calc(100vh - 40px)"}} >
        <div>map</div>
        {isMenuOpen && <Annotations /> }
      </div>
    </div>
  )
}