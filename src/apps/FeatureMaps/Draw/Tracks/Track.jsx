import React, {useEffect, useRef, useState} from 'react'
import Feature from './Feature'
import Measures from './Measures'
import processFeatures from './processFeatures'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [offsetRight, setOffsetRight] = useState(0);
    const [labelLeft, setLabelLeft] = useState(true)
    const labelRef = useRef(null)
    const offset = labelLeft ? offsetLeft : offsetRight

    useEffect(() => {
        if(offsetRight === 0){
            const container = document.getElementById("canvaMapFeatureMaps")
            if (!container) return;
            if (!labelRef?.current) return;
            const rectContainer = container.getBoundingClientRect();
            const rectLabel = labelRef.current.getBoundingClientRect();
            const widthLabel = rectLabel.width;
            const widthContainer = rectContainer.width;
            setOffsetRight(widthContainer - widthLabel - 20)
        }
    }, [offsetRight]);

    useEffect(() => {
        const container = document.getElementById("canvaMapFeatureMaps")
        if (!container) return;
        const handleScroll = () => {
            const scrollX = container.scrollLeft;
            const rectContainer = container.getBoundingClientRect();
            const widthContainer = rectContainer.width;
            const rectLabel = labelRef.current.getBoundingClientRect();
            const widthLabel = rectLabel.width;

            setOffsetLeft(scrollX)
            setOffsetRight(scrollX + widthContainer - widthLabel -20)
        };

        if (container && labelRef.current) {
            container.addEventListener("scroll", handleScroll);
        }

        return () => container.removeEventListener("scroll", handleScroll);

    },[labelLeft])

    const handleChangePositon = () => {
        setLabelLeft(!labelLeft)
    }

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

    const _features = track.features.filter(item => item !== null && item !== undefined);

    const features = processFeatures(_features, _governmentSymbols, _governmentLabels, handleAnnotation, labelColumn)


    return (
        <div id={"div_" + track.id} style={{ ...styleTrack }} >
            <Measures widthMap={widthMap} heightTrack={heightTrack} scale={scale} measure={measure} originPoint={originPoint} />
            <div style={middleLine}></div>
            <div style={middleLineS} />
            <div ref={labelRef}
                 style={{
                     position: "relative",
                     transform: `translateX(${offset}px)`,
                     width: "fit-content",
                     cursor: "pointer"
                 }}
                 onClick={handleChangePositon}
            >{track.name}</div>
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