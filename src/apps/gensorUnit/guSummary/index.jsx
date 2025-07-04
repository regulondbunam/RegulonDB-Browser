import { useMemo } from "react";
import { DataVerifier, AnchorNav } from "../../../components/ui-components";
import Table from "./table";
import GeneOntology from "./geneOntology";

export default function Summary({
    idSite, 
  gensorUnit,
  reactions,
}) {
    const sections = useMemo(()=>{
        let _sections = []
        const {
          biologicalProcess,
          cellularComponent,
          molecularFunction
        } = gensorUnit.geneOntology
        if(DataVerifier.isValidObject(gensorUnit.summary)){
            if (DataVerifier.isValidObject(gensorUnit.summary.molecularBiologyLevel)){
                _sections.push({
                    id: "gi_section2_molecularBiologyLevel",
                    label: `Molecular Biology Level`,
                    title: `Molecular Biology Level`,
                    component: (
                        <div style={{margin: "15px"}} >
                            {gensorUnit.summary.molecularBiologyLevel?.detailed}
                        </div>
                    ),
                });
            }
            if (DataVerifier.isValidObject(gensorUnit.summary.physiologyLevel)){
                _sections.push({
                    id: "gi_section2_physiologyLevel",
                    label: `Physiology Level`,
                    title: `Physiology Level`,
                    component: (
                        <div style={{margin: "15px"}} >
                            {gensorUnit.summary.physiologyLevel?.detailed}
                        </div>
                    ),
                });
            }
        }
        if(DataVerifier.isValidArray(reactions)){
          _sections.push({
            id: "gi_section1_reactions",
            label: `Reactions (${reactions.length})`,
            title: `Reactions (${reactions.length})`,
            component: (
              <div >
                <Table reactions={reactions} />
              </div>
            ),
          });
        }
        if(DataVerifier.isValidArray(biologicalProcess) || DataVerifier.isValidArray(cellularComponent) || DataVerifier.isValidArray(molecularFunction)){
          _sections.push({
            id: "gi_section2_geneOntology",
            label: `Gene Ontology`,
            title: `Gene Ontology`,
            component: (
              <div >
               <GeneOntology {...gensorUnit.geneOntology}/>
              </div>
            ),
          });
        }

        return _sections
      },[reactions, gensorUnit])
    return (
        <AnchorNav sections={sections} title={"Gensor Unit"+gensorUnit.name} />
    )
}