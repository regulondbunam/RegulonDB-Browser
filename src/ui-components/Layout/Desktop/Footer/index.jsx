import React from 'react'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import style from "./footer.module.css"

export default function Footer() {
  const date = new Date();

  return (
    <footer  >
      <div className={style.press} >
        <div className="logos">
          <img src="/media/img/logos/unam_white.png" alt="unam logo" className={style.imageLogo} />
          <img src={"/media/img/logos/ccg_white.png"} alt="ccg logo" className={style.imageLogo} />
          <img src={"/media/img/logos/nih_white.png"} alt="nih logo" className={style.imageLogo} />
          <img
            src={"/media/img/logos/CONAHCYT.svg"}
            alt="Consejo Nacional de Humanidades Ciencia y Tecnologia logo"
            className={style.imageLogo}
          />
        </div>
        <div className={style.links}>
          <Link
            to="/manual/aboutUs/funding"
            style={{ paddingLeft: "10px" }}
          >
            <Typography variant="normal" color="white" >
              Funding
            </Typography>
          </Link>
          <Link
            to="/manual/aboutUs/terms-conditions"
            style={{ paddingLeft: "10px" }}
          >
            <Typography variant="normal" color="white"  >
              Terms&Conditions
            </Typography>
          </Link>
        </div>
      </div>
      <div className="comments" style={{ padding: "15px 15% 15px 15%", textAlign: "center" }}>
        <Typography color={"white"} variant="irrelevant" >
          ©1998-{date.getFullYear()}, CCG/UNAM All Rights Reserved. RegulonDB is free for academic/noncommercial use.
          Our curation knowledge is currently mapped to the GenBank Reference Sequence for E. coli K12.
          Version NC_000913.3 GI:556503834.
        </Typography>
      </div>
    </footer>
  )
}
