export default function setAnnotationColor(state, label, color) {
  return {
    ...state,
    annotations: {
      ...state.annotations,
      labels: {
        ...state.annotations.labels,
        [label]: color,
      },
    },
  };
}
