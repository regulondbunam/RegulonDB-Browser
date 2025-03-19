import React from 'react';
import Track from './Track';
import { FixedSizeList as List } from 'react-window';

export default function Tracks({
    dispatch,
    state,
    tracks = {},
    originPoint,
    widthTrack,
    height
}) {
    const { scale, measure, trackHeight, trackColor, handleAnnotation, labelColumn } = state._controlState;
    const trackEntries = Object.keys(tracks).filter(
        key => key !== "_governmentLabels" && key !== "_governmentSymbols"
    );

    const renderTrack = ({ index, style }) => {
        const key = trackEntries[index];
        const track = tracks[key];
        return (
            <div style={style} key={"key_" + key + "_" + track.id}>
                <Track
                    handleAnnotation={handleAnnotation}
                    labelColumn={labelColumn}
                    track={track}
                    widthTrack={widthTrack}
                    originPoint={originPoint}
                    scale={scale}
                    colorTrack={trackColor}
                    measure={measure}
                    heightTrack={trackHeight}
                    _governmentLabels={tracks._governmentLabels}
                    _governmentSymbols={tracks._governmentSymbols}
                />
            </div>
        );
    };


    return (
        <List
            height={height - 45}
            itemCount={trackEntries.length}
            itemSize={trackHeight + 20}
            width={widthTrack}
            style={{ overflowX: 'hidden' }}
        >
            {renderTrack}
        </List>
    );
}