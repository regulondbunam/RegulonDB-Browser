export default function getFragmentPosition(document, fragment, clientX) {
  return Math.round(
    fragment.positions.start +
      (clientX * fragment.focus.width) / document.scaleBar.width,
  );
}

export function getClientXPosition(document, fragment, position) {
  if(position >= fragment.focus.endPosition || position<= fragment.focus.startPosition){return null}
  const pxBp =  document.scaleBar.width/fragment.focus.width
  const delta = Math.abs(position-fragment.focus.endPosition)
  return Math.round(pxBp*delta)
}
