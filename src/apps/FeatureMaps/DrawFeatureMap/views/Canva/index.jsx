import HandlingBar from "./HandlingBar"
import Tracks from "./Tracks"

export default function Canva() {

  return(
    <div style={{position: "relative", maxHeight: "calc(100vh - 40px)", overflowY: "auto", overflowX: "hidden"}} >
      <HandlingBar/>
      <Tracks />
    </div>
  )
}