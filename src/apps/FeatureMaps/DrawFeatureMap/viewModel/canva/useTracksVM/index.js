import { useStore } from "../../../store";

export default function useTracksVM() {
  const {tracks, featureMapData} = useStore();
  console.log(tracks);
  return {tracks}
}