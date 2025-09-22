export default function getFeatureWidthPX(document, fragment, startPosition, endPosition) {
  if(startPosition >= fragment.focus.endPosition){return 0}
  const pxBp =  document.scaleBar.width/fragment.focus.width
  const deltaStart = Math.abs(startPosition-fragment.focus.endPosition)
  const deltaEnd = Math.abs(endPosition-fragment.focus.endPosition)
  return Math.round(pxBp*(deltaStart-deltaEnd))
}