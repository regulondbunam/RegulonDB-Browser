import React from "react";
import { Cover } from "ui-components/Web/Cover";
import { useGetGeneByID } from "webServices/queries";
import Typography from "@mui/material/Typography";

import CoverGene from "./Cover";

export default function Details({ geneId }) {
  const { loading, gene, error } = useGetGeneByID(geneId);
  console.log(gene);
  if (error) {
    return (
      <div>
        <Cover
          state={loading ? "loading" : "error"}
          message={error && "Error to load gene list"}
        >
          <Typography variant="h1" sx={{ ml: "10%" }}>
            ERROR: {geneId} not found{" "}
          </Typography>
        </Cover>
      </div>
    );
  }
  return (
    <div>
      <Cover
        state={loading ? "loading" : "done"}
        message={error && "Error to load gene list"}
      >
        {gene ? (
          <CoverGene {...gene} />
        ) : (
          <Typography variant="h1" sx={{ ml: "10%" }}>
            loading... Gene {geneId}
          </Typography>
        )}
      </Cover>
    </div>
  );
}
