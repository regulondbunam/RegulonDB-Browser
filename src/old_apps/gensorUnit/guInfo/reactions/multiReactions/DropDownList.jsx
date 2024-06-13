import List from "@mui/material/List";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import * as React from "react";

export default function DropDownList({ title, elements, onClick }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          height: "30px",
          bgcolor: "#D5E2EA",
          textAlign: "center",
          color: "#1F3D4E",
          borderBottom: "3px solid #FFFFFF",
          "& .MuiTypography-root": {
            fontWeight: 700,
            fontSize: " 18px",
          },
        }}
      >
        <ListItemText primary={title + " (" + elements.length + ")"} />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {elements.map((element) => {
            return (
              <>
                <ListItemButton
                  onClick={(e) => {
                    onClick(e);
                  }}
                  divider={true}
                  sx={{
                    pl: 1,
                    pr: 1,
                    pb: 0,
                    pt: 0,
                  }}
                >
                  <ListItemText primary={element} />
                </ListItemButton>
              </>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}
