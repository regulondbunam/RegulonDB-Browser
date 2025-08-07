import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import * as React from "react";
import {useState} from "react";
import {ACTIONS} from "../../static";

export default function MeasureOptions({dispatch, state}) {
    const { measure, limits, trackHeight } = state._controlState
    const [scale, setScale] = useState(measure)
    const [limitStart, setLimitStart] = useState(limits.start)
    const [limitEnd, setLimitEnd] = useState(limits.end)
    const [_trackHeight, setTrackHeight] = useState(trackHeight)

    const scaleSelectRef = React.useRef(null);
    const limitStartRef = React.useRef(null);
    const limitEndRef = React.useRef(null);
    const trackHeightRef = React.useRef(null);

    const handleChangeMeasureStep = (e) => {
        const value = Number(e.target.value)
        setScale(e.target.value);
        if(scaleSelectRef.current){
            clearTimeout(scaleSelectRef.current)
        }

        scaleSelectRef.current = setTimeout(()=>{
            if(value>10){
                dispatch({ type: ACTIONS.SET_MEASURE, value: Number(e.target.value) })
            }
        })
    }

    const handleChangeStartLimit = (e) => {
        const value = Number(e.target.value)
        setLimitStart(e.target.value);
        if(limitStartRef.current){
            clearTimeout(limitStartRef.current)
        }
        limitStartRef.current = setTimeout(()=>{
            if(value>0 && value>limitEnd){
                dispatch({ type: ACTIONS.SET_START_LIMIT, value: value })
            }
        },300)
    }

    const handleChangeEndLimit = (e) => {
        const value = Number(e.target.value)
        setLimitEnd(e.target.value);
        if(limitEndRef.current){
            clearTimeout(limitEndRef.current)
        }
        limitEndRef.current = setTimeout(()=>{
            if(value>0 && value<limitStart){
                dispatch({ type: ACTIONS.SET_END_LIMIT, value: value })
            }
        },300)
    }

    const handleChangeTrackHeight = (e) => {
        const value = Number(e.target.value)
        setTrackHeight(e.target.value);
        if(trackHeightRef.current){
            clearTimeout(trackHeightRef.current)
        }
        trackHeightRef.current = setTimeout(()=>{
            if(value>50 && value<1000 && value!==_trackHeight){
                dispatch({ type: ACTIONS.SET_TRACK_HEIGHT, value: value })
            }
        })
    }

    return (
        <div>
            <FormControl variant="outlined" sx={{width: "210px", mb: 1}}>
                <p>Scale bar interval (bp)</p>
                <OutlinedInput
                    id="outlined-adornment-Measure-Step"
                    endAdornment={<InputAdornment position="end">bp</InputAdornment>}
                    aria-describedby="outlined-Measure-Step-helper-text"
                    inputProps={{
                        'aria-label': 'Measure-Step',
                    }}
                    value={scale}
                    onChange={handleChangeMeasureStep}
                    type="number"
                    size="small"
                />
                <FormHelperText id="outlined-Measure-Step-helper-text">Distance between ticks (bp)</FormHelperText>
            </FormControl>
            <p>Display Coordinates</p>
            <div style={{display: "flex", gap: "10px"}}>
                <FormControl component="div" sx={{width: "100px"}} >
                    <OutlinedInput
                        size="small"
                        id="outlined-adornment-Start"
                        aria-describedby="outlined-Start-helper-text"
                        inputProps={{
                            'aria-label': 'Start',
                        }}
                        endAdornment={<InputAdornment position="end">bp</InputAdornment>}
                        value={limitStart}
                        onChange={handleChangeStartLimit}
                        type="number"
                    />
                    <FormHelperText id="outlined-Start-helper-text">Start</FormHelperText>
                </FormControl>
                <FormControl component="div" sx={{width: "100px"}} >
                    <OutlinedInput
                        size="small"
                        id="outlined-adornment-End"
                        aria-describedby="outlined-End-helper-text"
                        inputProps={{
                            'aria-label': 'End',
                        }}
                        endAdornment={<InputAdornment position="end">bp</InputAdornment>}
                        value={limitEnd}
                        onChange={handleChangeEndLimit}
                        type="number"
                    />
                    <FormHelperText id="outlined-End-helper-text">End</FormHelperText>
                </FormControl>
            </div>
            <FormControl variant="outlined" sx={{width: "210px", mb: 1}}>
                <p>Track Height</p>
                <OutlinedInput
                    id="outlined-adornment-Measure-Step"
                    endAdornment={<InputAdornment position="end">px</InputAdornment>}
                    aria-describedby="outlined-Measure-Step-helper-text"
                    inputProps={{
                        'aria-label': 'Measure-Step',
                    }}
                    value={_trackHeight}
                    onChange={handleChangeTrackHeight}
                    type="number"
                    size="small"
                />
            </FormControl>
        </div>
    )
}