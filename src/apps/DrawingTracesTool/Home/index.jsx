import React from "react";
import { Cover } from "ui-components/Web/Cover";
import Typography from "@mui/material/Typography";
import style from "./home.module.css";
import { Divider, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import logoEcoli from "static/icons/ecoli.svg"

export default function Home() {
  return (
    <div>
      <Cover>
        <Typography variant="h1" sx={{ ml: "10%" }}>
          Drawing Traces Tool
        </Typography>
      </Cover>
      <div
        className={style.body}
        style={{ height: `${window.screen.height - 170}px` }}
      >
        <div className={style.about} style={{ display: "none" }}>
          About
        </div>
        <Divider orientation="vertical" />
        <div className={style.options}>
          <div>
            <Paper elevation={3} sx={{ m: 2, p: 1 }}>
              <div>
                <div>
                   
                </div>
                <div>
                <Typography variant="h2">RegulonDB data (ecoli)</Typography>
              <Typography variant="relevant">description</Typography>
                </div>
                <div>
                    <Button color="secondary" variant="contained" >GO!</Button>
                </div>
              </div>
            </Paper>
          </div>
          <div>
          <Paper elevation={3} sx={{ m: 2, p: 1 }}>
              <Typography variant="h2">Upload your data</Typography>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}
