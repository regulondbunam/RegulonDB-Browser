import React from 'react';
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Genes from './genes';
import Operon from './operon';
import TranscriptionFactor from './transcriptionFactor';
import TranscriptionUnit from './transcriptionUnit';
import SigmaFactor from './sigmaFactor';
import {useSearchParams} from 'react-router-dom';
import {getSelectedOrganismId} from "../../../../utils/organismUtils";

//import "./transcriptionFactor.css"

function Regulates({ regulates }) {
    const [_show, set_show] = React.useState(true);
    const {
        genes,
        operons,
        sigmaFactors,
        transcriptionFactors,
        transcriptionUnits,
    } = regulates
    
    const [searchParams] = useSearchParams();
    const organismId = getSelectedOrganismId(searchParams);

    //console.log(transcriptionUnits);
    return (
        <div style={{ marginLeft: "2%", marginRight: "3%" }} >
            {genes.length > 0 && (<Genes genes={genes} organismId={organismId} />)}
            {operons.length > 0 && (<Operon operons={operons} organismId={organismId} />)}
            {transcriptionUnits.length > 0 && (<TranscriptionUnit transcriptionUnits={transcriptionUnits} organismId={organismId} />)}
            {transcriptionFactors.length > 0 && (<TranscriptionFactor transcriptionFactors={transcriptionFactors} />)}
        </div>

    );
}

export default Regulates;

/**
 *  
                    
                   
                   
 */