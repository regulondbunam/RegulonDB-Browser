export default function setAnnotationColor(state, label, color) {
  return {
    ...state,
    featureMapData: {
      ...state.featureMapData,
      annotations: {
        ...state.featureMapData.annotations,
        labels: {
          ...state.featureMapData.annotations.labels,
          [label]: color,
        },
      },
    },
  };
}
