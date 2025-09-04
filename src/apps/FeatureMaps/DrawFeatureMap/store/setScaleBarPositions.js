export default function setScaleBarPositions(state, start, end) {
    return {...state,
        scaleBar:{
        ...state.scaleBar,
        positions: {
            ...state.scaleBar.positions,
            start: start,
            end: end,
        }
        }
    }
}