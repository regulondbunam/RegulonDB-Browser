import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Checkbox } from "@mui/material";
import {
  List,
  ListItemButton,
  Tooltip,
  Button,
  ListItem,
  Box,
} from "@mui/material";
import { useState } from "react";
import { RDBTracks } from "./RDBTracks";
import { ACTION } from "../static";
import HTTracks from "./HTTracks";


export default function Menu({ state, dispatch, viewMenu, setViewMenu }) {
  const handleViewMenu = () => {
    setViewMenu(!viewMenu);
  };
  if (!viewMenu) {
    return (
      <Paper>
        <List>
          <Tooltip title="Show Menu Track Options">
            <ListItemButton onClick={handleViewMenu}>
              <MenuIcon />
            </ListItemButton>
          </Tooltip>
        </List>
      </Paper>
    );
  }
  return (
    <>
      <Paper>
        <List>
          <ListItem>
            <ListItemText primary="Menu Track Options" />
            <Tooltip title="Hide Menu Track Options">
              <Button onClick={handleViewMenu}>
                <MenuOpenIcon />
              </Button>
            </Tooltip>
          </ListItem>
          <Divider />
          <ListItemButton sx={{ m: "auto" }}>
            <ListItemText primary="Upload File" />
            <AddBoxIcon />
          </ListItemButton>
          <Divider />
          <RegulonDBList state={state} dispatch={dispatch} />
          <Divider />
          <HTList state={state} dispatch={dispatch} />
        </List>
      </Paper>
    </>
  );
}

function RegulonDBList({ state, dispatch }) {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleOpen} sx={{ m: "auto" }}>
        <ListItemText primary="RegulonDB Datasets" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense component="div" disablePadding>
          {RDBTracks.map((track) => {
            return (
              <ListItem
                key={"MenuTackGene" + track.id}
                sx={{ pl: 4 }}
                secondaryAction={
                  <Checkbox
                    checked={state.tracks.hasOwnProperty(track.name)}
                    onChange={() => {
                      if (state.tracks.hasOwnProperty(track.name)) {
                        dispatch({
                          type: ACTION.DELETE_TRACK,
                          trackName: track.name,
                        });
                      } else {
                        dispatch({ type: ACTION.ADD_TRACK, track: track });
                      }
                    }}
                  />
                }
              >
                <ListItemText primary={track.name} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}

function HTList({ state, dispatch }) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
const [_HTTracks, setHTTracks] = useState([]);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  
  
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleOpen} sx={{ m: "auto" }}>
        <ListItemText primary="HT Datasets" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleClickOpenModal} >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <div>
                <AddBoxIcon />
              </div>
              <div>
                <p>Add HT Dataset Track</p>
              </div>
            </Box>
          </ListItemButton>
          {_HTTracks.map((track) => {
            return (
              <ListItem sx={{ pl: 4 }} secondaryAction={<Checkbox />}>
                <ListItemText primary="track" />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <HTTracks state={state} dispatch={dispatch} open={openModal} handleClose={handleCloseModal} />
    </>
  );
}