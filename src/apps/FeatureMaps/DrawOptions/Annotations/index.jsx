import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as React from "react";
import {ACTIONS, FEATURE_MAP_COLUMNS} from "../../static";

export default function Annotations() {

    return(
        <div>
            Annn
        </div>
    )
}

export function AnnotationColumnSelect({state, dispatch}){
    const { labelColumn } = state._controlState

    const handleChange = (e) => {
        dispatch({ type: ACTIONS.SET_COLUMN_LABEL, value: e.target.value })
    }
    return(
        <div>
            <Select
                variant="standard"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={labelColumn}
                onChange={handleChange}
                label="Age"
            >
                {FEATURE_MAP_COLUMNS.map((column) => (
                    <MenuItem value={column}>{column}</MenuItem>
                ))}
            </Select>
        </div>
    )
}