import { useStore } from "../../../store";

export default function useTracksVM() {
  const {tracks, columns, columnMapping} = useStore();
  return {tracks}
}