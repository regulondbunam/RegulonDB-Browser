import React from "react";
import GeneOntology from "./geneOntology";
import TableReactions from "./TableReactions";

export default function Summary({ reactions, geneOntology, components }) {
  return (
    <div>
      <br />
      <TableReactions reactions={reactions} />
      <br />
      <GeneOntology {...geneOntology} />
      
    </div>
  );
}
