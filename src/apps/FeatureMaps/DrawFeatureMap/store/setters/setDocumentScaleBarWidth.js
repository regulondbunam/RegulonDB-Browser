export default function setDocumentScaleBarWidth(state, width){
  return {...state, document: {...state.document, scaleBar: {...state.document.scaleBar, width}}}
}