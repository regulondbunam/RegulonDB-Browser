import { Select, MenuItem, InputLabel } from "@mui/material";
import useController from "./useController";
import Style from "./style.module.css";

export default function GeneOntology({
  geneOntology = {
    biologicalProcess: [],
    cellularComponent: [],
    molecularFunction: [],
  },
}) {
  const { viewOption, viewOptions, handleToChangeViewOption } =
    useController(geneOntology);

  return (
    <div>
      <div className={Style.selector}>
        <p>GO terms view by</p>
        <Select
          labelId={"simple-select-GOviewOption"}
          value={viewOption}
          label="GO terms view by"
          onChange={handleToChangeViewOption}
          variant="standard"
        >
          {viewOptions.map((option, index) => (
            <MenuItem key={"view_optionGO-" + index} value={index}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
        {viewOption === 0 && (
            <div>
                {geneOntology?.biologicalProcess?.length !== 0 && (
                    <OntologyTerms goTerms={geneOntology.biologicalProcess} name="Biological Process" />
                )}
                {geneOntology?.cellularComponent?.length !== 0 && (
                    <OntologyTerms goTerms={geneOntology.cellularComponent} name="Cellular Component" />
                )}
                {geneOntology?.molecularFunction?.length !== 0 && (
                    <OntologyTerms goTerms={geneOntology.molecularFunction} name="Molecular Function" />
                )}
            </div>
        )}
    </div>
  );
}

const OntologyTerms = ({ goTerms, name }) => {
  return (
      <div>
          <div><p className={Style.otName} >{name}</p></div>
          <div className={Style.otContainer} >
              {goTerms.map((go, index) => (
                  <div key={"go_"+name+"_" + index}>
                      <p className={Style.otTermName} >{go.name}</p>
                      {go?.genes?.length !== 0 && (
                          <div className={Style.otTermGeneContainer}>
                              <p>Genes: </p>
                              {go?.genes?.map((gene, index) => (
                                  <p key={"gene_biologicalProcess_" + index}>{gene}</p>
                              ))}
                          </div>
                      )}
                  </div>
              ))}
          </div>
      </div>
  )
}
