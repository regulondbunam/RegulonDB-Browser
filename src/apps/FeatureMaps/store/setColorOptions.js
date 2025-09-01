export default function setColorOptions(state, colorOptions) {
  return {...state, drawState:{...state.drawState, options: {...state.drawState.options, colors: colorOptions}}}
}