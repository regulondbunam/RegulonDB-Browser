import {ACTIONS, HANDLE_ANNOTATIONS} from "../../../static";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import * as React from "react";

export default function LabelOptions({state, dispatch}){
    const { handleAnnotation } = state._controlState
    const handleChange = (e) => {
        dispatch({ type: ACTIONS.SET_HANDLE_ANNOTATIONS, value: e.target.value })
    };

    return(
        <div>
            <FormControl size="small" fullWidth >
                <InputLabel id="handle-feature-selector">Label Mode</InputLabel>
                <Select
                    labelId="handle-feature-selector"
                    id="handle-feature-selector-opt"
                    value={handleAnnotation}
                    label="Label Mode"
                    onChange={handleChange}
                    variant="outlined"
                >
                    <MenuItem value={undefined}>
                        <em>None</em>
                    </MenuItem>
                    {Object.keys(HANDLE_ANNOTATIONS).map((key) => (
                        <MenuItem value={HANDLE_ANNOTATIONS[key]}>{key}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}