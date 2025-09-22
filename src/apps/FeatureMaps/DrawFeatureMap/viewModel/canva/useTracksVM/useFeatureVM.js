import { useStore } from "../../../store";

export default function useFeatureVM(feature) {
  const {
    annotations,
    featureMapData,
    fragment,
    document,
    getClientXPosition,
    getFeatureWidthPX
  } = useStore();
  const { relativeEndPosition, relativeStartPosition } = feature;
  const { options } = featureMapData;
  const color = annotations?.labels[feature.label] || "black";
  const height = 10;
  const width = getFeatureWidthPX(
    document,
    fragment,
    relativeStartPosition,
    relativeEndPosition
  );
  const right = getClientXPosition(document, fragment, relativeEndPosition);
  let top = options.trackHeight / 2 + 1;
  if (
    feature?.strand?.toUpperCase() === "R" ||
    feature?.strand?.toUpperCase() === "REVERSE"
  ) {
    top = top - height - 1;
  }

  return { width, right, annotations, color, height, top };
}
