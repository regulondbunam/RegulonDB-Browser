export default function setColorOptions(state, colorOptions) {
  return {...state, options: {...state.options, colors: colorOptions}}
}