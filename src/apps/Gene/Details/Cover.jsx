import React from "react";
import { Typography, Divider } from "@mui/material";
import { DataVerifier } from "ui-components/utils";

export default function Cover({ gene, products }) {
  const { name, synonyms, leftEndPosition, rightEndPosition, strand, bnumber } =
    gene;

  return (
    <div style={{ marginLeft: "5%" }}>
      <div style={{ display: "flex" }}>
        <div>
          <Typography variant="irrelevant">Gene</Typography>
          <Typography variant="h1">{name}</Typography>
        </div>
        <div style={{ height: "50px", margin: "10px", display: "flex", alignItems: "center" }}>
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
      <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
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
                {`${rightEndPosition}${
                  strand === "reverse" ? " <- " : " -> "
                }${leftEndPosition}`}
              </Typography>
            </div>
          )}
          {DataVerifier.isValidArray(products) && (
            <div>
              {DataVerifier.isValidArray(products[0].cellularLocations) && (
                <>
                  <Typography variant="irrelevant" sx={{ mr: 1 }}>
                  Location:
                  </Typography>
                  <Typography variant="relevant">
                    {products
                      .map((product) =>
                        DataVerifier.isValidArray(product.cellularLocations)
                          ? product.cellularLocations.join(",")
                          : ""
                      )
                      .join(", ")}
                  </Typography>
                </>
              )}
            </div>
          )}
        </div>
        <div>
            "hola"
        </div>
      </div>
    </div>
  );
}
