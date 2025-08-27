import React, { useState } from "react";
import { DataVerifier } from "../../../../components/ui-components";

function GeneOntology({
  biologicalProcess,
  cellularComponent,
  molecularFunction,
}) {
  const [expanded, setExpanded] = useState(null); // guarda la key expandida

  const renderTerms = (terms, keyPrefix, title) =>
    DataVerifier.isValidArray(terms) && (
      <div>
        <p><b>{title}:</b></p>
        {terms.map((t, indx) => {
          const key = keyPrefix + "_" + indx;
          const isExpanded = expanded === key;

          return (
            <p key={key}>
              {t.name}{" "}
              <i>
                (
                {isExpanded ? (
                  <span>
                    {t.genes.join(", ")}{" "}
                    <span
                      style={{ cursor: "pointer", color: "#72A7C7" }}
                      onClick={() => setExpanded(null)}
                    >
                      [hide]
                    </span>
                  </span>
                ) : (
                  <span
                    style={{ cursor: "pointer", color: "#72A7C7" }}
                    onClick={() => setExpanded(key)}
                  >
                    {t.genes.length}
                  </span>
                )}
                )
              </i>
            </p>
          );
        })}
      </div>
    );

  return (
    <div>
      {renderTerms(biologicalProcess, "biologicalProcess", "Biological Process")}
      {renderTerms(cellularComponent, "cellularComponent", "Cellular Component")}
      {renderTerms(molecularFunction, "molecularFunction", "Molecular Function")}
    </div>
  );
}

export default GeneOntology;
