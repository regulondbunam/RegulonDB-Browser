export default function setAnnotationsLabels(state, labels, columnSelect) {
  return {
    ...state,
    annotations:{
      columnSelect: columnSelect,
      labels: {
        ...labels
      }
    }
  }
}