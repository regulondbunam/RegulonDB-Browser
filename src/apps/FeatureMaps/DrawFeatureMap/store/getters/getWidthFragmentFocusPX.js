export default function getWidthFragmentPX(document, fragment, fragmentWidth){
  return (fragmentWidth * document.scaleBar.width) / fragment.width
}