import React from "react";
import { Cover } from "ui-components/Web/Cover";
import { useGetGeneByID } from "webServices/queries";
import { DataVerifier } from "ui-components/utils";
import {Typography, Divider} from "@mui/material";
import CoverGene from "./Cover";
import DrawTrace from "./DrawTrace";
import Sequence from "./Sequence";
import AnchorNav from "ui-components/Web/AnchorNav";



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
          <br />
          <Divider />
          <br />
          <AnchorNav
          sections={[
            {id: gene._id+"_SequenceSection",
              title: "Sequence",
              component: <div>
                <Sequence sequence={gene.gene.sequence}  />
              </div>
            },
            {id: "section2",
              title: "MultifunTerms",
              component: <>section1</>
            },
            {id: "section3",
              title: "Regulation",
              component: <>section1</>
            },
            {id: "section3",
              title: "Product",
              component: <>section1</>
            },
            {id: "section3",
              title: "All Citations",
              component: <>section1</>
            },
          ]}
          />
        </div>
      )}
    </div>
  );
}
