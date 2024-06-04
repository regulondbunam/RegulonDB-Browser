import React from 'react'
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import {FORMATS, OPTIONS} from "./static"


/**
 * React component for rendering options menu for sequence formatting.
 *
 * @param {object} state - The current state of options.
 * @param {function} dispatch - The function to dispatch option changes.
 * @param {string} format - The selected format for the sequence.
 * @returns {React.JSX} - The JSX element representing the options menu.
 */
export default function MenuOptions({ state, dispatch, format }) {
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