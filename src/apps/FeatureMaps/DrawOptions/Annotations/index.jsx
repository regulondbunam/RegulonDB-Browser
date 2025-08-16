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
    let columnSelect = state._controlState.labelColumn
    let columns = null
    let storeColumns = null
    //console.log(columnSelect)
    if(localStorage.getItem("featureMapColumns")){
        try{
            storeColumns = JSON.parse(localStorage.getItem("featureMapColumns"));
            columns = storeColumns.columns;
            columnSelect = storeColumns.mapFMtoCL[columnSelect]
        }catch (e){
            console.error("Error parsing columns: ", e)
            columns = FEATURE_MAP_COLUMNS;
        }
    }else{
        columns = FEATURE_MAP_COLUMNS;
    }

    //console.log(columnSelect)

    const handleChange = (e) => {
        let value = e.target.value;
        if(storeColumns){
            const mapping = storeColumns.mapCLtoFM;
            value = mapping[value]
        }
        dispatch({ type: ACTIONS.SET_COLUMN_LABEL, value: value })
    }
    return(
        <div>
            <Select
                variant="standard"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={columnSelect}
                onChange={handleChange}
                label="Age"
            >
                {columns.map((column) => (
                    <MenuItem value={column}>{column}</MenuItem>
                ))}
            </Select>
        </div>
    )
}