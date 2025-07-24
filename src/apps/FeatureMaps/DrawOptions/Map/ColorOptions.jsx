import * as React from "react";
import {ACTIONS} from "../../static";
import ColorPicker from "../../../../components/ui-components/ColorPiker";

export default function ColorOptions({state, dispatch}){
    const { backgroundColor, /*scaleBarColor, scaleBarTextColor*/ } = state._controlState
    const handleSetColor = (color)=>{
        console.log(color)
        dispatch({type: ACTIONS.SET_BACKGROUND_COLOR, value: color+""})
    }
    return(
        <div>
            <p>Color Options</p>
            <ColorPicker name={"Background"} color={backgroundColor} handleSetColor={handleSetColor} />
        </div>
    )
}


