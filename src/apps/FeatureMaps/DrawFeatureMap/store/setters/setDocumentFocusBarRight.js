export default function setDocumentFocusBarRight(state, endPosition) {
  const delta = Math.abs(endPosition - state.fragment.positions.end);
  const pxBp = state.document.scaleBar.width / state.fragment.width;
  const width =  pxBp * state.fragment.focus.width;
  const right = delta * pxBp;
  return {
    ...state,
    document: {
      ...state.document,
      focusBar: { ...state.document.focusBar, right, width },
    },
  };
}
