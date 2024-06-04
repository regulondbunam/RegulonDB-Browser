import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DownloadOptions from "./DownloadOptions";
import { FastaSequence, GenebankSequence } from "ui-components/utils/Sequences";
import {FORMATS, OPTIONS} from "./static"
import MenuOptions from "./MenuOptions";



/**
 * Object defining the initial options for sequence display and manipulation.
 *
 * @type {{ color: boolean; countItems: boolean; fasta_CharactersPerLine: number; genbankColumns: number; }}
 */
const initOptions = {
  color: false,
  countItems: false,
  fasta_CharactersPerLine: 60,
  genbankColumns: 6,
};

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
      return initOptions;
    case OPTIONS.color:
      return { ...state, color: !state.color };
    case OPTIONS.countItems:
      return { ...state, countItems: !state.countItems };
    case OPTIONS.fasta_CharactersPerLine:
      return { ...state, fasta_CharactersPerLine: action.value };
    default:
      return state;
  }
}



export default function Sequence({ sequence, _id, name, products }) {
  const [state, dispatch] = React.useReducer(reducerOptions, initOptions);
  const [format, setFormat] = React.useState(FORMATS.fasta);

  /**
   * ID for the sequence element in the DOM.
   *
   * @type {string}
   */
  const idSequence = "sequence_rdb_" + _id;

  /**
   * Event handler for changing the sequence format.
   *
   * @param {object} event - The event object triggered by the format change.
   */
  const handleChange = (event) => {
    setFormat(event.target.value);
  };

  /**
   * Title for the sequence panel.
   *
   * @type {string}
   */
  let title = "";

  /**
   * JSX element representing the sequence content.
   *
   * @type {React.JSX}
   */
  let domSequence = <></>;
  switch (format) {
    case FORMATS.genbank:
      title = `gene: ${name}; product: ${products
        .map(
          /**
           * Generates the product name for the Genbank format sequence.
           *
           * @param {object} product - The product object.
           * @returns {string} - The product name.
           */
          (product) => product.name
        )
        .join(", ")}`;
      domSequence = (
        <GenebankSequence
          id={idSequence}
          sequence={sequence}
          color={state.color}
          countItems={state.countItems}
          title={title}
        />
      );
      break;
    default:
      title = `RegulonDB|${_id}|gene: ${name}|product: ${products
        .map(
          /**
           * Generates the product name for the Genbank format sequence.
           *
           * @param {object} product - The product object.
           * @returns {string} - The product name.
           */
          (product) => product.name
        )
        .join(", ")}`;
      domSequence = (
        <FastaSequence
          id={idSequence}
          sequence={sequence}
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
          sx={{ m: 1, minWidth: 120, margin: "0 5px 0 0" }}
        >
          <InputLabel sx={{ fontSize: 14 }}>Format</InputLabel>
          <Select
            sx={{ height: 30 }}
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