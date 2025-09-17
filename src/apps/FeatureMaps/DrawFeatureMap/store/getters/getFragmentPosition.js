export default function getFragmentPosition(document, fragment, clientX) {
  return Math.round(
    fragment.positions.start +
      (clientX * fragment.focus.width) / document.scaleBar.width,
  );
}

export function getClientXPosition(document, fragment, startPosition) {
  if(startPosition >= fragment.focus.endPosition){return null}
  const pxBp =  document.scaleBar.width/fragment.focus.width
  const delta = Math.abs(startPosition-fragment.focus.endPosition)
  return Math.round(pxBp*delta)
}
