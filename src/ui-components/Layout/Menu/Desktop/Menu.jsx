import React from "react";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import DownloadingIcon from "@mui/icons-material/Downloading";
import BiotechIcon from "@mui/icons-material/Biotech";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PreviewIcon from "@mui/icons-material/Preview";
import ApiIcon from "@mui/icons-material/Api";

export default function Menu({ menu, setMenu = () => {} }) {
  const navigate = useNavigate();
  let Icon = <></>;
  switch (menu.icon) {
    case "search":
      Icon = SearchIcon;
      break;
    case "downloads":
      Icon = DownloadingIcon;
      break;
    case "tools":
      Icon = BiotechIcon;
      break;
    case "help":
      Icon = HelpOutlineIcon;
      break;
    case "overviews":
      Icon = PreviewIcon;
      break;
    case "software":
      Icon = ApiIcon;
      break;
    default:
      break;
  }
  return (
    <div
      style={{ position: "relative" }}
      onMouseLeave={() => {
        setMenu();
      }}
    >
      <div
        style={{
          display: "flex",
          overflow: "auto",
          backgroundColor: "#2c4f63",
          padding: "20px 10% 15px 10%",
        }}
      >
        {menu.options.map((menu) => {
          return (
            <List
              dense
              key={menu.id}
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "transparent",
                color: "white",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <Typography variant="relevant" sx={{ color: "white" }}>
                  {menu.label}
                </Typography>
              }
            >
              {menu.options.map((menu, index) => {
                if (menu.disabled) {
                  return null;
                }
                return (
                  <ListItemButton
                    key={"listItemButton_" + menu.label + "_" + index}
                    onClick={() => {
                      navigate(menu.link);
                      setMenu();
                    }}
                  >
                    <ListItemText
                      sx={{
                        ".MuiListItemText-primary": {
                          color: "white",
                        },
                      }}
                      primary={menu.label}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
        }}
      >
        <Icon color="rest" sx={{ fontSize: "6vw" }} />
      </div>
    </div>
  );
}
