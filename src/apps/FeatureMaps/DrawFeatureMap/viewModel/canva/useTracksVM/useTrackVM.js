import { useStore } from "../../../store";
import { useMemo } from "react";

export default function useTrackVM() {
  const { featureMapData, document, fragment, getScaleBarTicks} = useStore();
  const { trackHeight, colors } = featureMapData.options;
  const ticks = useMemo(
    () => getScaleBarTicks(document, fragment),
    [fragment, document, getScaleBarTicks],
  );
  return { fragment, height: trackHeight, color: colors.tracks, ticks }
}