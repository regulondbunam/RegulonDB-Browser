import useTrackVM from "../../../viewModel/canva/useTracksVM/useTrackVM";
import TickLine from "../../components/TickLine";

export default function Track({track}){
  const {height, color, ticks} = useTrackVM()
  return(
    <div id={track._id}
      style={{height, width: "100%", backgroundColor: color}}
    >
      <TickLine ticks={ticks} variant="middle" heightTrack={height} />
    </div>
  )
}