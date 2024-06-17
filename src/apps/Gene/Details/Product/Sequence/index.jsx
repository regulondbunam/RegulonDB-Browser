import React, { useReducer } from 'react'
import { Typography } from '@mui/material'
import { ProteinSequence } from 'ui-components/utils/Sequences'
import Controls from './Controls'
import { OPTION, handleHighlightMotif, unHandleHighlightMotif } from './static'
import { generateUniquePastelColor } from 'ui-components/utils'
import Motifs from './Motifs'

function reducer(state, action) {
    switch (action.type) {
        case OPTION.reset:
            return {
                ...state,
                color: false,
                countItems: false,
                fasta_CharactersPerLine: 60,
                genbankColumns: 6,
            };
        case OPTION.fontSize:
            return { ...state, fontSize: action.fontSize }
        case OPTION.viewMotifs:
            const ids = [...Object.keys(state.motifs)]

            if (state.viewMotifs) {
                ids.forEach(id=>unHandleHighlightMotif(id))
                return { ...state, viewMotifs: false, showMotifsId: [] };
            }else{
                ids.forEach(id=>handleHighlightMotif(id,state.motifs[id].color))
                return { ...state, viewMotifs: true, showMotifsId: ids };
            }
        case OPTION.highlightMotif:{
            return {...state, showMotifsId:[...state.showMotifsId, action.id]}
        }
        case OPTION.unHighlightMotif:{
            let ids = state.showMotifsId
            let hIndex = state.showMotifsId.findIndex(id=>id===action.id)
            if (hIndex > -1) {
                ids.splice(hIndex,1)
            }
            return {...state, showMotifsId:ids}
        }
        default:
            return state;
    }
}

function initState({ motifs = [] }) {
    let newMotifs = {}
    let colorMotifs = {}
    let colors = []
    let motifTagPositions = []
    motifs.forEach(motif => {
        // Obtener o generar color para el tipo de motif
        let color = colorMotifs[motif.type];
        if (!color) {
            color = generateUniquePastelColor(colors, 150).toHex;
            colors.push(color);
            colorMotifs[motif.type] = color;
        }


        // Asignar el color al motif y almacenarlo en newMotifs
        newMotifs[motif._id] = { ...motif, color: color };

        // Comprobar y actualizar las posiciones del tag si son enteros seguros
        if (Number.isSafeInteger(motif.leftEndPosition) && Number.isSafeInteger(motif.rightEndPosition)) {
            let left = motif.leftEndPosition-1
            let right = motif.rightEndPosition-1
            if(motif.leftEndPosition===motif.rightEndPosition){
                left = motif.leftEndPosition-2
            }
            motifTagPositions[left] =
                (motifTagPositions[left] || '') + `<span id="motif_${motif._id}">`;

            motifTagPositions[right] =
                (motifTagPositions[right] || '') + `<div class="tooltiptext" id="motif_tooltip_${motif._id}"></div></span>`;
        }
    });
    return {
        showMotifsId: [],
        motifs: newMotifs,
        motifTagPositions: motifTagPositions,
        viewMotifs: false,
        fontSize: 12,
        colors: colors,
    };
}

export default function Sequence({ sequence, motifs, name }) {
    const [state, dispatch] = useReducer(reducer, { motifs }, initState)
    //console.log(state);
    return  (
        <div style={{ marginTop: "10px" }} >
            <Typography variant='h4' fontSize={"18px"} sx={{ fontWeight: "400" }} >Sequence</Typography>
            <Controls state={state} dispatch={dispatch} />
            <div style={{ overflow: "auto" }} >
                <div style={{ maxWidth: "1000px" }}>
                    <ProteinSequence fontSize={state.fontSize + "px"} sequence={sequence} title={'Product: ' + name} motifTagPositions={state.motifTagPositions} />
                </div>
            </div>
            <Motifs state={state} dispatch={dispatch} />
        </div>
    )
}
