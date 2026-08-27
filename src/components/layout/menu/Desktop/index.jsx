import React, { useState, useEffect, useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import menuConf from "../conf";
import DrawMenu from "../Mobile/DrawMenu";
import { useNavigate, useSearchParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { DataVerifier } from "../../../ui-components";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import "./desktopMenu.css";
import { useAllOrganisms } from "../../../webservices";
import OrganismExplorer from "../../../OrganismExplorer";
import { getRecentOrganisms, saveRecentOrganism} from "../../../OrganismExplorer/utils/recentOrganisms";
import { getCurrentOrganismLabel } from "../../../OrganismExplorer/utils/organismLabels";
import Drawer from "@mui/material/Drawer";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import BiotechIcon from "@mui/icons-material/Biotech";
import {buildUrlWithOrganism} from "../../../ui-components/utils/navigation";


const BUTTON_HOME_STYLE = {
  border: "solid 4px #ffffff",
  color: "#ffffff",
  height: "60px",
  width: "60px",
  float: "left",
  marginRight: "3%",
  transition: "all .3s ease",
};


// Default organism used when:
// - URL does not contain an organism
// - localStorage does not contain a valid organism
// - organism from URL does not exist
const DEFAULT_ORGANISM_ID =
  "RDBECOLIORC00001";


export default function Desktop() {

  const navigate = useNavigate();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const organismFromUrl =
    searchParams.get("organism");

  // --------------------------------------------------
  // General menu state
  // --------------------------------------------------

  const [menuS, setMenu] = useState({});
  const [drawOpen, setDrawOpen] = useState(false);

  // --------------------------------------------------
  // Organism state
  // --------------------------------------------------

  const [selectedOrganismId, setSelectedOrganismId] =
    useState("");

  const [recentOrganisms, setRecentOrganisms] =
    useState([]);

  const [organismDrawerOpen, setOrganismDrawerOpen] =
    useState(false);


  // --------------------------------------------------
  // Organism data
  // --------------------------------------------------

  const {
    organismsData,
    loading,
    error,
  } = useAllOrganisms("");


  // --------------------------------------------------
  // Load recently used organisms
  // --------------------------------------------------

  useEffect(() => {
    setRecentOrganisms(
      getRecentOrganisms()
    );
  }, []);


  // --------------------------------------------------
  // Determine initial organism
  //
  // Priority:
  // 1. URL
  // 2. localStorage
  // 3. Default organism
  // --------------------------------------------------

  useEffect(() => {

    if (
      !organismsData?.length ||
      selectedOrganismId
    ) {
      return;
    }


    // 1. Organism from URL
    if (organismFromUrl) {

      const urlOrganismExists =
        organismsData.some(
          (organism) =>
            organism._id === organismFromUrl
        );


      if (urlOrganismExists) {
        setSelectedOrganismId(
          organismFromUrl
        );

        return;
      }
    }


    // 2. Organism from localStorage
    const savedOrganism =
      localStorage.getItem(
        "selectedOrganism"
      );


    if (savedOrganism) {

      const savedOrganismExists =
        organismsData.some(
          (organism) =>
            organism._id === savedOrganism
        );


      if (savedOrganismExists) {

        setSelectedOrganismId(
          savedOrganism
        );

        // Keep URL synchronized
        updateOrganismUrl(
          savedOrganism
        );

        return;
      }
    }


    // 3. Default organism
    const defaultExists =
      organismsData.some(
        (organism) =>
          organism._id ===
          DEFAULT_ORGANISM_ID
      );


    if (defaultExists) {

      setSelectedOrganismId(
        DEFAULT_ORGANISM_ID
      );

      localStorage.setItem(
        "selectedOrganism",
        DEFAULT_ORGANISM_ID
      );

      updateOrganismUrl(
        DEFAULT_ORGANISM_ID
      );
    }

  }, [
    organismsData,
    organismFromUrl,
    selectedOrganismId,
  ]);


  // --------------------------------------------------
  // Update organism URL
  // --------------------------------------------------

  const updateOrganismUrl = (
    organismId
  ) => {

    setSearchParams(
      (params) => {

        params.set(
          "organism",
          organismId
        );

        return params;
      },
      {
        replace: true,
      }
    );
  };


  // --------------------------------------------------
  // Organism selection
  // --------------------------------------------------

  const handleOrganismChange = (
    organismId
  ) => {

    if (!organismId) {
      return;
    }


    const selected =
      organismsData?.find(
        (organism) =>
          organism._id === organismId
      );


    if (!selected) {
      return;
    }


    // React state
    setSelectedOrganismId(
      organismId
    );


    // Persistent selection
    localStorage.setItem(
      "selectedOrganism",
      organismId
    );


    // URL state
    updateOrganismUrl(
      organismId
    );


    // Recently used organisms
    saveRecentOrganism(
      selected
    );

    setRecentOrganisms(
      getRecentOrganisms()
    );


    // Close drawer
    setOrganismDrawerOpen(
      false
    );
  };


  // --------------------------------------------------
  // Current organism
  // --------------------------------------------------

  const currentOrganism =
    useMemo(
      () =>
        organismsData?.find(
          (organism) =>
            organism._id ===
            selectedOrganismId
        ),
      [
        organismsData,
        selectedOrganismId,
      ]
    );


  return (
    <div>

      <AppBar
        position="static"
        sx={{
          backgroundColor: "#32617d",
          m: 0,
        }}
      >

        <Container maxWidth="xl">

          <Toolbar disableGutters>

            {/* -------------------------------------- */}
            {/* Mobile menu */}
            {/* -------------------------------------- */}

            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "flex",
                  md: "none",
                },
              }}
            >

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => {
                  setDrawOpen(!drawOpen);
                  setMenu({});
                }}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <DrawMenu
                drawOpen={drawOpen}
                setDrawOpen={setDrawOpen}
              />

            </Box>


            {/* -------------------------------------- */}
            {/* Mobile title */}
            {/* -------------------------------------- */}

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: {
                  xs: "flex",
                  md: "none",
                },
                flexGrow: 1,
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
              }}
            >
              RegulonDB
            </Typography>


            {/* -------------------------------------- */}
            {/* Desktop menu */}
            {/* -------------------------------------- */}

            <Box
              sx={{
                flexGrow: 1,
                pl: 5,
                display: {
                  xs: "none",
                  md: "flex",
                },
              }}
            >

              <IconButton
                onClick={() => {
                  navigate(
                    buildUrlWithOrganism(
                      "/",
                      selectedOrganismId
                    )
                  );
                }}
                style={BUTTON_HOME_STYLE}
                className="HomeButton"
              >
                <HomeIcon
                  sx={{
                    fontSize: 40,
                  }}
                />
              </IconButton>


              {menuConf.map(
                (menu) => {

                  if (
                    menu.type === "HOME" ||
                    menu.disabled
                  ) {
                    return null;
                  }


                  const isActive =
                    menuS.id === menu.id;


                  return (
                    <Button
                      key={menu.id}
                      onClick={() => {
                        setMenu(
                          isActive
                            ? {}
                            : menu
                        );
                      }}
                      sx={{
                        color: isActive
                          ? "#32617D"
                          : "white",

                        display: "block",

                        height: "60px",

                        textTransform:
                          "none",

                        backgroundColor:
                          isActive
                            ? "#cadce7"
                            : "#32617D",

                        borderRadius: 0,

                        transition:
                          "transform 0.2s ease-in-out, background-color 0.3s ease-in-out",

                        "&:hover": {
                          backgroundColor:
                            "#72a7c7",
                        },
                      }}
                    >
                      {menu.label}
                    </Button>
                  );
                }
              )}

            </Box>


            {/* -------------------------------------- */}
            {/* Current organism */}
            {/* -------------------------------------- */}

            <Tooltip
              title={getCurrentOrganismLabel(
                currentOrganism
              )}
            >

              <Chip
                icon={
                  <BiotechIcon
                    sx={{
                      color: "white",
                    }}
                  />
                }

                label={
                  getCurrentOrganismLabel(
                    currentOrganism
                  )
                }

                onClick={() =>
                  setOrganismDrawerOpen(
                    true
                  )
                }

                clickable

                sx={{
                  ml: 2,
                  maxWidth: 350,

                  backgroundColor:
                    "#32617D",

                  border:
                    "1px solid white",

                  color: "white",

                  "& .MuiChip-label": {
                    overflow:
                      "hidden",

                    textOverflow:
                      "ellipsis",

                    whiteSpace:
                      "nowrap",

                    fontWeight: 600,
                  },

                  "&:hover": {
                    backgroundColor:
                      "#E6EEF3",

                    color:
                      "#32617D",
                  },
                }}
              />

            </Tooltip>


            {/* -------------------------------------- */}
            {/* Organism drawer */}
            {/* -------------------------------------- */}

            {!loading &&
              organismsData?.length >
                0 && (

                <Drawer
                  anchor="right"

                  open={
                    organismDrawerOpen
                  }

                  onClose={() =>
                    setOrganismDrawerOpen(
                      false
                    )
                  }

                  PaperProps={{
                    sx: {
                      width: 400,
                    },
                  }}
                >

                  <OrganismExplorer
                    organisms={
                      organismsData
                    }

                    selectedOrganismId={
                      selectedOrganismId
                    }

                    recentOrganisms={
                      recentOrganisms
                    }

                    onChange={
                      handleOrganismChange
                    }

                    defaultExpanded={
                      false
                    }
                  />

                </Drawer>
              )}

          </Toolbar>

        </Container>

      </AppBar>


      {/* ------------------------------------------ */}
      {/* Expanded menu */}
      {/* ------------------------------------------ */}

      {DataVerifier.isValidArray(
        menuS.options
      ) && (

        <MenuItem
          options={menuS.options}
          setMenu={setMenu}
          selectedOrganismId={selectedOrganismId}
        />

      )}

    </div>
  );
}


