export default function getWidthFragmentFocusPX(state){
  const {document, fragment} = state

  return (fragment.focus.width * document.scaleBar.width) / fragment.width
}