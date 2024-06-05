import React from "react";
import { Typography, Divider } from "@mui/material";
import { DataVerifier } from "ui-components/utils";
import Info from "./Info";
import ExternalReferences from "./ExternalReferences";
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
          <ExternalReferences id={_id} externalCrossReferences={externalCrossReferences} />
        </div>
      </div>
      <div style={{height: "18px"}} />
    </div>
  );
}