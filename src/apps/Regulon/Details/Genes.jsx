import React, { useMemo } from 'react'
import { Typography } from '@mui/material'
import { DataVerifier } from 'ui-components/utils'
import FilterTable from 'ui-components/Web/FilterTable'
import { Link } from 'react-router-dom'
import { ParagraphCitations, CITATION_SIZE } from 'ui-components/Web/Citations'

export default function Genes({ genes, terms, regulator, references }) {
    let name = ""
    if(DataVerifier.isValidString(regulator.abbreviatedName)){
        name = "Regulated genes in "+regulator.abbreviatedName+" regulator"
    }else{
        name = DataVerifier.isValidString(regulator.name)
            ? "Regulated genes in "+regulator.name
            : ""
    }

    return (
        <div>
            <br />
            
            {DataVerifier.isValidArray(genes) && <ByGene genes={genes} name={name} />}
            {DataVerifier.isValidArray(terms.multifun) && <ByMultifun multifun={terms.multifun}  name={name} />}
            {DataVerifier.isValidObject(terms.geneOntology) && <ByOntology geneOntology={terms.geneOntology} name={name} references={references} />}    
        </div>
    )
}

function ByGene({ genes = [], name="" }) {
    const table = useMemo(() => {
        let _table = {
            columns: [
                { key: "gene", label: "Gene", width: 30 },
                { key: "fun", label: "Function", width: 40 },
                { key: "multi", label: "Multifunction" },
                { key: "bioPro", label: "Biological Process" },
                { key: "ceCom", label: "Cellular Component" },
                { key: "mol", label: "Molecular Function" },
            ],
            data: []
        }
        for (const gene of genes) {
            //multifun
            const multifun = DataVerifier.isValidArray(gene.terms.multifun)
                ? gene.terms.multifun.map(fun => fun.name).join("; ")
                : []
            //biology process
            const bioPro = DataVerifier.isValidArray(gene.terms?.geneOntology?.biologicalProcess)
                ? gene.terms?.geneOntology?.biologicalProcess.map(fun => fun.name).join("; ")
                : []
            //Cellular Component
            const ceCom = DataVerifier.isValidArray(gene.terms?.geneOntology?.cellularComponent)
                ? gene.terms?.geneOntology?.cellularComponent.map(fun => fun.name).join("; ")
                : []
            //Cellular Component
            const mol = DataVerifier.isValidArray(gene.terms?.geneOntology?.molecularFunction)
                ? gene.terms?.geneOntology?.molecularFunction.map(fun => fun.name).join("; ")
                : []

            _table.data.push({
                gene: <Link value={gene.name} to={"/gene/" + gene._id}><Typography><span dangerouslySetInnerHTML={{ __html: gene.name }} /></Typography></Link>,
                fun: <Typography value={gene.function} >{gene.function}</Typography>,
                multi: <Typography value={multifun} sx={{ whiteSpace: "nowrap" }} >{multifun}</Typography>,
                bioPro: <Typography value={bioPro} sx={{ whiteSpace: "nowrap" }} >{bioPro}</Typography>,
                ceCom: <Typography value={ceCom} sx={{ whiteSpace: "nowrap" }} >{ceCom}</Typography>,
                mol: <Typography value={mol} sx={{ whiteSpace: "nowrap" }} >{mol}</Typography>,
            })
        }
        return _table
    }, [genes])
    return <FilterTable {...table} tableName={`${name} order by Genes`} titleVariant='h3' />
}

function ByMultifun({ multifun = [], name="" }) {
    const table = useMemo(() => {
        let _table = {
            columns: [
                { key: "multi", label: "Multifunction", width: 30 },
                { key: "genes", label: "Genes",  },
            ],
            data: []
        }
        for (const fun of multifun) {
            //multifun
            const genes = DataVerifier.isValidArray(fun.genes)
                ? fun.genes
                : []

            _table.data.push({
                multi: <Typography value={fun.name} sx={{ whiteSpace: "nowrap" }} >{fun.name}</Typography>,
                genes: <Typography value={genes.map(fun => fun.name).join("; ")} sx={{ whiteSpace: "nowrap" }} >
                    {genes.map(gene=>{
                        return (
                            <Link style={{marginLeft: "5px",  }} value={gene.name} key={`gene_${gene._id}_InMultifun_${multifun._id}`} to={"/gene/" + gene._id}>
                                    <span dangerouslySetInnerHTML={{ __html: gene.name }} />
                            </Link>
                        )
                    })}
                </Typography>,
            })
        }
        return _table
    }, [multifun])
    return <FilterTable {...table} tableName={`${name} order by Multifunction`} titleVariant='h3' />
}

function ByOntology({ 
    geneOntology = {},
    name="",
    references
}) {
    const LABELS = {
        biologicalProcess: "Biological Process",
        cellularComponent: "Cellular Component",
        molecularFunction: "Molecular Function",
    }
    return <div>
        <Typography variant='h3' >Gene Ontology</Typography>
        <div style={{marginLeft: "15px"}} >
        {Object.keys(geneOntology).map(key=>{
            const ontology = geneOntology[key]
            if(!LABELS[key]){
                return null
            }
            if(!DataVerifier.isValidArray(ontology)){
                return null
            }
            return(
                <div key={"regulationInGeneOntology_"+key} >
                    <Typography variant='relevantB' >{LABELS[key]}</Typography>
                    <div style={{marginLeft: "10px"}}>
                        {ontology.map(ont=>{
                            return <div key={"regulationInGeneOntology_"+ont._id} style={{display: "flex"}} >
                                <Typography>{ont.name}</Typography>
                                <ParagraphCitations citations={ont.citations} references={references} citationSize={CITATION_SIZE.ONLY_INDEX} />
                            </div>
                        })}
                    </div>
                </div>
            )
        })}
        </div>
    </div>
}