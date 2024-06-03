import React from "react";
import { Cover } from "ui-components/Web/Cover";
import { useGetGeneByID } from "webServices/queries";
import { DataVerifier } from "ui-components/utils";
import Typography from "@mui/material/Typography";
import CoverGene from "./Cover";
import DrawTrace from "./DrawTrace";
import Sequence from "./Sequence";



export default function Details({ geneId }) {
  const { loading, gene, error } = useGetGeneByID(geneId);

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
      {DataVerifier.isValidObjectWith_id(gene) && (
        <div>
          <DrawTrace
            id={gene._id}
            leftEndPosition={gene.gene.leftEndPosition-1000}
            rightEndPosition={gene.gene.rightEndPosition+1000}
          />
          <div>
            <Sequence sequence={gene.sequence} />
          </div>
        </div>
      )}
    </div>
  );
}
