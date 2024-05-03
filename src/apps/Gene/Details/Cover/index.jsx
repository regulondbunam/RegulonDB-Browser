import React from "react";
import { Typography, Divider } from "@mui/material";
import { DataVerifier } from "ui-components/utils";
import style from "./cover.module.css"

export default function Cover({ gene, products }) {
  const { _id, name, synonyms, leftEndPosition, rightEndPosition, strand, externalCrossReferences } =
    gene;

  return (
    <div className={style.base} >
      <div className={style.title}>
        <div>
          <Typography variant="irrelevant">Gene</Typography>
          <Typography variant="h1">{name}</Typography>
        </div>
        <div className={style.divider}>
          <Divider orientation="vertical" />
        </div>
        {DataVerifier.isValidArray(products) && (
          <div>
            <Typography variant="irrelevant">Product</Typography>
            <Typography variant="h1">
              {products.map((product) => product.name).join(", ")}
            </Typography>
          </div>
        )}
      </div>
      <div className={style.mainInfo} >
        <div>
          {DataVerifier.isValidArray(synonyms) && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="irrelevant" sx={{ mr: 1 }}>
                Synonyms:
              </Typography>
              <Typography variant="relevant">
                {synonyms.map((synonym) => synonym).join(", ")}
              </Typography>
            </div>
          )}
          {DataVerifier.isValidNumber(leftEndPosition) && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="irrelevant" sx={{ mr: 1 }}>
                Length:
              </Typography>
              <Typography variant="relevant">
                {1 + rightEndPosition - leftEndPosition + " bp"}
              </Typography>
            </div>
          )}
          {DataVerifier.isValidNumber(leftEndPosition) && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="irrelevant" sx={{ mr: 1 }}>
                Position:
              </Typography>
              <Typography variant="relevant">
                {`${rightEndPosition}${strand === "reverse" ? " <- " : " -> "
                  }${leftEndPosition}`}
              </Typography>
            </div>
          )}
          {DataVerifier.isValidArray(products) && (
            <div>
              {DataVerifier.isValidArray(products[0].cellularLocations) && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="irrelevant" sx={{ mr: 1 }}>
                    Location:
                  </Typography>
                  <Typography variant="relevant">
                    {products
                      .map((product) =>
                        DataVerifier.isValidArray(product.cellularLocations)
                          ? product.cellularLocations.join(", ")
                          : ""
                      )
                      .join(", ")}
                  </Typography>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={style.references} >
          <DropRef id={_id} externalCrossReferences={externalCrossReferences} />
        </div>
      </div>
    </div>
  );
}

const references = ["ECOCYC", "ecocyc", "REFSEQ", "refseq", "UniProt"];

function DropRef({ id, externalCrossReferences }) {
  //console.log(externalCrossReferences);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="irrelevant" sx={{ mr: 1 }}>
          RegulonDB ID:
        </Typography>
        <Typography variant="irrelevant">
          {id}
        </Typography>
      </div>

      {DataVerifier.isValidArray(externalCrossReferences) && (<div style={{display: "flex", flexDirection: "column"}}>
        <Typography variant="irrelevant" sx={{ mr: 1 }}>
          External IDs:
        </Typography>
        {externalCrossReferences.map(ref => (
          references.find(name => name === ref.externalCrossReferenceName) ? (
            <Typography key={ref.externalCrossReferenceId} variant="irrelevant" sx={{ mr: 1 }}>
              <a
                href={`${ref?.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >{`${ref?.externalCrossReferenceName}: ${ref?.objectId}`}</a>
            </Typography>
          ) : (null)
        ))}
      </div>)}

    </div>
  )
}