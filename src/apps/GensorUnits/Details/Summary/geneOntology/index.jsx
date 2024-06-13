import React from "react";
import { DataVerifier } from "ui-components/utils";
import { Typography } from "@mui/material";
import { AccordionHighlight } from "ui-components/Web/Accordion";

function GeneOntology({
  biologicalProcess,
  cellularComponent,
  molecularFunction,
}) {
  return <AccordionHighlight title={<Typography variant="h2" color={"#ffffff"} defaultExpanded={true}  >Gene Ontology Terms</Typography>}>
    {DataVerifier.isValidArray(biologicalProcess) && (
        <div>
            <div>
              <Typography variant="relevantB" >Biological Process:</Typography>
            </div>
           <div style={{marginLeft: "20px"}} >
           {biologicalProcess.map((bp, indx)=><div key={"biologicalProcess_"+indx} ><Typography variant="relevant"  >{bp.name}</Typography></div>)}
           </div>
        </div>
    )}
    {DataVerifier.isValidArray(biologicalProcess) && (
        <div>
          <div>
              <Typography variant="relevantB" >Cellular Component:</Typography>
            </div>
            <div style={{marginLeft: "20px"}} >
            {cellularComponent.map((cc, indx)=><div key={"cellularComponent_"+indx} ><Typography variant="relevant" >{cc.name}</Typography></div>)}
           </div>
        </div>
    )}
    {DataVerifier.isValidArray(molecularFunction) && (
        <div>
          <div>
              <Typography variant="relevantB" >Biological Process:</Typography>
            </div>
            <div style={{marginLeft: "20px"}} >
            {molecularFunction.map((mf, indx)=><div key={"molecularFunction_"+indx} ><Typography variant="relevant" >{mf.name}</Typography></div>)}
            </div>
        </div>
    )}
  </AccordionHighlight>;
}

export default GeneOntology;
