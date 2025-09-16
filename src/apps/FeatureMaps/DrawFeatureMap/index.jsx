import { useStore } from "./store";
import React, { useEffect } from "react";
import Canva from "./views/Canva"
import Controls from  "./views/Controls"
import Annotations from "./views/Annotations"
import { processRaw } from "./model/process";

export default function DrawFeatureMap({featureMapData}) {
  const { featureMapData: _fm,setFeatureMapData, setDrawData, document } = useStore()
  const isMenuOpen = document.menu.open

  useEffect(() => {
    processRaw(featureMapData.rawData).then((data)=>{
      if (data){
        setTimeout(()=>{
          setFeatureMapData(featureMapData);
          setDrawData(data);
        },500)
      }
    }).catch(e => console.log("error to create tracks"+e));
  }, [featureMapData, setFeatureMapData, setDrawData]);

  //console.log(scaleBar);

  if (!_fm) return(
    <div>
      Loading...
    </div>
  )

  return(
    <div>
      <Controls />
      <div style={{ display: "grid", gridTemplateColumns: isMenuOpen ? "3fr 1fr" : "4fr"}} >
        <Canva />
        {isMenuOpen && <Annotations /> }
      </div>
    </div>
  )
}