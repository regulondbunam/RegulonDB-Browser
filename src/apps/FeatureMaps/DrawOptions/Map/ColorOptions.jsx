import * as React from "react";
import {ACTIONS} from "../../static";
import ColorPicker from "../../../../components/ui-components/ColorPiker";

export default function ColorOptions({state, dispatch}){
    const { backgroundColor, trackColor /*scaleBarColor, scaleBarTextColor*/ } = state._controlState
    const handleSetColor = (color)=>{
        dispatch({type: ACTIONS.SET_BACKGROUND_COLOR, value: color+""})
    }
    const handleSetTrackColor = (color)=>{
        dispatch({type: ACTIONS.SET_TRACK_COLOR, value: color+""})
    }
    return(
        <div>
            <p>Color Options</p>
            <div style={{display: "flex", gap: "10px"}}>
                <ColorPicker name={"Background"} color={backgroundColor} handleSetColor={handleSetColor} />
                <ColorPicker name={"Track Color"} color={trackColor} handleSetColor={handleSetTrackColor} />
            </div>
        </div>
    )
}


