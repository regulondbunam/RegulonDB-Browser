import useTracksVM from "../../../viewModel/canva/useTracksVM";
import Track from "./Track";

export default function Tracks() {
  const { tracks } = useTracksVM();

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px"}} >
      {Object.keys(tracks).map((key,i) => {
        const track = tracks[key];
        return <Track key={"track_"+i+"_"+track._id} track={track} />
      })}
    </div>
  )
}