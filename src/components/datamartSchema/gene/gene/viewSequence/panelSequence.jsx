import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { FastaSequence, GenebankSequence } from "../../../../sequence";
import type from "cytoscape/src/selector/type";

/**
 * Object defining supported sequence formats.
 *
 * @type {{ fasta: string; genbank: string; }}
 */
const FORMATS = {
  fasta: "fasta",
  genbank: "genbank",
};

/**
 * Object defining various options for sequence display and manipulation.
 *
 * @type {{ reset: number; color: number; countItems: number; fasta_CharactersPerLine: number; genbank_Columns: number; }}
 */
const OPTIONS = {
  reset: -1,
  color: 0,
  countItems: 1,
  fasta_CharactersPerLine: 2,
  genbank_Columns: 3,
};

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

/**
 * React component for displaying and managing a sequence panel.
 * @export
 * @param {{ sequence: any; _id: any; name: any; products: any; }} { sequence, _id, name, products }
 * @returns {React.JSX}
 */
export default function PanelSequence({ sequence, _id, name, products }) {
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
          type="nucleotid"
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
          type="nucleotid"
        />
      );
      break;
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", margin: "8px" }}>
        <p style={{ fontWeight: "bold", marginRight: "5px" }}>Sequence:</p>
        <FormControl
          sx={{ m: 1, minWidth: 120, margin: "0 5px 0 0" }}
          size="small"
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
      <div>{domSequence}</div>
    </div>
  );
}

/**
 * React component for rendering options menu for sequence formatting.
 *
 * @param {object} state - The current state of options.
 * @param {function} dispatch - The function to dispatch option changes.
 * @param {string} format - The selected format for the sequence.
 * @returns {React.JSX} - The JSX element representing the options menu.
 */
function MenuOptions({ state, dispatch, format }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  /**
   * Event handler for opening the options menu.
   *
   * @param {object} event - The click event.
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Description placeholder
   * Event handler for closing the options menu.
   *
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Function to handle changing an option.
   *
   * @param {number} option - The option to change.
   * @param {boolean|number} value - The new value for the option.
   */
  const handleChangeOption = (option, value) => {
    dispatch({ type: option, value: value });
  };
  //console.log(state);
  return (
    <div style={{ marginRight: "5px" }}>
      <Button
        id="demo-customized-button"
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ height: 30 }}
      >
        Options
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <FormControlLabel
            control={
              <Switch
                checked={state.color}
                onChange={
                  /**
                   * Event handler for toggling color option.
                   */ () => {
                    handleChangeOption(OPTIONS.color);
                  }
                }
              />
            }
            label="Color"
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <FormControlLabel
            control={
              <Switch
                checked={state.countItems}
                onChange={
                  /**
                   * Event handler for toggling count items option.
                   */ () => {
                    handleChangeOption(OPTIONS.countItems);
                  }
                }
              />
            }
            label="Count Items"
          />
        </MenuItem>
        <Divider />
        {format === FORMATS.fasta && (
          <MenuItem>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>
                <b>Characters per line</b>
              </p>
              <div>
                <TextField
                  id="outlined-number"
                  type="number"
                  size="small"
                  value={state.fasta_CharactersPerLine}
                  onChange={
                    /**
                     * Event handler for changing the characters per line option for Fasta format.
                     *
                     * @param {object} event - The event object triggered by the input change.
                     */
                    (event) => {
                      handleChangeOption(
                        OPTIONS.fasta_CharactersPerLine,
                        event.target.value
                      );
                    }
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ maxWidth: 75, marginRight: "5px" }}
                />
                <Button
                  id="demo-customized-button"
                  variant="outlined"
                  disableElevation
                  onClick={handleClose}
                  sx={{ height: 40 }}
                >
                  Ok
                </Button>
              </div>
            </div>
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleClose}>
          <Button
            variant="outlined"
            size="small"
            onClick={
              /**
               * Event handler for resetting options to their initial state.
               */
              () => {
                handleChangeOption(OPTIONS.reset);
              }
            }
          >
            Reset Options
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
}

/**
 * React component for displaying an alert message.
 *
 * @param {object} props - The props to pass to the underlying `MuiAlert` component.
 * @param {React.Ref} ref - A ref to attach to the `MuiAlert` component.
 * @returns {React.JSX} - The JSX element representing the alert.
 */
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * React component for handling download options for a sequence.
 *
 * @param {string} format - The selected format for the sequence.
 * @param {string} sequence - The sequence data to download or copy.
 * @param {string} title - The title associated with the sequence.
 * @param {string} idSequence - The ID of the sequence element in the DOM.
 * @returns {React.JSX} - The JSX element representing the download options.
 */
function DownloadOptions({ format, sequence, title, idSequence }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [snackOpen, setSnackOpen] = React.useState(false);

  /**
   * Boolean flag indicating whether the options menu is open.
   *
   * @type {boolean}
   */
  const openMenu = Boolean(anchorEl);

  /**
   * Event handler function for opening the snack bar to display a message.
   */
  const handleOpenSnack = () => {
    setSnackOpen(true);
  };

  /**
   * Event handler function for closing the snack bar.
   *
   * @param {object} event - The event object.
   * @param {string} reason - The reason for the snack bar closure.
   */
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  /**
   * Event handler function for opening the options menu.
   *
   * @param {object} event - The click event.
   */
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Event handler function for closing the options menu.
   */
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  /**
   * Event handler function for initiating the download of the sequence as a file.
   *
   * @returns {void}
   */
  const download = () => {
    /**
     * DOM element representing the sequence with the specified ID.
     * @type {HTMLElement | null}
     */
    let e = document.getElementById(idSequence);
    if (e.innerText) {
      /**
       * Blob containing the sequence data.
       * @type {Blob}
       */
      const blob = new Blob([e.innerText]);
      /**
       * Dynamically created anchor element for downloading the sequence.
       * @type {HTMLAnchorElement}
       */
      const element = document.createElement("a");
      element.href = window.URL.createObjectURL(blob);
      element.download = `${title}.${format}`;
      document.body.appendChild(element);
      element.click();
      element.remove();
    }
  };

  return (
    <div style={{ marginRight: "5px" }}>
      <Button
        id="demo-customized-button"
        variant="outlined"
        disableElevation
        onClick={handleClickMenu}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ height: 30 }}
      >
        Download
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => {
            navigator.clipboard.writeText(sequence);
            handleOpenSnack();
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>copy sequence</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            download();
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <ArticleOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{`sequence ${format} file`}</ListItemText>
        </MenuItem>
      </Menu>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={snackOpen}
          autoHideDuration={1000}
          onClose={handleCloseSnack}
        >
          <Alert
            onClose={handleCloseSnack}
            severity="success"
            sx={{ width: "100%" }}
          >
            Sequence copied to clipboard!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
