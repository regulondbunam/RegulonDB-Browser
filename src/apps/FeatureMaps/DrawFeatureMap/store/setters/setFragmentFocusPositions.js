export default function setFragmentFocusPositions(
  state,
  startPosition,
  endPosition,
) {
  const width = Math.abs(startPosition - endPosition);
  return {
    ...state,
    fragment: {
      ...state.fragment,
      focus: { startPosition, endPosition, width },
    },
  };
}
