import React from 'react';
import FilterTable from '../../../../../components/ui-components/filterTable2';
import { Link } from 'react-router-dom';

const COLUMNS = [
    { label: "Gene", width: 50 },
    { label: "Function", width: 50 },
    //{ label: "Multifunction" },
    { label: "Biological Process" },
    { label: "Cellular Component" },
    { label: "Molecular Function" }
]

const OntologyView = ({value="",terms = []})=>{
    return (<div value={value} style={{ overflow: "auto", height: 75 }} >
        {terms.map((mf) => {
            return <div key={"bp_" + mf._id} style={{ fontSize: "10px" }} >{mf.name}</div>
        })}
    </div>)
}

function formatTable(genes = []) {
    let data = []
    // console.log(genes[0]);
    genes.forEach((gene) => {
        const terms = gene.terms
        //const strMultifunction = terms?.multifun ? terms.multifun.map((multi) => { return multi.name }).join("; ") : ""
        const strBiologicalProcess = terms?.geneOntology ? terms.geneOntology.biologicalProcess.map((multi) => { return multi.name }).join("; ") : ""
        const strCellularComponent = terms?.geneOntology ? terms.geneOntology.cellularComponent.map((multi) => { return multi.name }).join("; ") : ""
        const strMolecularFunction = terms?.geneOntology ? terms.geneOntology.molecularFunction.map((multi) => { return multi.name }).join("; ") : ""
        data.push({
            "Gene": <div value={gene.name}>
                <Link to={"/gene/" + gene._id}>
                    <p>{`${gene.name}`}</p>
                </Link>
            </div>,
            "Function": gene.function,
            //"Multifunction": strMultifunction,
           // biologicalProcess: ,
            "Biological Process": <OntologyView value={strBiologicalProcess} terms={terms.geneOntology?.biologicalProcess ? terms.geneOntology?.biologicalProcess : []} />,
           // cellularComponent: ,
            "Cellular Component": <OntologyView value={strCellularComponent} terms={terms.geneOntology?.cellularComponent ? terms.geneOntology?.cellularComponent : []}/>,
           // molecularFunction: ,
            "Molecular Function": <OntologyView value={strMolecularFunction} terms={terms.geneOntology?.molecularFunction ? terms.geneOntology?.molecularFunction : []} />,
        })

    })
    return data
}

function Genes({ genes, idPanel = "regulates_genes" }) {
    const geneData = React.useMemo(() => { return formatTable(genes) }, [genes])


    return (
        <div>
            <div id={idPanel} style={{overflow: "auto"}} >
                {
                    !geneData
                        ? (<p>Loading...</p>)
                        : <FilterTable columns={COLUMNS} data={geneData} tableName={`Regulated Genes: ${genes.length}`} />
                }
            </div>
        </div>
    );
}

export default Genes;
