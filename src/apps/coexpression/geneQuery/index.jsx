import React from "react";
import { Accordion } from "../../../components/ui-components";
import Selected from "./selected";
import Information from "./information";
import LinearProgress from "@mui/material/LinearProgress";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function GeneQuery({
  deleteGene,
  genes,
  genesId,
  genesList,
  loadGeneState,
  selectGene,
  setDemo,
  reset,
  organismId
}) {
  //console.log(genes);
  return (
    <div>
      <div style={{ margin: "10px 0 10px 5px", display: "flex" }}>
        <div style={{display: "flex", alignItems: "center"}} >
          <HelpOutlineIcon sx={{color: "blue"}} fontSize="large" />
        </div>
        <div>
          <p>This section aims to give an overview of the different characteristics that are known about the genes in the query, such as their transcriptional regulation, their gene product, the operon to which they belong and the description of the gene ontologies to which they are associated. You can add new genes to the query by searching for them in the search box, or you can delete the gene by clicking on the "X" icon next to the gene name. The table can be sorted by any of the characteristics by clicking on the icon next to the name of the column associated to the characteristic.</p>
        </div>
      </div>
      <Accordion title={"Gene Select (" + genesId.length + ")"}>
        <Selected
          geneList={genesList}
          genesId={genesId}
          selectGene={selectGene}
          deleteGene={deleteGene}
          setDemo={setDemo}
          reset={reset}
        />
      </Accordion>
      <Accordion title={"Gene Information"}>
        {!loadGeneState.loading ? (
          <Information genes={genes} organismId={organismId} />
        ) : (
          <LinearProgress
            variant="determinate"
            value={loadGeneState.loadState}
          />
        )}
      </Accordion>
    </div>
  );
}
/*

*/
