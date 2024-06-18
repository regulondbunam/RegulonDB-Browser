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
import { useGetIndexedReferences } from "ui-components/Web/Citations";
import { AllCitations } from "ui-components/Web/Citations/AllCitations";
import RelatedList from "../../../ui-components/Web/Related";

export default function Details({ geneId }) {
  const { loading, gene, error } = useGetGeneByID(geneId);
  const references = useGetIndexedReferences(gene?.allCitations)
  console.log(gene);
  let products = [];
  if (DataVerifier.isValidArray(gene?.products)) {
    gene.products.forEach((product) => {
      products.push({
        id: gene._id + "_sectionProduct_" + product._id,
        visible: true,
        title: "Product: " + product.name,
        component: <Product {...product} allCitations={gene.allCitations} pageReferences={references} />,
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
            fragments={gene.gene.fragments}
          />
          <br />
          <Divider />
          <br />
          <AnchorNav
          leftList={
            <RelatedList 
              regulonDB_id={gene._id}
            />
          }
          title={gene.gene.name+" gene"}
            sections={[
              {
                id: gene._id + "_SequenceSection",
                title: "Sequence",
                visible: DataVerifier.isValidString(gene.gene.sequence),
                component: (
                  <div>
                    <Sequence
                      fragments={gene.gene.fragments}
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
                visible: DataVerifier.isValidArray(gene.gene.multifunTerms),
                component: (
                  <div>
                    <MultifunTerms multifunTerms={gene.gene.multifunTerms} />
                  </div>
                  
                ),
              },
              {
                id: gene._id + "_RegulationSection",
                title: "Regulation",
                visible: DataVerifier.isValidObject(gene.regulation),
                component: <Regulation {...gene.regulation} />,
              },
              ...products,
              {
                id: "section4",
                title: "All Citations",
                visible: DataVerifier.isValidArray(gene.allCitations),
                component: <AllCitations {...references}/>,
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
