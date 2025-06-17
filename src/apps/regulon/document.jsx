import { useMemo } from "react";
import { AnchorNav, DataVerifier } from "../../components/ui-components"
import { useIndexedCitation, AllCitations } from "../../components/datamartSchema"
import Regulates from "./_oldDetails/regulates";
import DiagramRegulatoryNetwork from "./_oldDetails/regulatoryNetwork";
import RegulatoryInteractions from "./_oldDetails/regulatoryInteractions";
import Regulator from "./_oldDetails/regulator";
import Terms from "./_oldDetails/terms";
import RelatedTool from "./related";



const cardOptions = {
    showTitle: true
}

export default function Document({ regulonData, section }) {

    const {indexedCitations, publications, evidences} = useIndexedCitation(regulonData.allCitations)

    const related = <RelatedTool regulonData={regulonData} />
    
    const sections = useMemo(() => {

        const {
            _id,
            allCitations,
            regulates,
            regulator,
            regulatoryInteractions,
            //summary,
            terms,
        } = regulonData
       // console.log(regulatoryInteractions);
        let _sections = []
        if(DataVerifier.isValidObject(regulator)){
            _sections.push({
                id: "RegulonTab_Regulator",
                label: "Regulator",
                title: "Regulator "+regulator.abbreviatedName,
                component: <div style={{ overflow: "auto" }} >
                    <Regulator regulator={regulator} allCitations={indexedCitations} />
                </div>,
            })
        }
        if(DataVerifier.isValidObject(regulates)){
            _sections.push({
                id: "RegulonTab_Regulon",
                label: "Regulon",
                title: "Regulon",
                component: <div style={{ overflow: "auto" }} >
                    <DiagramRegulatoryNetwork regulonId={_id} />
                    <Regulates regulates={regulates} allCitations={indexedCitations} />
                </div>,
            })
        }
        if(DataVerifier.isValidArray(regulatoryInteractions)){
            _sections.push({
                id: "RegulonTab_RegulatoryInteractions",
                label: "Regulatory Interactions",
                title: "Regulatory Interactions",
                component: <div style={{ overflow: "auto" }} >
                    <RegulatoryInteractions regulatoryInteractions={regulatoryInteractions} allCitations={indexedCitations} tfName={regulator.abbreviatedName}/>
                </div>,
            })
        }
        if(DataVerifier.isValidObject(terms)){
            _sections.push({
                id: "RegulonTab_Terms",
                label: "GO Terms of regulated genes",
                title: "GO Terms of regulated genes ",
                component: <div style={{ overflow: "auto" }} >
                    <Terms geneOntology={terms.geneOntology} multifun={terms.multifun} allCitations={indexedCitations} />
                </div>,
            })
        }
        if(DataVerifier.isValidArray(allCitations)){
            _sections.push({
                id: "RegulonTab_Citations",
                label: "All References and Evidence",
                title: "All References and Evidence",
                component: <div style={{ overflow: "auto" }} >
                    <AllCitations evidences={evidences} publications={publications}/>
                </div>,
            })
        }
        return _sections
    }, [regulonData,evidences,indexedCitations,publications])

    return (
        <div>
            <AnchorNav sections={sections} cardOptions={cardOptions} aside={related}
                title={`Regulon ${regulonData.regulator.abbreviatedName}`} />
        </div>
    )
}