// ==================================================
// MenuItem
// ==================================================

function MenuItem({
  options,
  setMenu,
  selectedOrganismId
}) {

  const navigate = useNavigate();

  const DEFAULT_ORGANISM_ID = "RDBECOLIORC00001";

  const isDefaultOrganism = selectedOrganismId === DEFAULT_ORGANISM_ID;


  return (
    <div
      style={{
        display: "flex",
        overflow: "auto",
        backgroundColor:
          "#cadce7",
        padding:
          "5px 10% 15px 10%",
      }}

      onMouseLeave={() => {
        setMenu({});
      }}
    >

      {options.map(
        (menu) => {

          if (
            menu.type === "HOME"
          ) {
            return null;
          }


          return (
            <List
              dense
              key={menu.id}
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor:
                  "transparent",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <Typography
                  component="p"
                >
                  <b>
                    {menu.label}
                  </b>
                </Typography>
              }
            >

              {menu.options.map(
                (subMenu, index) => {

                  const isRestricted = subMenu.requiresDefaultOrganism && !isDefaultOrganism;

                  if (
                    subMenu.disabled
                  ) {
                    return null;
                  }


                  return (
                    <ListItemButton
                      disabled={isRestricted}
                      onClick={() => {
                        if (isRestricted) return;

                        navigate(
                          buildUrlWithOrganism(
                            subMenu.link,
                            selectedOrganismId
                          )
                        );
                      }}
                    >

                      <ListItemText
                        primary={
                          subMenu.label
                        }
                      />

                    </ListItemButton>
                  );
                }
              )}

            </List>
          );
        }
      )}

    </div>
  );
}