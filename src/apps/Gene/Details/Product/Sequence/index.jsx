import React, { useReducer } from 'react'
import { Typography } from '@mui/material'
import { ProteinSequence } from 'ui-components/utils/Sequences'
import Controls from './Controls'
import { OPTION } from './static'
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
            return { ...state, viewMotifs: !state.viewMotifs };
        /*
      case OPTIONS.countItems:
        return { ...state, countItems: !state.countItems };
      case OPTIONS.fasta_CharactersPerLine:
        return { ...state, fasta_CharactersPerLine: action.value };
      case OPTIONS.setFragment:
        return {
          ...state,
          name: action.fragment.name,
          sequence: action.fragment.sequence,
          indexFragment: action.indexFragment,
        };
        */
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
            color = generateUniquePastelColor(colors, 150).toRGBA;
            colors.push(color);
            colorMotifs[motif.type] = color;
        }


        // Asignar el color al motif y almacenarlo en newMotifs
        newMotifs[motif._id] = { ...motif, color: color };

        // Comprobar y actualizar las posiciones del tag si son enteros seguros
        if (Number.isSafeInteger(motif.leftEndPosition) && Number.isSafeInteger(motif.rightEndPosition)) {
            motifTagPositions[motif.leftEndPosition] =
                (motifTagPositions[motif.leftEndPosition] || '') + `<span id="motif_${motif._id}">`;

            motifTagPositions[motif.rightEndPosition] =
                (motifTagPositions[motif.rightEndPosition] || '') + `<div class="tooltiptext" id="motif_tooltip_${motif._id}"></div></span>`;
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
    return (
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
