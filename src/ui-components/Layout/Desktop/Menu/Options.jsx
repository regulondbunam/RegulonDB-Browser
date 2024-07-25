import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Options({
  menus,
  menuId,
  handleCloseMenu,
  handleSelectMenu,
}) {
  return (
    <div style={{ marginLeft: "50px" }}>
      <Stack spacing={2} direction="row">
        {Object.keys(menus).map((key) => {
          const menu = menus[key];
          return (
            <Button
              key={menu.id}
              onClick={() => {
                if (menuId === menu.id) {
                  handleCloseMenu();
                } else {
                  handleSelectMenu(menu);
                }
              }}
              sx={{
                height: "4vw",
                maxHeight: "60px",
                backgroundColor: "transparent",
              }}
              color={menuId === menu.id ? "primary700" : "primary800"}
              variant={menuId === menu.id ? "contained" : "text"}
            >
              <p
              className="rdb_menu_desktop_button"
                style={{
                  color: menuId === menu.id ? "" : "white",
                  textTransform: "none",
                }}
              >
                {menu.label}
              </p>
            </Button>
          );
        })}
      </Stack>
    </div>
  );
}
