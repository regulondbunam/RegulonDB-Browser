import React from 'react'
import Feature from './Feature'
import Measures from './Measures'
import processFeatures from './processFeatures'

export default function Track({
    handleAnnotation,
    labelColumn,
    track,
    widthTrack,
    colorTrack = "#ffffff",
    originPoint,
    scale,
    measure,
    heightTrack,
    _governmentLabels = {},
    _governmentSymbols = {},
}) {

    const styleTrack = {
        width: widthTrack + "px",
        height: heightTrack + "px",
        backgroundColor: colorTrack,
        margin: "10px 0 10px 0",
        position: "relative",

    }

    const middleLine = {
        width: widthTrack + "px",
        height: "1px",
        position: "absolute",
        top: "50%",
        backgroundColor: "grey"
    }

    const widthMap = Math.abs(track.SEQ_START) * scale
    const middleLineS = {
        width: widthMap + "px",
        height: "2px",
        position: "absolute",
        top: "50%",
        left: originPoint - (widthMap) + "px",
        backgroundColor: "black"
    }

    const features = processFeatures(track.features, _governmentSymbols, _governmentLabels, handleAnnotation, labelColumn)

    return (
        <div id={"div_" + track.id} style={{ ...styleTrack }} >
            <Measures widthMap={widthMap} heightTrack={heightTrack} scale={scale} measure={measure} originPoint={originPoint} />
            <div style={middleLine}></div>
            <div style={middleLineS} />
            <div style={
                {
                    position: "fixed",
                    right: 0
                }
            }>{track.name}</div>
            {features.map((item, i) => <Feature key={"keyFeature_" + i + "_" + track.id + "_" + item.id}
                trackId={track.id}
                feature={item.feature}
                annotation={item.annotation}
                originPoint={originPoint}
                maxScore={item.maxScore}
                scale={scale}
                color={item.color}
                heightTrack={heightTrack}
                isAnnotation={handleAnnotation!==undefined}
            />)}
        </div>
    )
}