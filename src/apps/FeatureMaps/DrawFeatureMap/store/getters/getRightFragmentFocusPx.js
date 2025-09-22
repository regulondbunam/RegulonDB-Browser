export default function getRightFragmentFocusPx(document, fragment) {
  const delta = Math.abs(fragment.focus.endPosition - fragment.positions.end)
  const pxBp = document.scaleBar.width / fragment.width
  return delta * pxBp
}