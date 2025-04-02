import React, { useState } from "react";
import { DataVerifier } from "../../../ui-components";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListIcon from "@mui/icons-material/List";
import Divider from "@mui/material/Divider";
import menuConf from "../conf";
import RDBLogo from "../../logos/regulonDB.png";
import { useNavigate } from "react-router-dom";
import { ICONS, MENU_ITEM } from "../definitions";

export default function DrawMenu({ drawOpen, setDrawOpen }) {
  return (
    <Drawer
      anchor={"left"}
      open={drawOpen}
      onClose={() => {
        setDrawOpen(false);
      }}
    >
      <Menu setDrawOpen={setDrawOpen} />
    </Drawer>
  );
}

function Menu({ setDrawOpen }) {
  //console.log(menuConf);
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ ml: 1, mt: 1 }}>
        <img src={RDBLogo} alt="RegulonDB logo" width={230} />
      </Box>
      <Divider />
      {menuConf.map((menu) => {
        if(menu.disabled){return null}
        return <SubMenu key={menu.id} menu={menu} setDrawOpen={setDrawOpen} />;
      })}
    </Box>
  );
}

function SubMenu({ menu = { ...MENU_ITEM }, setDrawOpen }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleAction = () => {
    if(!DataVerifier.isValidArray(menu.options)){
        if (menu.link) {
            setDrawOpen(false)
            navigate(menu.link)
        }
    }else{
        setOpen(!open)
    }
  };
  return (
    <List component="nav">
      <ListItemButton onClick={handleAction} selected={open} >
        {menu?.icon && (
          <ListItemIcon>
            {ICONS[menu.icon] ? ICONS[menu.icon] : <ListIcon />}
          </ListItemIcon>
        )}
        <ListItemText primary={menu.label} />
        {DataVerifier.isValidArray(menu.options) && (
          <>{open ? <ExpandLess /> : <ExpandMore />}</>
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {DataVerifier.isValidArray(menu.options) && (
            <>{menu.options.map((subMenu)=>{
                if(subMenu.disabled){return null}
                return <SubMenu key={subMenu.id} menu={subMenu} setDrawOpen={setDrawOpen} />;
            })}</>
        )}
      </Collapse>
      <Divider />
    </List>
  );
}
