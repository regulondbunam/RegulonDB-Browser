export default function setRawData(state, data) {
    return {...state, drawState:{...state.drawState, rawData: data}}
}