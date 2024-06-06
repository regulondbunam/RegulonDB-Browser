import React from "react";
import { Typography, Divider, Tooltip } from "@mui/material";
import { DataVerifier } from "ui-components/utils";
import Info from "./Info";
import ExternalReferences from "./ExternalReferences";
import style from "./cover.module.css";

export default function Cover({ gene, products }) {
  const { _id, name, synonyms, bnumber, externalCrossReferences, fragments } =
    gene;
  console.log(fragments);
  return (
    <div className={style.base}>
      <div className={style.title}>
        <div>
          <Typography variant="irrelevant">Gene</Typography>
          <Typography variant="h1">
            <span dangerouslySetInnerHTML={{ __html: name }} />
          </Typography>
        </div>
        <div className={style.divider}>
          <Divider orientation="vertical" />
        </div>
        {DataVerifier.isValidArray(products) && (
          <div>
            <Typography variant="irrelevant">Product</Typography>
            <Typography variant="h1">
              <span
                dangerouslySetInnerHTML={{
                  __html: products.map((product) => product.name).join(", "),
                }}
              />
            </Typography>
          </div>
        )}
      </div>
      <div className={style.mainInfo}>
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
              <Typography variant="relevant">{bnumber}</Typography>
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
          {DataVerifier.isValidArray(fragments)&& (
            <div>
              <Typography variant="relevantB" sx={{ mr: 1 }}>
                    {`Fragmented gene in ${fragments.length} parts`}
                  </Typography>
                  {fragments.map(fragment=><Fragment key={"fragment_info_gene_"+fragment.id} {...fragment} strand={gene.strand} />)}
            </div>
          )}
        </div>
        <div className={style.references}>
          <ExternalReferences
            id={_id}
            externalCrossReferences={externalCrossReferences}
          />
        </div>
      </div>
      <div style={{ height: "18px" }} />
    </div>
  );
}

function Fragment({
  centisomePosition,
  leftEndPosition,
  name,
  rightEndPosition,
  strand
}) {
  return (
    <div>
      <Typography variant="relevantB" sx={{ mr: 1 }}>
        {`${name} : `}
      </Typography>
      <Tooltip title="left position">
        <Typography variant="relevant">{leftEndPosition} &nbsp;</Typography>
      </Tooltip>
      <Typography variant="relevant">
        {strand === "reverse" ? "<-" : "->"} &nbsp;
      </Typography>
      
      <Tooltip title="right position">
        <Typography variant="relevant">{rightEndPosition} &nbsp;</Typography>
      </Tooltip>
      <Tooltip title="centisome position">
        <Typography variant="relevant">
          ({centisomePosition}&nbsp;centisome)&nbsp;
        </Typography>
      </Tooltip>
      <Tooltip title="length">
        <Typography variant="relevant">
          ({1 + rightEndPosition - leftEndPosition + " bp"})
        </Typography>
      </Tooltip>
    </div>
  );
}
