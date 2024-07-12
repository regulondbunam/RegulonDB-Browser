import React, { useMemo, useState } from 'react'
import { Typography } from '@mui/material'
import { DataVerifier } from 'ui-components/utils'
import FilterTable from 'ui-components/Web/FilterTable'
import { Link } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Genes({ genes, terms, regulator }) {
    const [view, setView] = useState(0)

    const name = DataVerifier.isValidString(regulator.abbreviatedName) 
        ? "Regulated genes by "+regulator.abbreviatedName+" regulator"
        : ""

    return (
        <div>
            <br />
            <div style={{width: "200px"}}>
            <FormControl fullWidth >
                <InputLabel id="selectView">Select order</InputLabel>
                <Select
                    value={view}
                    label="Order"
                    onChange={(event)=>{setView(event.target.value)}}
                >
                    <MenuItem value={0}>by Gene</MenuItem>
                    <MenuItem value={1}>by Multifunction</MenuItem>
                    <MenuItem value={2}>by Gene Ontology</MenuItem>
                    <MenuItem value={4}>all orders</MenuItem>
                </Select>
                </FormControl>
            </div>
                {(view === 0 || view === 4) && <ByGene genes={genes} />}
                {(view === 1 || view === 4) && <ByGene genes={genes} />}


        </div>
    )
}

function ByGene({ genes }) {
    const table = useMemo(() => {
        let _table = {
            columns: [
                { key: "gene", label: "Genes", width: 30 },
                { key: "fun", label: "Function", width: 40 },
                { key: "multi", label: "Multifunction" },
                { key: "bioPro", label: "Biological Process" },
                { key: "ceCom", label: "Cellular Component" },
                { key: "mol", label: "Molecular Function" },
            ],
            data: []
        }
        if (!DataVerifier.isValidArray(genes)) {
            return _table
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
    return <FilterTable {...table} tableName='' />
}
