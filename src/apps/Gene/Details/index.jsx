import React from "react";
import { Cover } from "ui-components/Web/Cover";
import { useGetGeneByID } from "webServices/queries";
import { DataVerifier } from "ui-components/utils";
import { Typography, Divider } from "@mui/material";
import CoverGene from "./Cover";
import DrawTrace from "./DrawTrace";
import Sequence from "./Sequence";
import MultifunTerms from "./MultifunTerms";
import Regulation from "./Regulation";
import Product from "./Product";
import AnchorNav from "ui-components/Web/AnchorNav";

export default function Details({ geneId }) {
  const { loading, gene, error } = useGetGeneByID(geneId);
  console.log(gene);
  let products = [];
  if (DataVerifier.isValidArray(gene?.products)) {
    gene.products.forEach((product) => {
      products.push({
        id: gene._id+"_sectionProduct_"+product._id,
        title: "Product: "+product.name,
        component: <Product {...product} allCitations={gene.allCitations}/>,
      });
    });
  }
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
            leftEndPosition={gene.gene.leftEndPosition - 1000}
            rightEndPosition={gene.gene.rightEndPosition + 1000}
          />
          <br />
          <Divider />
          <br />
          <AnchorNav
            sections={[
              {
                id: gene._id + "_SequenceSection",
                title: "Sequence",
                component: (
                  <div>
                    <Sequence
                      sequence={gene.gene.sequence}
                      products={gene.products}
                      name={gene.gene.name}
                      _id={gene._id}
                    />
                  </div>
                ),
              },
              {
                id: gene._id + "_MultifunTermsSection",
                title: "MultifunTerms",
                component: (
                  <MultifunTerms multifunTerms={gene.gene.multifunTerms} />
                ),
              },
              {
                id: gene._id + "_RegulationSection",
                title: "Regulation",
                component: <Regulation {...gene.regulation} />,
              },
              ...products,
              {
                id: "section4",
                title: "All Citations",
                component: <>section1</>,
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
