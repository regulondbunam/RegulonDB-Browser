import React, { useEffect } from 'react'
import { ACTIONS, SCALE_VAL } from '../static'

export default function ScaleBar({
    dispatch,
    state,
    height = 0,
    originPoint = 0,
    widthTrack
}) {
    const { measure, scale /*scaleBar*/ } = state._controlState

    useEffect(() => {
        const handleScale = (e) => {
            if (e.ctrlKey || e.touches?.length > 1) {
                e.preventDefault();
                if (e.deltaY > 0) {
                    if (scale + SCALE_VAL < 100) {
                        dispatch({ type: ACTIONS.SET_SCALE, scale: scale - SCALE_VAL })
                    }
                } else if (e.deltaY < 0) {
                    if (scale - SCALE_VAL > 0) {
                        dispatch({ type: ACTIONS.SET_SCALE, scale: scale + SCALE_VAL })
                    }
                }
            }
        };

        document.addEventListener('wheel', handleScale, { passive: false });
        document.addEventListener('gesturestart', handleScale, { passive: false });
        document.addEventListener('touchmove', handleScale, { passive: false });

        return () => {
            document.removeEventListener('wheel', handleScale, { passive: false });
            document.removeEventListener('gesturestart', handleScale, { passive: false });
            document.removeEventListener('touchmove', handleScale, { passive: false });
        };
    }, [dispatch, state, scale]);
    
    const lines = new Array(Math.trunc(originPoint / measure / scale) + 1).fill(10)
    const lineStyle = {
        height: "10px",
        width: "1px",
        backgroundColor: "#ffffff",
        position: "absolute",
        left: 0,
        bottom: 0
    }

    const labelStyle = {
        color: "#ffffff",
        position: "absolute",
        fontSize: 10,
        left: 0,
        bottom: 10
    }

    const barStyle = {
        height: "25px",
        width: widthTrack + 'px',
        backgroundColor: "#32617d",
        display: "flex",
    }

    

    return (
        <div style={{ position: 'sticky', top: 0, zIndex: 100 }} >
            <div style={{ ...barStyle }} >
                
                {lines.map((n, i) => {
                    const left = originPoint - (measure * i) * scale
                    if (measure > 40 || (measure * i) % 50 === 0) {
                        return (
                            <React.Fragment key={"measure_" + i} >
                                <div style={{ ...labelStyle, left: left - 15 }} >{`${measure * i !== 0 ? "-"+measure * i : "0"}`}</div>
                                <div style={{ ...lineStyle, left: left - 0.5, width: "2px" }} />
                            </React.Fragment>
                        )
                    }
                    return (
                        <React.Fragment key={"measure_" + i} >
                            <div style={{ ...lineStyle, left: left }} />
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}

