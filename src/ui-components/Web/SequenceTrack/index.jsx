import React, { useEffect, useReducer } from 'react'
import Controls from './Controls';
import DrawSequence from './drawingEngine';
import { generateRandomString } from 'ui-components/utils';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FEATURE_TYPES } from './statics';


function initState({ fontSize, color, measure, drawPlaceId }) {
    const id = drawPlaceId ? drawPlaceId : "sequence_" + generateRandomString(7);
    const bpWidth = fontSize * 8 / 12
    return {
        id: id,
        bpHeight: bpWidth * 14 / 8,
        bpWidth: bpWidth,
        fontSize: fontSize,
        canvas: undefined,
        color: color,
        measure: measure,
    }
}

const reducer = (states, action) => {
    return { ...states, ...action };
};



export default function SequenceTrack({
    fontSize = 14,
    controls = false,
    color = false,
    drawPlaceId,
    features = [],
    name = "sequence",
    measure = false,
    sequence,
    width = "100px"
}) {

    const [contextMenu, setContextMenu] = React.useState(null);
    const [state, dispatch] = useReducer(reducer, { fontSize, color, measure, drawPlaceId }, initState);

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
            const canvas = new DrawSequence(state.id, drawPlace, sequence, features, fontSize, state.bpWidth, state.bpHeight)
            if (canvas.draw()) {
                dispatch({ canvas: canvas })
            }
        }
    })


    return (
        <div style={{ display: "flex", alignItems: "center", overflow: "auto" }} >
            {controls && (
                <div style={{ marginRight: "3px", backgroundColor: 'white', position: 'sticky', top: 0, left: 0, zIndex: "60" }}>
                    <Controls state={state} sequence={sequence} dispatch={dispatch} drawPlaceId={state.id} name={name} />
                </div>
            )}
            <div id={state.id} style={{ position: "relative", width: width }} onContextMenu={handleContextMenu}  >
                loading....
            </div>
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={()=>{
                    navigator.clipboard.writeText(sequence);
                    handleClose();
                }}>copy sequence</MenuItem>
            </Menu>
        </div>
    )
}


export{FEATURE_TYPES}