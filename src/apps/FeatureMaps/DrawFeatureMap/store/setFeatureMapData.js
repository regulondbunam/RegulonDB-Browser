export default function setFeatureMapData(state, featureMapData) {
  const fragmentWidth = Math.abs(
    featureMapData.options.limits.end - featureMapData.options.limits.start,
  );
  return {
    ...state,
    featureMapData: {
      ...featureMapData,
    },
    document: {
      ...state.document,
      focusBar: {
        ...state.document.focusBar,
        width: fragmentWidth,
      },
    },
    fragment: {
      width: fragmentWidth,
      positions: {
        ...featureMapData.options.limits,
      },
      focus: {
        startPosition: featureMapData.options.limits.start,
        endPosition: featureMapData.options.limits.end,
        width: fragmentWidth,
      },
    },
  };
}

/*
*
* scaleBar: {
            positions: {
              ...state.scaleBar.positions,
                ...featureMapData.options.limits,
            }
        },*/
