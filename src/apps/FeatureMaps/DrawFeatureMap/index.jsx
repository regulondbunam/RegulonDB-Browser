import { useStore } from "./store";
import { useEffect } from "react";
import Controls from  "./views/Controls"
import { createTracks } from "./model/process";

export default function DrawFeatureMap({featureMapData}) {
  const { featureMapData: _fm,setFeatureMapData, isMenuOpen } = useStore()

  useEffect(() => {
    const tracks = createTracks(featureMapData.rawData);
    console.log(tracks);
    setFeatureMapData(featureMapData);
  }, [featureMapData, setFeatureMapData]);

  if (!_fm) return(
    <div>
      Loading...
    </div>
  )

  return(
    <div>
      <Controls />
      <div style={{ display: "grid", gridTemplateColumns: isMenuOpen ? "3fr 1fr" : "4fr", height: "calc(100vh - 184px)"}} >

      </div>
      DrawFeatureMap
    </div>
  )
}