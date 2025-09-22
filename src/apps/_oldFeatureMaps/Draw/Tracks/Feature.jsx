import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import Annotation from './Annotation';

const Feature = React.memo(function Features({
    trackId,
    feature = {
        id: "",
        type: "",
        label: "",
        strand: "",
        leftEndPosition: 0,
        rightEndPosition: 0,
        sequence: "",
        score: "0"
    },
    annotation = {
        isSymbol: false,
        label: "",
        symbolPath: "M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495",
        overlap: 0,
        position: 0,
        posLeft: 0,
        posRight: 0,
        size: 0,
    },
    originPoint,
    maxScore,
    scale = 1,
    color = "#ffffff",
    heightTrack = 50,
    isAnnotation = false
}) {
    const featureRef = useRef()
    const [viewTooltip, setViewTooltip] = useState(false)
    const [anchorTooltip, setAnchorTooltip] = useState(false)
    const [positionTooltip, setPositionTooltip] = useState({ top: 0, left: 0 })

    const heightTrackMid = heightTrack / 2
    const { top, left, height, width } = boxSizePositioning(feature, maxScore, heightTrackMid, originPoint, scale)
    const zIndex = 50 - height




    const handleMouseOver = (event) => {
        try {
            featureRef.current.mouseOver = event.target.className + " "
        } catch (error) {
            document.removeEventListener('mouseover', handleMouseOver)
        }

    }
    const handleShowTooltip = (top, left, height, width) => {
        if (!viewTooltip) {
            setViewTooltip(true)
            setPositionTooltip({ top: top + height, left: left + width })
            setAnchorTooltip(true)
            document.addEventListener('mouseover', handleMouseOver);
            setTimeout(() => {
                setAnchorTooltip(false)
                if (!/isFeature/.test(featureRef.current.mouseOver + " ")) {
                    setViewTooltip(false)
                }
                document.removeEventListener('mouseover', handleMouseOver)
            }, 500);
        }
    }
    const handleHideTooltip = () => {
        if (!anchorTooltip) {
            setViewTooltip(false)
        }
    }
    const handleAnchorTooltip = () => {
        setAnchorTooltip(!anchorTooltip)
    }

    const annotationLeft = Math.abs(originPoint + annotation.position * scale) + (annotation.size * annotation.overlap)

    return (
        <>
            {isAnnotation && (
                <div style={{ position: 'absolute', left: left, height: heightTrack, width: annotationLeft - left + 15 }} >
                    <svg width={annotationLeft - left + 15} height={heightTrack} >
                        <line x1={annotationLeft - left + 5} y1={5} x2={width / 2} y2={heightTrackMid} stroke={color} stroke-width="2" />
                        <line x1={annotationLeft - left + 5} y1={0} x2={annotationLeft - left + 5} y2={5} stroke={color} stroke-width="2" />
                    </svg>
                </div>
            )}
            <div
                ref={featureRef}
                onMouseEnter={() => handleShowTooltip(top, left, height, width)}
                onMouseLeave={handleHideTooltip}
            >
                {isAnnotation && (
                    <Annotation trackId={trackId}
                        annotation={annotation}
                        originPoint={originPoint}
                        scale={scale}
                        color={color}
                    />
                )}
                <div
                    className='isFeature'
                    style={{
                        width: width + "px",
                        height: height + "px",
                        position: "absolute",
                        top: top + "px",
                        left: left + "px",
                        backgroundColor: color,
                        zIndex: zIndex
                    }}
                />
                {viewTooltip && (
                    <Tooltip
                        style={{
                            position: "absolute",
                            top: positionTooltip.top + "px",
                            left: positionTooltip.left + "px",
                            zIndex: 100,
                            backgroundColor: '#f5f5f6'
                        }}
                        anchorTooltip={anchorTooltip}
                        onAnchor={handleAnchorTooltip}
                        color={color} feature={feature} />
                )}
            </div>
        </>

    )
})
export default Feature

function boxSizePositioning(feature, maxScore, heightTrackMid, originPoint, scale) {
    const { score, strand } = feature
    let top = 0;
    let left = originPoint + (feature.leftEndPosition * scale)
    let height = heightTrackMid/2
    if (isNumeric(score)  && isNumeric(maxScore)) {
        height = score * heightTrackMid / maxScore
    }
    
    let width = Math.abs(Math.abs(feature.rightEndPosition * scale) - Math.abs(feature.leftEndPosition * scale))
    switch (strand) {
        case "reverse":
            top = heightTrackMid + 2
            break;
        case "both":
            //top = (heightTrackMid + 3) - (score / 2)
            top = heightTrackMid - height
            height *= 2;
            break;
        default:
            top = heightTrackMid - height + 1 //forward is default strand option
            break;
    }
    return { top, left, height, width }
}


const Tooltip = ({
    color,
    feature,
    style,
    anchorTooltip = false,
    onAnchor = () => { }
}) => {
    const [viewInfo, setViewInfo] = useState(true)
    return (
        <Box
            sx={{
                ...style
            }}
            className='isFeature'
        >
            <Paper elevation={3} className='isFeature'>
                <div className='isFeature'
                    style={{
                        backgroundColor: color,
                        padding: "5px",
                        display: "flex",
                        alignItems: 'center',
                    }}
                >
                    <div className='isFeature' style={{ marginRight: "25px" }} >
                        <p className='isFeature sequence' style={{ color: "#000" }} > {feature.label}</p>
                    </div>
                    <div className='isFeature'>
                        <Stack className='isFeature' direction="row" sx={{ alignItems: 'center' }}>
                            <IconButton className='isFeature' aria-label="Anchor" sx={{ color: "#ffffff" }} size="small" onClick={onAnchor} >
                                {anchorTooltip ? <PushPinIcon className='isFeature' fontSize="inherit" /> : <PushPinOutlinedIcon className='isFeature' fontSize="inherit" />}
                            </IconButton>
                            <IconButton className='isFeature' aria-label="View Info" sx={{ color: "#ffffff" }} size="small" onClick={() => { setViewInfo(!viewInfo) }}>
                                {viewInfo ? <KeyboardArrowUpIcon className='isFeature' fontSize="inherit" /> : <KeyboardArrowDownIcon className='isFeature' fontSize="inherit" />}
                            </IconButton>
                        </Stack>
                    </div>
                </div>
                {viewInfo && (
                    <div className='isFeature' >
                        <p className='isFeature' style={{ color: "#000" }} ><b className='isFeature'>Strand:</b>{feature.strand}</p>
                        <p className='isFeature' style={{ color: "#000" }} ><b className='isFeature'>Left Position:</b>{feature.leftEndPosition}</p>
                        <p className='isFeature' style={{ color: "#000" }} ><b className='isFeature'>Right Position:</b>{feature.rightEndPosition}</p>
                        <p className='isFeature' style={{ color: "#000" }} ><b className='isFeature'>Sequence:</b>{feature.sequence}</p>
                        <p className='isFeature' style={{ color: "#000" }} ><b className='isFeature'>Score:</b>{feature.score}</p>
                    </div>
                )}
            </Paper >
        </Box>
    )
}


function isNumeric(value) {
    return typeof value === 'number' && !isNaN(value) && value > 0;
  }