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
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { DataVerifier } from "../../../ui-components";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import "./desktopMenu.css"
import { useAllOrganisms } from "../../../webservices";
import OrganismExplorer from "../../../OrganismExplorer";
import { getRecentOrganisms, saveRecentOrganism } from "../../../OrganismExplorer/utils/recentOrganisms";
import { getCurrentOrganismLabel } from "../../../OrganismExplorer/utils/organismLabels";
import Drawer from "@mui/material/Drawer";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import BiotechIcon from "@mui/icons-material/Biotech";

const BUTTON_HOME_STYLE = {
  border: "solid 4px #ffffff",
  color: "#ffffff",
  height: "60px",
  width: "60px",
  float: "left",
  marginRight: "3%",
  transition: 'all .3s ease',
};

const DEFAULT_ORGANISM_ID = "organism_Escherichia_coli_K-12_MG655";

export default function Desktop() {
  const [menuS, setMenu] = useState({});
  const [drawOpen, setDrawOpen] = useState(false);
  const [selectedOrganismId, setSelectedOrganismId] = useState("");

  const [recentOrganisms, setRecentOrganisms] = useState([]);
  const navigate = useNavigate();
  const { organismsData, loading, error } = useAllOrganisms("");

 const [organismDrawerOpen, setOrganismDrawerOpen] = useState(false);

  useEffect(() => {
    setRecentOrganisms(
      getRecentOrganisms()
    );
  }, []);

  useEffect(() => {

    if (
      !organismsData?.length || selectedOrganismId
    ) {
      return;
    }

    if (
      organismsData.some(
        (item) => item._id === DEFAULT_ORGANISM_ID
      )
    ) {
      const savedOrganism = localStorage.getItem("selectedOrganism");
      if (savedOrganism && organismsData.some(
          (item) => item._id === savedOrganism
        )
      ) {
        setSelectedOrganismId(savedOrganism);
        return;
      }
    }

  }, [organismsData, selectedOrganismId]);

  const handleOrganismChange = (
    organismId
  ) => {

    localStorage.setItem("selectedOrganism", organismId);

    setSelectedOrganismId(organismId);

    setOrganismDrawerOpen(false);

    const selected =
    organismsData?.find(
      (item) => item._id === organismId
    );

    if (selected) {
      saveRecentOrganism(selected);
      setRecentOrganisms(getRecentOrganisms());
    }
  };

  const currentOrganism = useMemo(
    () =>
      organismsData?.find(
        (item) => item._id === selectedOrganismId
      ),
    [organismsData, selectedOrganismId]
  );

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#32617d", m: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => {
                  setDrawOpen(!drawOpen);
                  setMenu(false);
                }}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <DrawMenu drawOpen={drawOpen} setDrawOpen={setDrawOpen} />
            </Box>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
              }}
            >
              RegulonDB
            </Typography>
            <Box
              sx={{ flexGrow: 1, pl: 5, display: { xs: "none", md: "flex" } }}
            >
              <IconButton
                onClick={() => {
                  navigate("/");
                }}
                style={BUTTON_HOME_STYLE}
                className={"HomeButton"}
              >
                <HomeIcon sx={{ fontSize: 40 }} />
              </IconButton>
              {menuConf.map((menu) => {
                if (menu.type === "HOME") {
                  return null;
                }
                if (menu.disabled) {
                  return null;
                }
                return (
                  <Button
                    key={menu.id}
                    onClick={() => {
                      setMenu(
                        menuS.id === menu.id
                          ? {}
                          : menu
                      );
                    }}
                    sx={{
                      color: menuS.id === menu.id ? "#32617D" : "white",
                      display: "block",
                      height: "60px",
                      textTransform: "none",
                      backgroundColor:
                        menuS.id === menu.id ? "#cadce7" : "#32617D",
                      borderRadius: 0,
                      transition: 'transform 0.2s ease-in-out, background-color 0.3s ease-in-out',
                      "&:hover": {
                        backgroundColor: "#72a7c7",
                      },
                    }}
                  >
                    {menu.label}
                  </Button>
                );
              })}
            </Box>
            <Tooltip
              title={getCurrentOrganismLabel(
                currentOrganism
              )}
            >
              <Chip
                icon={<BiotechIcon color="white" />}
                label={getCurrentOrganismLabel(
                  currentOrganism
                )}
                onClick={() =>
                  setOrganismDrawerOpen(true)
                }
                clickable
                sx={{
                  ml: 2,
                  maxWidth: 350,

                  backgroundColor: "#32617D",
                  border: "1px solid white",
                  color: "white",
                  "& .MuiChip-label": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                  },

                  "&:hover": {
                    backgroundColor: "#E6EEF3",
                  },
                }}
              />
            </Tooltip>
            {!loading && organismsData?.length > 0 && (
              <Drawer
                anchor="right"
                open={organismDrawerOpen}
                onClose={() =>
                  setOrganismDrawerOpen(false)
                }
                PaperProps={{
                  sx: {
                    width: 400,
                  },
                }}
              >
                <OrganismExplorer
                  organisms={organismsData}
                  selectedOrganismId={selectedOrganismId}
                  recentOrganisms={recentOrganisms}
                  onChange={handleOrganismChange}
                  defaultExpanded={false}
                />
              </Drawer>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {DataVerifier.isValidArray(menuS.options) && (
        <MenuItem options={menuS.options} setMenu={setMenu} />
      )}
    </div>
  );
}

function MenuItem({ options, setMenu }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        overflow: "auto",
        backgroundColor: "#cadce7",
        padding: "5px 10% 15px 10%",
      }}
      onMouseLeave={() => {
        setMenu({});
      }}
    >
      {options.map((menu) => {
        if (menu.type === "HOME") {
          return null;
        }
        
        return (
          <List
            dense
            key={menu.id}
            sx={{ width: "100%", maxWidth: 360, bgcolor: "transparent" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <>
                <p>
                  <b>{menu.label}</b>
                </p>
              </>
            }
          >
            {menu.options.map((menu,index) => {
              if (menu.disabled) {
                return null;
              }
              return (
                <ListItemButton
                key={"listItemButton_"+menu.label+"_"+index}
                  onClick={() => {
                    navigate(menu.link);
                  }}
                >
                  <ListItemText primary={menu.label} />
                </ListItemButton>
              );
            })}
          </List>
        );
      })}
    </div>
  );
}
