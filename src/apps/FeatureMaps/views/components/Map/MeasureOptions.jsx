import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import * as React from "react";
import { useStore } from "../../../store";

function validateNumber(value) {
  if (value === "-") return value;
  const n = Number(value);
  if (isNaN(n)) return null;
  return n;
}

export default function MeasureOptions() {
  const { options, setDrawOptions } = useStore();
  const { limits, trackHeight } = options;

  console.log(options);

  const limitStartRef = React.useRef(null);
  const limitEndRef = React.useRef(null);
  const trackHeightRef = React.useRef(null);

  const handleChangeStartLimit = (e) => {
    const value = validateNumber(e.target.value)
    if(value){
      setDrawOptions({ ...options, limits: { ...limits, start: value } });
    }
  };

  const handleChangeEndLimit = (e) => {
    const value = validateNumber(e.target.value)
    if(value){
      setDrawOptions({ ...options, limits: { ...limits, end: value } });
    }
  };

  const handleChangeTrackHeight = (e) => {
    const value = validateNumber(e.target.value)
    if(value){
      setDrawOptions({ ...options, trackHeight: value });
    }
  };

  return (
    <div>
      <p>Display Coordinates</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <FormControl component="div" sx={{ width: "200px" }}>
          <OutlinedInput
            size="small"
            id="outlined-adornment-Start"
            aria-describedby="outlined-Start-helper-text"
            inputProps={{
              "aria-label": "Start",
            }}
            endAdornment={<InputAdornment position="end">bp</InputAdornment>}
            value={limits.start}
            onChange={handleChangeStartLimit}
          />
          <FormHelperText id="outlined-Start-helper-text">Start</FormHelperText>
        </FormControl>
        <FormControl component="div" sx={{ width: "200px" }}>
          <OutlinedInput
            size="small"
            id="outlined-adornment-End"
            aria-describedby="outlined-End-helper-text"
            inputProps={{
              "aria-label": "End",
            }}
            endAdornment={<InputAdornment position="end">bp</InputAdornment>}
            value={limits.end}
            onChange={handleChangeEndLimit}
          />
          <FormHelperText id="outlined-End-helper-text">End</FormHelperText>
        </FormControl>
      </div>
      <FormControl variant="outlined" sx={{ width: "210px", mb: 1 }}>
        <p>Track Height</p>
        <OutlinedInput
          id="outlined-adornment-Measure-Step"
          endAdornment={<InputAdornment position="end">px</InputAdornment>}
          aria-describedby="outlined-Measure-Step-helper-text"
          inputProps={{
            "aria-label": "Measure-Step",
          }}
          value={trackHeight}
          onChange={handleChangeTrackHeight}
          size="small"
        />
      </FormControl>
    </div>
  );
}
