export default function setScaleBarPositions(state, start, end, right) {
  return {
    ...state,
    scaleBar: {
      ...state.scaleBar,
      positions: {
        ...state.scaleBar.positions,
        start: start,
        end: end,
        right: right,
      },
    },
  };
}
