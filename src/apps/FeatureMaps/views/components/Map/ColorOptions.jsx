import * as React from "react";
import ColorPicker from "../../../../../components/ui-components/ColorPiker";
import { useStore } from "../../../store";

export default function ColorOptions(){
  const {options, setColorOptions} = useStore()
  const {background, tracks} = options.colors
    const handleSetColor = (color)=>{
      setColorOptions({...options.colors, background: color+""})
    }
    const handleSetTrackColor = (color)=>{
        setColorOptions({...options.colors, tracks: color+""})
    }
    return(
        <div>
            <p>Color Options</p>
            <div style={{display: "flex", gap: "10px"}}>
                <ColorPicker name={"Background"} color={background} handleSetColor={handleSetColor} />
                <ColorPicker name={"Track Color"} color={tracks} handleSetColor={handleSetTrackColor} />
            </div>
        </div>
    )
}


