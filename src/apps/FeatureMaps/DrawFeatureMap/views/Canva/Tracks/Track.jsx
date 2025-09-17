import useTrackVM from "../../../viewModel/canva/useTracksVM/useTrackVM";
import Feature from "./Feature"
import TickLine from "../../components/TickLine";

export default function Track({track}){
  const { fragment, height, color, ticks} = useTrackVM()
  const {features} = track;
  return(
    <div id={track._id}
      style={{height, width: "100%", backgroundColor: color, position: "relative"}}
    >
      <TickLine ticks={ticks} variant="middle" heightTrack={height} />
      <div style={{height: "100%", width: "100%", position: "absolute", top: 0}} >
        {Object.keys(features).map((key,i) => {
          const feature = features[key];
          if(feature.relativeEndPosition > fragment.focus.endPosition || feature.relativeStartPosition < fragment.focus.startPosition){
            return null;
          }
          return <Feature key={"feature_"+i+"_"+feature._id} feature={feature} />
        })}
      </div>

    </div>
  )
}