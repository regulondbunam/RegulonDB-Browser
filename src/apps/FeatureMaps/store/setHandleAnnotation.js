export default function setHandleAnnotation(state, handleAnnotation) {
  return {...state, drawState:{...state.drawState, options: {...state.drawState.options, handleAnnotation: handleAnnotation} }}
}