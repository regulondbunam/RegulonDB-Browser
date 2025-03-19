import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Body } from './body';
import "./home.css";
import Cover from "./cover";


export default function Home() {
  return (
    <div>
      <CssBaseline />
      <Container
        maxWidth={false}
        sx={{
          "&.MuiContainer-root": {
            padding: 0,
          },
        }}
      >
        <Cover />
        <Body />
      </Container>
    </div>
  );
}
