import React, { useState } from "react";
import { Accordion, DataVerifier } from "../../../components/ui-components";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import MenuList from "@mui/material/MenuList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ForwardIcon from "@mui/icons-material/Forward";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Check from "@mui/icons-material/Check";
import ListItemIcon from "@mui/material/ListItemIcon";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { HELP } from "./definitions";
import { useSearchParams } from "react-router-dom";

import {
  RANGE,
  secureRange,
  STATE_FORM,
  SECURE_RANGE,
  FORM_ACTIONS,
  STRAND,
  GE_DEFs,
} from "./definitions";
import { Box } from "@mui/material";

export default function Form({ state = { ...STATE_FORM }, dispatch }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isAll, setIsAll] = useState(false);
  const geMenu = Boolean(anchorEl);
  const [searchParams] = useSearchParams();
  const organismId = searchParams.get("organism");
  state.organismId = organismId;
  const handleGEMenu = (event) => {
    if (anchorEl === null) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };
  const handleCloseGEMenu = (event) => {
    setAnchorEl(null);
  };

  const handleSelectAllGeneticElement = () => {
    let elements = [];
    if (isAll) {
      GE_DEFs.forEach((ge) => {
        elements.push({ ...ge, isCheck: false });
      });
    } else {
      GE_DEFs.forEach((ge) => {
        elements.push({ ...ge, isCheck: true });
      });
    }
    dispatch({ type: FORM_ACTIONS.setGeneticsElements, value: elements });
    setIsAll(!isAll);
  };

  const handleSelectGeneticElement = (element, index) => {
    let geElements = [...state.objectType];
    geElements[index] = { ...element, isCheck: !element.isCheck };
    dispatch({ type: FORM_ACTIONS.setGeneticsElements, value: geElements });
    if (state.draw) {
      dispatch({ type: FORM_ACTIONS.refresh });
      setTimeout(() => {
        dispatch({ type: FORM_ACTIONS.draw });
      }, 200);
    }
  };

  return (
    <div>
      <div style={{display:"flex", flexDirection: "column", alignItems: "center"}}  >
          <Typography variant="body1" >{HELP}</Typography>
          <Typography variant="body1" gutterBottom >
          The tool accepts positions between 1 and 4,639,676, with a maximum range of up to 250,000 base pairs.
          </Typography>

        </div>
      <Accordion
        title={
          <>
            <p>
              <b>DTT parameters</b>
            </p>
          </>
        }
      >
        
        <div style={{ display: "flex", columnGap: "20px" }}>
          <div className="genomePositionSelect">
            <Box sx={{display: "flex"}}>
            <Typography variant="button" display="block">
              Genome Position
            </Typography>
            </Box>
            <div
              style={{
                display: "flex",
                columnGap: "5px",
                alignItems: "center",
              }}
            >
              <Tooltip title="Absolute genome left position">
                <TextField
                  id="rdb_input_leftEndPosition"
                  disabled={state.draw}
                  size="small"
                  label="Left Position"
                  type="number"
                  InputProps={{
                    inputProps: {
                      step: "any",
                    },
                  }}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  value={
                    state.leftEndPosition === 0 ? "" : state.leftEndPosition
                  }
                  onChange={(event) => {
                    if (!/^\d*$/.test(event.target.value)) {
                      return null;
                    }
                    if (event.target.value < RANGE.min) {
                      return null;
                    }
                    if (event.target.value > RANGE.max) {
                      return null;
                    }
                    //event.target.value
                    if (DataVerifier.isValidNumber(event.target.value)) {
                      dispatch({
                        type: FORM_ACTIONS.setLeftPosition,
                        value: event.target.value,
                      });
                    }
                  }}
                  sx={{ width: 120 }}
                />
              </Tooltip>
              <Tooltip title="Absolute genome right position">
                <TextField
                  id="rdb_input_rightEndPosition"
                  disabled={state.draw}
                  size="small"
                  InputProps={{
                    style: {
                      // Estilos personalizados para ocultar los botones de incremento y decremento
                      WebkitAppearance: "none",
                      appearance: "none",
                    },
                  }}
                  label="Right Position"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  type="number"
                  value={
                    state.rightEndPosition === 0 ? "" : state.rightEndPosition
                  }
                  onChange={(event) => {
                    if (!/^\d*$/.test(event.target.value)) {
                      return null;
                    }
                    if (event.target.value < RANGE.min) {
                      return null;
                    }
                    if (event.target.value > RANGE.max) {
                      return null;
                    }
                    if (DataVerifier.isValidNumber(event.target.value)) {
                      dispatch({
                        type: FORM_ACTIONS.setRightPosition,
                        value: event.target.value,
                      });
                    }
                  }}
                  sx={{ width: 120 }}
                />
              </Tooltip>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Strand</InputLabel>
                <Tooltip placement="top" title="select strand">
                  <Select
                    value={state.strand}
                    size="small"
                    label="Strand"
                    onChange={(event) => {
                      dispatch({
                        type: FORM_ACTIONS.setStrand,
                        value: event.target.value,
                      });
                    }}
                    sx={{ width: 80, height: 40 }}
                  >
                    <MenuItem value={STRAND.both}>
                      <Tooltip title={STRAND.both} placement="right">
                        <CompareArrowsIcon />
                      </Tooltip>
                    </MenuItem>
                    <MenuItem value={STRAND.forward}>
                      <Tooltip title={STRAND.forward} placement="right">
                        <ForwardIcon />
                      </Tooltip>
                    </MenuItem>
                    <MenuItem value={STRAND.reverse}>
                      <Tooltip title={STRAND.reverse} placement="right">
                        <ForwardIcon sx={{ transform: "rotate(180deg)" }} />
                      </Tooltip>
                    </MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
            </div>
            
          </div>
          <div>
            <Typography variant="button" display="block">
              Display options
            </Typography>
            <div>
              <Button
                variant="outlined"
                endIcon={
                  geMenu ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                }
                onClick={handleGEMenu}
              >
                Genetic Elements
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={geMenu}
                onClose={handleCloseGEMenu}
              >
                <MenuList dense>
                  <MenuItem onClick={handleSelectAllGeneticElement}>
                    <ListItemIcon>{isAll ? <Check /> : <></>}</ListItemIcon>
                    ALL
                  </MenuItem>
                  {state.objectType.map((element, index) => {
                    return (
                      <MenuItem
                        key={element.label + "_" + index}
                        onClick={() => {
                          handleSelectGeneticElement(element, index);
                        }}
                      >
                        <ListItemIcon>
                          {element.isCheck && <Check />}
                        </ListItemIcon>
                        {element.label}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {state.draw ? (
              <Button
                sx={{ marginRight: "2px" }}
                variant="contained"
                size="medium"
                onClick={() => {
                  dispatch({ type: FORM_ACTIONS.clean });
                }}
              >
                Clean
              </Button>
            ) : (
              <Button
                sx={{ marginRight: "5px" }}
                variant="contained"
                size="medium"
                color="secondary"
                onClick={() => {
                  if (
                    secureRange(state.leftEndPosition, state.rightEndPosition)
                  ) {
                    dispatch({ type: FORM_ACTIONS.draw });
                  } else {
                    alert(
                      "Incorrect positions, please check that the left position is smaller than the right position and that the difference is less than 100,000bp."
                    );
                  }
                }}
              >
                Draw
              </Button>
            )}

            <Button
              sx={{ marginRight: "2px" }}
              variant="outlined"
              size="small"
              onClick={() => {
                dispatch({ type: FORM_ACTIONS.demo });
              }}
            >
              Demo
            </Button>
          </div>
        </div>
      </Accordion>
    </div>
  );
}
