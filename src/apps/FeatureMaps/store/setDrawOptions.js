export default function setDrawOptions(state, options) {
  return { ...state, options: { ...options } };
}