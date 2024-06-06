import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import DownloadOptions from "./DownloadOptions";
import { FastaSequence, GenebankSequence } from "ui-components/utils/Sequences";
import {FORMATS, OPTIONS} from "./static"
import MenuOptions from "./MenuOptions";


/**
 * Reducer function for managing sequence display and manipulation options.
 *
 * @param {object} state - The current state.
 * @param {object} action - The action object describing the change.
 * @returns {object} - The new state after applying the action.
 */
function reducerOptions(state, action) {
  switch (action.type) {
    case OPTIONS.reset:
      return {
        ...state,
        color: false,
        countItems: false,
        fasta_CharactersPerLine: 60,
        genbankColumns: 6,
      };
    case OPTIONS.color:
      return { ...state, color: !state.color };
    case OPTIONS.countItems:
      return { ...state, countItems: !state.countItems };
    case OPTIONS.fasta_CharactersPerLine:
      return { ...state, fasta_CharactersPerLine: action.value };
      case OPTIONS.setFragment:
        return{...state,name: action.fragment.name, sequence: action.fragment.sequence, indexFragment: action.indexFragment}
    default:
      return state;
  }
}


function initState({ sequence, _id, name, products, fragments }) {
  let _products = products.map((product) => product.name).join(", ")
  return {
    indexFragment: -1,
    name : name,
    _products: _products,
    sequence: sequence,
    color: false,
    countItems: false,
    fasta_CharactersPerLine: 60,
    genbankColumns: 6,
  }
}

function setTitle(_id,name,_products) {
  return `RegulonDB ${_id} | gene: ${name} | product: ${_products} `
}



export default function Sequence({ sequence, _id, name, products, fragments }) {
  const [state, dispatch] = React.useReducer(reducerOptions,{ sequence, _id, name, products, fragments },initState);
  const [format, setFormat] = React.useState(FORMATS.fasta);

  const idSequence = "sequence_rdb_" + _id;

  const handleChange = (event) => {
    setFormat(event.target.value);
  };

  const handleSelectSequence = (event)=>{
    const indexFragment = event.target.value
    let fragment = indexFragment === -1 ? {name: name, sequence: sequence} : fragments[indexFragment]
    dispatch({type: OPTIONS.setFragment, fragment: fragment, indexFragment: indexFragment})
  }

  let domSequence = <></>;
  let title = setTitle(_id,state.name,state._products)
  switch (format) {
    case FORMATS.genbank:
      domSequence = (
        <GenebankSequence
          id={idSequence}
          sequence={state.sequence}
          color={state.color}
          countItems={state.countItems}
          title={title}
        />
      );
      break;
    default:
      domSequence = (
        <FastaSequence
          id={idSequence}
          sequence={state.sequence}
          color={state.color}
          countItems={state.countItems}
          title={title}
          charactersPerLine={state.fasta_CharactersPerLine}
        />
      );
      break;
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", margin: "12px" }}>
      <FormControl
          sx={{ m: 1, minWidth: 200, margin: "0 5px 0 0" }}
        >
          <InputLabel sx={{ fontSize: 16 }}>Set Sequence</InputLabel>
          <Select
            sx={{ height: 35 }}
            labelId="demo-select-sequence-label"
            id="demo-select-sequence"
            value={state.indexFragment}
            label="setSequence"
            onChange={handleSelectSequence}
          >
            <MenuItem value={-1}>All fragments ({name})</MenuItem>
            {fragments.map((f,index)=> <MenuItem value={index}>{f.name}</MenuItem>)}
          </Select>
        </FormControl>
        <Divider orientation="vertical" sx={{height: "35px", mr:"5px"}} />
        <FormControl
          sx={{ m: 1, minWidth: 120, margin: "0 5px 0 0" }}
        >
          <InputLabel sx={{ fontSize: 14 }}>Format</InputLabel>
          <Select
            sx={{ height: 35 }}
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={format}
            label="format"
            onChange={handleChange}
          >
            <MenuItem value={FORMATS.fasta}>Fasta</MenuItem>
            <MenuItem value={FORMATS.genbank}>Genbank</MenuItem>
          </Select>
        </FormControl>
        <MenuOptions state={state} dispatch={dispatch} format={format} />
        <DownloadOptions
          format={format}
          sequence={sequence}
          title={`${_id}_sequence`}
          idSequence={idSequence}
        />
      </div>
      <div style={{overflow: 'auto', maxHeight: "700px", display:"flex", justifyContent:"center"}} >{domSequence}</div>
    </div>
  );
}