import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LabelOptions from "./Label";
import {ACTIONS, HANDLE_ANNOTATIONS} from "../../static";
import * as React from "react";

export default function Features(props){



    return (
        <div style={{width: "210px", margin: "10px"}}>
            <LabelOptions {...props} />
        </div>
    )
}