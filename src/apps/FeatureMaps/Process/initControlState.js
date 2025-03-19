
export default function initControlState(tracks,controlState = {limits:{}}) {
    let state = {
        "draw": true,
        "x": undefined,
        "scale": null,
        "scroll": 0,
        "id_trackFocus": "",
        "label": true,
        "scaleBar": true,
        "variant": "color",
        ...controlState,
        "limits": {
            start: -1000,
            end: 100,
            origin: 0,
            ...controlState.limits
        },
    }
    if (!state.x) {
        state.x = 0
    }
    return state
}