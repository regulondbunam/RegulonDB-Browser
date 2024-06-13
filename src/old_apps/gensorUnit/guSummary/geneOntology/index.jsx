import React from "react";
import { DataVerifier } from "../../../../components/ui-components";

function GeneOntology({
  biologicalProcess,
  cellularComponent,
  molecularFunction,
}) {
  return <div>
    {DataVerifier.isValidArray(biologicalProcess) && (
        <div>
            <p><b>Biological Process:</b></p>
            {biologicalProcess.map((bp, indx)=><p key={"biologicalProcess_"+indx} >{bp.name}</p>)}
        </div>
    )}
    {DataVerifier.isValidArray(biologicalProcess) && (
        <div>
            <p><b>Cellular Component:</b></p>
            {cellularComponent.map((cc, indx)=><p key={"cellularComponent_"+indx} >{cc.name}</p>)}
        </div>
    )}
    {DataVerifier.isValidArray(molecularFunction) && (
        <div>
            <p><b>Biological Process:</b></p>
            {molecularFunction.map((mf, indx)=><p key={"molecularFunction_"+indx} >{mf.name}</p>)}
        </div>
    )}
  </div>;
}

export default GeneOntology;
