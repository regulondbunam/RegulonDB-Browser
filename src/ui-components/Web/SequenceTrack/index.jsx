import React, { useEffect, useReducer } from 'react'
import Controls from './Controls';
import DrawSequence from './drawingEngine';
import { generateRandomString } from 'ui-components/utils';


function initState({ bpWidth, color, measure, drawPlaceId }) {
    const id = drawPlaceId ? drawPlaceId : "sequence_"+generateRandomString(7);
    return {
        id: id,
        bpHeight: bpWidth * 14 / 8,
        bpWidth: bpWidth,
        canvas: undefined,
        color: color,
        measure: measure,
    }
}

const reducer = (states, action) => {
    return { ...states, ...action };
};



export default function SequenceTrack({
    bpWidth = 8,
    controls = false,
    color = false,
    drawPlaceId,
    features = [],
    idContainer,
    name = "sequence",
    measure = false,
    sequence,
}) {

    const [contextMenu, setContextMenu] = React.useState(null);
    const [state, dispatch] = useReducer(reducer, { bpWidth, color, measure, drawPlaceId }, initState);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                // Other native context menus might behave different.
                // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    useEffect(() => {
        const drawPlace = document.getElementById(state.id)
        if (drawPlace && !state.canvas) {
            drawPlace.innerHTML = "";
            const canvas = new DrawSequence(state.id, drawPlace, sequence, features, state.bpWidth, state.bpHeight)
            if (canvas.draw()) {
                dispatch({ canvas: canvas })
            }
        }
        if (state.canvas) {
            console.log("draw");
        }
    })


    return (
        <div style={{ display: "flex", alignItems: "center", overflow: "auto" }} >
            {controls && (
                <div style={{ marginRight: "3px", backgroundColor: 'white', position: 'sticky', top: 0, left: 0, zIndex: "60" }}>
                    <Controls state={state} sequence={sequence} dispatch={dispatch} drawPlaceId={state.id} name={name} />
                </div>
            )}
            <div id={state.id} style={{ position: "relative", width: "100%" }} onContextMenu={handleContextMenu}  >
                loading....
            </div>
        </div>
    )
}
