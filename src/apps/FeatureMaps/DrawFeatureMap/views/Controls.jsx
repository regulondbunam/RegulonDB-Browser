import { Button, ButtonGroup } from "@mui/material";
import {
  RestartAlt as RestartAltIcon,
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
} from "@mui/icons-material";
import useControlsVM from "../viewModel/useControlsVM";

export default function Controls() {
  const {
    title,
    handleUpScale,
    handleDownScale,
    handleResetScale,
    isMenuOpen,
    setMenuView,
  } = useControlsVM();

  return (
    <div>
      <div
        style={{
          height: "33px",
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "3fr 1fr",
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
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ButtonGroup variant="contained" size="small">
            <Button color="secondary" onClick={handleUpScale}>
              +
            </Button>
            <Button color="secondary" onClick={handleResetScale}>
              <RestartAltIcon />
            </Button>
            <Button color="secondary" onClick={handleDownScale}>
              -
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="contained" size="small">
            <Button onClick={setMenuView}>
              {isMenuOpen ? <MenuIcon /> : <MenuOpenIcon />}
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
