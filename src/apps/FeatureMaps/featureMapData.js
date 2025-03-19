import { FEATURE_MAP_COLUMNS, COLOR_PALETTE_OPTIONS, COLOR_OPACITY_BY } from "./static"

export let featureMapData = {
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
        "trackHeight": 50,
        "trackColor": "#ffffff",
        "handleAnnotation": undefined,
        "labelColumn": FEATURE_MAP_COLUMNS[2],
        "featureBaseColor": "#AA01F9",
        "colorPalette": COLOR_PALETTE_OPTIONS.color,
        "colorOpacity": COLOR_OPACITY_BY.none,
    },
    "title": "feature map",
    "tracks":{},
    "originData":{
        "format":"",
        "raw": ""
    }
}