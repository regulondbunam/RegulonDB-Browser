import React from "react";
import { Typography, Divider } from "@mui/material";
import { DataVerifier } from "ui-components/utils";
import Info from "./Info";
import style from "./cover.module.css"

export default function Cover({ gene, products }) {
  const { _id, name, synonyms, bnumber, externalCrossReferences } =
    gene;

  return (
    <div className={style.base} >
      <div className={style.title}>
        <div>
          <Typography variant="irrelevant">Gene</Typography>
          <Typography variant="h1"><span dangerouslySetInnerHTML={{__html: name}} /></Typography>
        </div>
        <div className={style.divider}>
          <Divider orientation="vertical" />
        </div>
        {DataVerifier.isValidArray(products) && (
          <div>
            <Typography variant="irrelevant">Product</Typography>
            <Typography variant="h1">
              <span dangerouslySetInnerHTML={{__html: products.map((product) => product.name).join(", ")}} />
            </Typography>
          </div>
        )}
      </div>
      <div className={style.mainInfo} >
        <div>
          {DataVerifier.isValidArray(synonyms) && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="relevantB" sx={{ mr: 1 }}>
                Synonyms:
              </Typography>
              <Typography variant="relevant">
                {synonyms.map((synonym) => synonym).join(", ")}
              </Typography>
            </div>
          )}
          {DataVerifier.isValidString(bnumber) && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="relevantB" sx={{ mr: 1 }}>
                Bnumber:
              </Typography>
              <Typography variant="relevant">
                {bnumber}
              </Typography>
            </div>
          )}
          {DataVerifier.isValidArray(products) && (
            <div>
              {DataVerifier.isValidArray(products[0].cellularLocations) && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="relevantB" sx={{ mr: 1 }}>
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
          <Info {...gene} />
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