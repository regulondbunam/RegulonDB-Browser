import React, {useReducer} from "react";
import reducer from "./actions";
import {COLOR_OPACITY_BY, COLOR_PALETTE_OPTIONS, FEATURE_MAP_COLUMNS} from "./static";
import Draw from "./Draw";

/*
featureMapTrack format
{
"track name":{
{
    "id": "track_id",
    "type": "",
    "name": "araBp",
    "SEQ_START": 0,
    "SEQ_END": 0,
    "features": [
        {
            "id": "feature_id",
            "type": "tfbs",
            "label": "CRP",
            "strand": "reverse",
            "leftEndPosition": -104,
            "rightEndPosition": -83,
            "sequence": "+",
            "score": 0,
            "trackKey": "araBp",
            "identifier": "CRP"
        }
    ]
}
* */

export default function FeatureMap({ featureMapTracks}) {
    const [state, dispatch] = useReducer(reducer, {
        "_version": "0.0.1",
        "_controlState": {
            "draw": false,
            "x": 0,
            "scale": 1,
            "measure": 100,
            "scroll": 0,
            "id_trackFocus": "",
            "label": true,
            "scaleBar": true,
            "variant": "color",
            "limits": {
                start: -1000,
                end: 100,
                origin: 0
            },
            "backgroundColor": "#ffffff",
            "scaleBarColor": "#32617d",
            "scaleBarTextColor": "#ffffff",
            "trackHeight": 50,
            "trackColor": "#c6fffb",
            "handleAnnotation": undefined,
            "labelColumn": FEATURE_MAP_COLUMNS[2],
            "featureBaseColor": "#AA01F9",
            "colorPalette": COLOR_PALETTE_OPTIONS.color,
            "colorOpacity": COLOR_OPACITY_BY.none,
        },
        "title": "feature map",
        "tracks":featureMapTracks,
        "originData":{
            "format":"",
            "raw": ""
        }
    } )
    return <Draw state={state} dispatch={dispatch} />;
}