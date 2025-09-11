export default function setScaleBarLeft(state, left) {
  return {...state,
    scaleBar:{
      ...state.scaleBar,
      positions: {
        ...state.scaleBar.positions,
        left: left,
      }
    }
  }
}