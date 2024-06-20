import React from "react";
import { Cover } from "ui-components/Web/Cover";
import { COLLECTIONS } from "./static";
import { Typography, Box, Grid } from "@mui/material";
import HtCard from "./Card";

export default function Home() {
  return (
    <>
      <Cover>
        <Typography variant="h1">High Throughput Collection</Typography>
      </Cover>
      <Box sx={{ flexGrow: 1, p: "10px 6% 10px 6%" }}>
        <Grid container spacing={1}>
          {COLLECTIONS.map((collection, index) => {
            return (
              <HtCard
                key={"card_" + index + "_" + collection.id}
                collection={collection}
                index={index}
              />
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
