import React, { useState } from "react";
import Draggable from "react-draggable";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";

export default function FloatingWindow({
  positions,
  size,
  title,
  closeWindow = () => {},
  children,
}) {
  const [position, setPosition] = useState(positions);
  //y: infoNode.selectedNode.y,
  const handleDrag = (e, data) => {
    const { x, y } = data;
    //console.log(position);
    setPosition({ x, y });
  };

  return (
    <Draggable
      handle=".guWindow_header"
      defaultPosition={position}
      onDrag={handleDrag}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: 100,
          "& > :not(style)": {
            m: 1,
          },
        }}
      >
        <Paper elevation={5}>
          <div
            style={{ overflow: "auto", width: size.width, height: size.height }}
          >
            <div className="guWindow_header">
              <div>
                <h3>{title}</h3>
              </div>
              <div>
                <ButtonGroup size="small" color="secondary" variant="contained">
                  <Tooltip title="close window" placement="top">
                    <Button
                      onClick={() => {
                        closeWindow();
                      }}
                    >
                      <CloseIcon />
                    </Button>
                  </Tooltip>
                </ButtonGroup>
              </div>
            </div>
            {children}
          </div>
          <div className="guWindow_header">
            <br />
          </div>
        </Paper>
      </Box>
    </Draggable>
  );
}
