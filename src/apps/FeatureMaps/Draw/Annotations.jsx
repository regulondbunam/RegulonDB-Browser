import React from 'react'
import Paper from '@mui/material/Paper';
import {AnnotationColumnSelect} from '../DrawOptions/Annotations'
import { ACTIONS, HANDLE_ANNOTATIONS, FEATURE_MAP_COLUMNS } from '../static'
import {SimpleSquareColorPicker} from "../../../components/ui-components/ColorPiker";

export default function Annotations({
    state,
    dispatch
}) {
    const features = state.tracks._governmentLabels

    const handleCahngeFeatureColor = (feature, color)=>{
        dispatch({type: ACTIONS.SET_FEATURE_COLOR, feature: feature, color: color})
    }

    return (
        <Paper elevation={3}>
            <div style={{ padding: "10px" }} >
                <div>
                    <p>Labes by</p>
                    <AnnotationColumnSelect state={state} dispatch={dispatch} />
                </div>
                {features && Object.keys(features).map((key) => {
                    const color = features[key]
                    return (
                        <div key={"annotationFeature_" + key} style={{ display: 'flex', margin: "5px", gap:"2px" }} >
                            <SimpleSquareColorPicker color={color} handleSetColor={(newColor)=>{handleCahngeFeatureColor(key,newColor)}} />
                            <div><p className='sequence' style={{ color: 'black' }} >{key}</p></div>
                        </div>
                    )
                })}
            </div>

        </Paper>
    )
}