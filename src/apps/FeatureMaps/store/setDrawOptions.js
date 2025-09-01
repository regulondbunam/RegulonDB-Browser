export default function setDrawOptions(state, options) {
  return {...state, drawState:{...state.drawState, options: options}}
}