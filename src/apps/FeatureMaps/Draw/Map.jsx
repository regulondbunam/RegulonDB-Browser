import React, { useState, useEffect, useRef, useId } from 'react'
import Tracks from "./Tracks";
import ScaleBar from "./ScaleBar";

export default function Map({ state, dispatch }) {
    const mapRef = useRef(null);
    const idMap = useId()
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    /*_-_-_-_-_-_-_-_-_-_-_-_-constants-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_ */
    const { limits, scale, backgroundColor } = state._controlState;
    const wTrack = (Math.abs(limits.start * scale) + Math.abs(limits.end * scale))
    const widthTrack = wTrack * ((dimensions.width) / wTrack) * scale;
    const originPoint =
        widthTrack - Math.abs(limits.end * scale) + limits.origin * scale;

    const handleMouseDown = (e) => {
        if (!/isFeature/.test(e.target.className + " ")) {
            if (!mapRef.current) return;
            mapRef.current.startX = e.pageX - mapRef.current.offsetLeft
            mapRef.current.startScrollLeft = mapRef.current.scrollLeft
            mapRef.current.style.cursor = 'grabbing'
        }
    };
    const handleMouseUp = (e) => {
        if (!mapRef.current) return;
        if (!/isFeature/.test(e.target.className + " ")) {
            mapRef.current.style.cursor = 'grab'
        }
    }
    const handleMouseMove = (e) => {
        if (/isFeature/.test(e.target.className + " ")) {
            mapRef.current.style.cursor = 'auto'
        }
        if (!mapRef.current) return;
        if (mapRef.current.style.cursor === 'grabbing') {
            const x = e.pageX - mapRef.current.offsetLeft;
            const walkX = (x - mapRef.current.startX) * 1;
            mapRef.current.scrollLeft = mapRef.current.startScrollLeft - walkX;
        }
    }

    useEffect(() => {
        const element = mapRef.current;
        if (!element) return;
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });
            }
        });
        resizeObserver.observe(element);
        return () => resizeObserver.unobserve(element);
    }, []);

    return (
        <div
            id={idMap}
            ref={mapRef}
            style={{
                width: "80%",
                height: "calc(100vh - 184px)",
                overflow: 'auto',
                cursor: 'grab',
                background: backgroundColor,
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {dimensions.width > limits.end && (
                <>
                    <ScaleBar
                        {...dimensions}
                        widthTrack={widthTrack}
                        limits={limits}
                        originPoint={originPoint}
                        state={state}
                        dispatch={dispatch}
                    />
                    <Tracks
                        {...dimensions}
                        widthTrack={widthTrack}
                        tracks={state.tracks}
                        limits={limits}
                        originPoint={originPoint}
                        state={state}
                        dispatch={dispatch}
                    />

                </>
            )}
        </div>
    )
}
