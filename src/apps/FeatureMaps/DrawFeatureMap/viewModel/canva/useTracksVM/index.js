import { useStore } from "../../../store";

export default function useTracksVM() {
  const {tracks} = useStore();
  return {tracks}
}