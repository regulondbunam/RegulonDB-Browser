export default function setHandleAnnotation(state, handleAnnotation) {
  return {...state, options: {...state.options, handleAnnotation: handleAnnotation}}
}