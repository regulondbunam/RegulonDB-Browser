import React, { useState } from "react";
import "./style.css";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Options from "./Options";
import Menus from "./Menu";
import menus from "../../conf";
import { useNavigate } from "react-router-dom";


export default function Menu() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState();
  const handleSelectMenu = (menu) => {
    setMenu(menu);
  };
  const handleCloseMenu = () => {
    setMenu(undefined);
  };
  return (
    <div className="rdb_Layout_Desktop">
      <div className="options">
        <div style={{ width: "3vw" }}></div>
        <div className="home-button">
          <IconButton
            sx={{
              height: "5vw",
              width: "5vw",
              maxHeight: "60px",
              maxWidth: "60px",
            }}
            onClick={()=>navigate("/")}
          >
            <HomeIcon className="home-button-icon" sx={{ color: "white" }} />
          </IconButton>
        </div>
        <Options
          menus={menus}
          menuId={menu?.id}
          handleSelectMenu={handleSelectMenu}
          handleCloseMenu={handleCloseMenu}
        />
      </div>
      {menu && <Menus menu={menu} setMenu={setMenu} />}
    </div>
  );
}
