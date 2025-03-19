import React from 'react'
import Paper from '@mui/material/Paper';
import { ACTIONS, HANDLE_ANNOTATIONS, FEATURE_MAP_COLUMNS } from '../static'
export default function Annotations({
    state,
    dispatch
}) {
    const { labelColumn } = state._controlState  
    const features = state.tracks._governmentLabels
    return (
        <div style={{marginLeft: '10px'}}  >
            <Paper sx={{height: "calc(100vh - 184px)",}} elevation={3}>
                <h3 style={{margin: 0}} >Labels by {labelColumn}</h3>
                {features && Object.keys(features).map((key) => {
                    return (<div key={"annotationFeature_" + key} style={{ display: 'flex' }} >
                        <div style={{ backgroundColor: features[key], width: "20px", height: "20px" }} />
                        <div><p className='sequence' style={{ color: 'black' }} >{key}</p></div>
                    </div>)
                })}
            </Paper>

        </div>
    )
}