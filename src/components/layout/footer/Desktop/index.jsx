/* eslint-disable no-unused-vars */
import Style from "../footer.module.css";
import unamLogo from "../../logos/unam_white.png";
import ccgLogo from "../../logos/ccg_white.png";
import nihLogo from "../../logos/nih_withe.png";
import conahcytLogo from "../../logos/conahcyt_white.svg";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

// export const idFooter = "rdbFooter";

export default function Desktop() {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      className={Style.footer}
    >
      {/* Sección izquierda: UNAM y CCG */}
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        xs={6}
        className={Style.institutional}
      >
        <Grid item>
          <img
            src={unamLogo}
            alt="UNAM logo"
            className={Style.institutionLogo}
          />
        </Grid>

        <Grid item>
          <img src={ccgLogo} alt="CCG logo" className={Style.institutionLogo} />
        </Grid>

        {/* Financiamiento */}
        <div className={Style.funding}>
          <p className={Style.text}>Formerly funded by:</p>

          <div className={Style.fundingLogos}>
            <img src={nihLogo} alt="NIH logo" className={Style.fundingLogo} />

            <img
              src={conahcytLogo}
              alt="CONAHCYT logo"
              className={Style.fundingLogo}
            />
          </div>
        </div>
      </Grid>

      {/* Espacio intermedio */}
      <Grid item xs={3} />

      {/* Navegación */}
      <Grid
        item
        container
        direction={"row"}
        xs={3}
        style={{ justifyContent: "end" }}
      >
        <Grid item style={{ paddingInline: "10px" }}>
          <Link
            to="/manual/aboutUs/terms_conditions.md"
            style={{ paddingInline: "10px" }}
          >
            <p className={Style.link}>Terms and conditions</p>
          </Link>
        </Grid>
        <Grid item style={{ paddingInline: "10px" }}>
          <Link
            to="/manual/aboutUs/funding_credits.md"
            style={{ paddingInline: "10px" }}
          >
            <p className={Style.link}>Funding</p>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
