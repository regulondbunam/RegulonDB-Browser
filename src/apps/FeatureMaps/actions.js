import { initControlState } from "./Process";
import governmentLabelColor from "./Process/governmentColors";
import { ACTIONS } from "./static";

export default function reducer(state, action) {

    switch (action.type) {
        case ACTIONS.SET_ORIGIN_DATA:
            return { ...state, originData: { raw: action.raw, format: action.format } }
        case ACTIONS.SET_TITLE:
            return { ...state, title: action.title }
        case ACTIONS.TO_DRAW:
            if (!state._controlState.draw) {
                return { ...state, tracks: action.data, _controlState: initControlState(action.data, state._controlState) }
            }
            return state
        case ACTIONS.SET_SCALE:
            return { ...state, _controlState: { ...state._controlState, scale: action.scale } }
        case ACTIONS.SET_MEASURE:
            return { ...state, _controlState: { ...state._controlState, measure: action.value } }
        case ACTIONS.SET_START_LIMIT:
            return { ...state, _controlState: { ...state._controlState, limits: { ...state._controlState.limits, start: action.value } } }
        case ACTIONS.SET_END_LIMIT:
            return { ...state, _controlState: { ...state._controlState, limits: { ...state._controlState.limits, end: action.value } } }
        case ACTIONS.SET_BACKGROUND_COLOR:
            return { ...state, _controlState: { ...state._controlState, backgroundColor: action.value } }
        case ACTIONS.SET_TRACK_HEIGHT:
            return { ...state, _controlState: { ...state._controlState, trackHeight: action.value } }
        case ACTIONS.SET_TRACK_COLOR:
            return { ...state, _controlState: { ...state._controlState, trackColor: action.value } }
        case ACTIONS.SET_HANDLE_ANNOTATIONS:
            return { ...state, _controlState: { ...state._controlState, handleAnnotation: action.value } }
        case ACTIONS.SET_COLUMN_LABEL:
            let _governmentLabels = {}
            for (const key in state.tracks) {
                if (
                    Object.prototype.hasOwnProperty.call(state.tracks, key) 
                    && key !== "_governmentLabels" 
                    && key !== "_governmentSymbols" ) {
                    const features = state.tracks[key].features;
                    for (const feature of features) {
                        const value = feature[action.value]
                        if (!_governmentLabels[value]) {
                            _governmentLabels[value] = governmentLabelColor(action.value,value)
                        }
                    }
                }
            }
            return { ...state, tracks: {...state.tracks, _governmentLabels: _governmentLabels}, _controlState: { ...state._controlState, labelColumn: action.value } }
        case ACTIONS.SET_BASE_COLOR:
            return {...state, _controlState: { ...state._controlState, featureBaseColor: action.value } }
        default:
            return state
    }
}

