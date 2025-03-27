import React, { useState } from "react";
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

const BUTTON_HOME_STYLE = {
  border: "solid 4px #ffffff",
  color: "#ffffff",
  height: "60px",
  width: "60px",
  float: "left",
  marginRight: "3%",
};

export default function Desktop() {
  const [menuS, setMenu] = useState({});
  const [drawOpen, setDrawOpen] = useState(false);
  const navigate = useNavigate();

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
                color: "withe",
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
                      if (menuS.id) {
                        if (menuS.id === menu.id) {
                          setMenu({});
                        } else {
                          setMenu(menu);
                        }
                      } else {
                        setMenu(menu);
                      }
                    }}
                    sx={{
                      color: menuS.id === menu.id ? "#32617D" : "white",
                      display: "block",
                      height: "60px",
                      textTransform: "none",
                      backgroundColor:
                        menuS.id === menu.id ? "#cadce7" : "#32617D",
                      borderRadius: 0,
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
