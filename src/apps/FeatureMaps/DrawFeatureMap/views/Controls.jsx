import { Button, ButtonGroup } from "@mui/material";
import {
  RestartAlt as RestartAltIcon,
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  ZoomIn,
  ZoomOut,
} from "@mui/icons-material";
import useControlsVM from "../viewModel/useControlsVM";

export default function Controls() {
  const {
    title,
handleZoomIn,
    handleZoomOut,
    handleResetScale,
    isMenuOpen,
    setMenuView,
  } = useControlsVM();

  return (
    <div>
      <div
        style={{
          height: "36px",
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "3fr 1fr",
          backgroundColor: "#a8c5ff",
          background: "linear-gradient(90deg,rgba(155, 213, 235, 1) 0%, rgba(255, 255, 255, 0) 100%)",
          padding: "1px 0 3px 1px",
        }}
      >
        <div>
          <p
            style={{
              margin: "0 10px 0 10px",
              fontSize: "24px",
              color: "black",
            }}
          >
            {title}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <ButtonGroup variant="contained" size="small" >
            <Button color="secondary" onClick={handleZoomIn}>
              <ZoomIn />
            </Button>
            <Button color="secondary" onClick={handleResetScale}>
              <RestartAltIcon />
            </Button>
            <Button color="secondary" onClick={handleZoomOut}>
              <ZoomOut />
            </Button>
            <Button onClick={setMenuView}>
              {isMenuOpen ? <MenuIcon /> : <MenuOpenIcon />}
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
