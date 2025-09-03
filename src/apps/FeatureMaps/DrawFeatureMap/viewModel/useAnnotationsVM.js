import { useStore } from "../store";
import { getRandomBrightColorHex } from "../model/process/utils";

export default function useAnnotationsVM() {
  const {
    setAnnotationColor,
    setAnnotationsLabels,
    annotations,
    columnMapping,
    tracks,
    columns,
  } = useStore();
  const labels = annotations?.labels;
  const columnSelect = annotations?.columnSelect;
  const handleColumnSelect = (event) => {
    const newColumnSelect = event.target.value;
    const property = columnMapping[newColumnSelect];
    const labels = {};
    Object.keys(tracks).forEach((trackKey) => {
      const track = tracks[trackKey];
      const features = track.features;
      Object.keys(features).forEach((featureKey) => {
        const feature = features[featureKey];
        labels[feature[property]] = getRandomBrightColorHex();
      });
    });
    setAnnotationsLabels(labels, newColumnSelect);
  };

  return {
    labels,
    columns,
    columnSelect,
    setAnnotationColor,
    handleColumnSelect,
  };
}
