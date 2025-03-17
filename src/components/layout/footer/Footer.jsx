/* eslint-disable no-unused-vars */
import Style from "./footer.module.css";
import unamLogo from "../logos/unam_white.png";
import ccgLogo from "../logos/ccg_white.png";
import nihLogo from "../logos/nih_withe.png";
import conahcytLogo from "../logos/conahcyt_white.svg";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";

export const idFooter = "rdbFooter";

export default function Footer() {
  return (
    <div id={idFooter} className={Style.footer}>
      <div className={Style.footerHeight}>
        <div className={Style.logos}>
          <img src={unamLogo} alt="unam logo" className={Style.imageLogo} />
          <img src={ccgLogo} alt="ccg logo" className={Style.imageLogo} />
          <img src={nihLogo} alt="nih logo" className={Style.imageLogo} />
          <img
            src={conahcytLogo}
            alt="Consejo Nacional de Humanidades Ciencia y Tecnologia logo"
            className={Style.imageLogo}
          />
        </div>
        <div className={Style.links}>
        <>
              <Link
                
                to="/manual/aboutUs/terms-conditions"
                style={{ paddingLeft: "10px" }}
              >
                <p className={Style.link} >
                Terms and conditions
                </p>
              </Link>
              <Link
                to="/manual/aboutUs/funding"
                style={{ paddingLeft: "10px" }}
              >
                <p className={Style.link}>
                Funding
                </p>
              </Link>
              {/*<Link*/}
              {/*  to="/manual/aboutUs/contact"*/}
              {/*  style={{ paddingLeft: "10px" }}*/}
              {/*>*/}
              {/*  <p className={Style.link}>*/}
              {/*  Contact Us*/}
              {/*  </p>*/}
              {/*</Link>*/}
            </>
        </div>
      </div>
      <div className={Style.text}></div>
    </div>
  );
}

/**
 * <BasicModal></BasicModal>
                    <Link to={"/aboutUs/terms_and_conditions"} ><p className={Style.link} >Terms & Conditions</p></Link>
                    <Link to={"/aboutUs/funding"} ><p className={Style.link} >Funding</p></Link>
 */

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BasicModal({ children }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button color="secondary" onClick={handleOpen}>
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
}

//about us
