export default function setScaleBarRight(state, right) {
  return {...state,
    scaleBar:{
      ...state.scaleBar,
      positions: {
        ...state.scaleBar.positions,
        right: right,
      }
    }
  }
}