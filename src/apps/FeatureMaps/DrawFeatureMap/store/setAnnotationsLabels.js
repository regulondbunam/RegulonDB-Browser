export default function setAnnotationsLabels(state, labels, columnSelect) {
  return {
    ...state,
    featureMapData: {
      ...state.featureMapData,
      annotations:{
        columnSelect: columnSelect,
        labels: {
          ...labels
        }
      }
    }
  }
}