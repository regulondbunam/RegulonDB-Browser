import React, { useReducer } from 'react'
import { Typography } from '@mui/material'
import { ProteinSequence } from 'ui-components/utils/Sequences'
import Controls from './Controls'
import { OPTION } from './static'

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
        return {...state, fontSize: action.fontSize}
    case OPTION.color:
      return { ...state, color: !state.color };
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

function initState({ motifs }) {
    let newMotifs = {}
    return {
        showMotifs:[],
        viewMotifs:false,
        color:false,
        fontSize: 12
    };
  }

export default function Sequence({sequence, motifs, name}) {
  const [state, dispatch] = useReducer(reducer,{motifs},initState)
  return (
    <div style={{marginTop: "10px"}} >
      <Typography variant='h4' fontSize={"18px"} sx={{fontWeight: "400"}} >Sequence</Typography>
      <Controls state={state} dispatch={dispatch} />
      <div style={{overflow: "auto"}} >
        <div style={{maxWidth: "1000px"}}>
        <ProteinSequence fontSize={state.fontSize+"px"} sequence={sequence} title={'Product: '+name} motifs={state.showMotifs} viewMotifs={state.viewMotifs}/>
        </div>
      </div>
      <Typography variant='h4' fontSize={"18px"} sx={{fontWeight: "400"}} >Motifs</Typography>
    </div>
  )
}
