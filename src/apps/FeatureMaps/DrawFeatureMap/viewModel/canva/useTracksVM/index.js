import { useStore } from "../../../store";

export default function useTracksVM() {
  const {featureMapData, tracks} = useStore();
  //console.log(tracks);
  return {featureMapData}
}