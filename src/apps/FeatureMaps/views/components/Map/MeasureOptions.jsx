import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import * as React from "react";
import { useStore } from "../../../store";

export default function MeasureOptions() {
  const { options, setDrawOptions } = useStore()
    const { measure, limits, trackHeight } = options

    const scaleSelectRef = React.useRef(null);
    const limitStartRef = React.useRef(null);
    const limitEndRef = React.useRef(null);
    const trackHeightRef = React.useRef(null);

    const handleChangeMeasureStep = (e) => {
        const value = Number(e.target.value)
        if(scaleSelectRef.current){
            clearTimeout(scaleSelectRef.current)
        }

        scaleSelectRef.current = setTimeout(()=>{
            if(value>10){
                setDrawOptions({...options, measure: value})
            }
        })
    }

    const handleChangeStartLimit = (e) => {
        const value = Number(e.target.value)
        if(limitStartRef.current){
            clearTimeout(limitStartRef.current)
        }
        limitStartRef.current = setTimeout(()=>{
            if(value>0 && value>limits.start){
                setDrawOptions({...options, limits: {...limits, start: value}})
            }
        },300)
    }

    const handleChangeEndLimit = (e) => {
        const value = Number(e.target.value)
        if(limitEndRef.current){
            clearTimeout(limitEndRef.current)
        }
        limitEndRef.current = setTimeout(()=>{
            if(value>0 && value<limits.end){
                setDrawOptions({...options, limits: {...limits, end: value}})
            }
        },300)
    }

    const handleChangeTrackHeight = (e) => {
        const value = Number(e.target.value)
        if(trackHeightRef.current){
            clearTimeout(trackHeightRef.current)
        }
        trackHeightRef.current = setTimeout(()=>{
            if(value>50 && value<1000 && value!== trackHeight){
                setDrawOptions({...options, trackHeight: value})
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
                    value={measure}
                    onChange={handleChangeMeasureStep}
                    type="number"
                    size="small"
                />
                <FormHelperText id="outlined-Measure-Step-helper-text">Distance between ticks (bp)</FormHelperText>
            </FormControl>
            <p>Display Coordinates</p>
            <div style={{display: "flex", gap: "10px"}}>
                <FormControl component="div" sx={{width: "200px"}} >
                    <OutlinedInput
                        size="small"
                        id="outlined-adornment-Start"
                        aria-describedby="outlined-Start-helper-text"
                        inputProps={{
                            'aria-label': 'Start',
                        }}
                        endAdornment={<InputAdornment position="end">bp</InputAdornment>}
                        value={limits.start}
                        onChange={handleChangeStartLimit}
                        type="number"
                    />
                    <FormHelperText id="outlined-Start-helper-text">Start</FormHelperText>
                </FormControl>
                <FormControl component="div" sx={{width: "200px"}} >
                    <OutlinedInput
                        size="small"
                        id="outlined-adornment-End"
                        aria-describedby="outlined-End-helper-text"
                        inputProps={{
                            'aria-label': 'End',
                        }}
                        endAdornment={<InputAdornment position="end">bp</InputAdornment>}
                        value={limits.end}
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
                    value={trackHeight}
                    onChange={handleChangeTrackHeight}
                    type="number"
                    size="small"
                />
            </FormControl>
        </div>
    )
}