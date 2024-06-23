import React, { useMemo } from 'react'
import { Cover } from 'ui-components/Web/Cover'
import FilterTable from 'ui-components/Web/FilterTable'
import { DataVerifier } from 'ui-components/utils'
import { Button, Typography, CircularProgress as Circular } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useGetDatasetByAdvancedSearch, useGetGeneExpressionByAdvancedSearch, useGetNLPGC, } from 'webServices/queries'



export default function GENeEXPRESSION({ experimentType, tfName, datasetType, gene }) {
    const { datasets, loading, error } = useGetDatasetByAdvancedSearch(datasetType + "[datasetType]")
    const { nlgc, loading: nlgcLoading } = useGetNLPGC()
    const { geneExpression, loading: geLoading } = useGetGeneExpressionByAdvancedSearch(`${DataVerifier.isValidString(gene) ? gene : ""}[gene.name]`)
    let title = datasetType
    if (gene) {
        title = `Datasets GENE_EXPRESSION with gene ${gene}`
    }
    if (error) {
        return <div>
            <Cover state={"error"} >
                <Typography variant='h1' >Error</Typography>
            </Cover>
        </div>
    }
    if (loading || nlgcLoading || geLoading) {
        return <div>
            <Cover state={"loading"} >
                <Typography variant='h1' >Loading Datasets...</Typography>
            </Cover>
            <br />
            <Circular />
        </div>
    }
    if (datasets) {
        //console.log(datasets);
        return (
            <div>
                <Cover>
                    <Typography variant='h1' >{title}</Typography>
                </Cover>
                <br />
                <Table datasets={datasets} nlgc={nlgc} gene={gene} geneExpression={geneExpression} />
            </div>
        )
    }
}

function Table({ datasets, nlgc, gene, geneExpression }) {
    const table = useMemo(() => processData(datasets, nlgc, gene, geneExpression), [datasets, nlgc, gene, geneExpression])
    return <FilterTable columns={table.columns} data={table.data} />
}


function processData(datasets = [], nlgc,gene, geneExpression) {
    const isGene = DataVerifier.isValidArray(geneExpression)
    let geneColumns = []
    if (isGene) {
        geneColumns = [{
            label: "Gene Name",
        },
        {
            label: "FPKM",
        },
        {
            label: "TMP",
        }]
    }
    //console.log(nlgc);
    let table = {
        columns: [
            {
                label: "id",
            },
            {
                label: "Title"
            },
            ...geneColumns,
            {
                label: "Publication Title",
                hide: true
            },
            {
                label: "Publication Authors",
                hide: true
            },
            {
                label: "NLP Growth Conditions",
            },
        ],
        data: []
    }
    // processData
    datasets.forEach(dataset => {
        let geneProperties = {}
        if (isGene) {
            const expression = geneExpression.find(ge => ge.datasetIds.find(id => id === dataset._id))
            if (!expression) {
                return null
            }
            geneProperties={
                 "Gene Name":expression.gene.name,
                 "FPKM":expression.fpkm,
                 "TMP":expression.tpm,
            }
        }

        let publicationsTitle = []
        let publicationsAuthors = new Set()
        if (DataVerifier.isValidArray(dataset.publications)) {
            dataset.publications.forEach((publication) => {
                publicationsTitle.push(publication.title)
                if (DataVerifier.isValidArray(publication.authors)) {
                    publication.authors.forEach(author => publicationsAuthors.add(author))
                }
            })
        }
        let NLPGC = []
        const conditions = nlgc.find(condition => condition.datasetIds.find(id => id === dataset._id))
        if (conditions) {
            Object.keys(conditions).forEach(key => {
                if (DataVerifier.isValidArray(conditions[key]) && key !== "datasetIds") {
                    let value
                    if (key === "additionalProperties") {
                        value = key + ": " + conditions[key].map((cont) => {
                            if (DataVerifier.isValidArray(cont.value)) {
                                return cont.name + ": " + cont.value.map(vl => vl.value).join("; ")
                            }
                            return ""
                        }).join("; ")
                    } else {
                        value = key + ": " + conditions[key].map((cont) => {
                            return cont.value
                        }).join("; ")
                    }

                    NLPGC.push(value)
                }
            })
        }
        if (isGene)
            table.data.push({
                "id": <LinkDataset value={dataset._id} datasetId={dataset._id} />,
                "Title": DataVerifier.isValidString(dataset?.sample?.title) ? dataset?.sample.title : "",
                ...geneProperties,
                "Publication Title": publicationsTitle.join(", "),
                "Publication Authors": [...publicationsAuthors].join(", "),
                "NLP Growth Conditions": NLPGC.join(" | "),
            })
    })
    return table
}

function LinkDataset({ datasetId }) {
    const navigate = useNavigate()
    return <Button onClick={() => { navigate("./dataset/GENE_EXPRESSION/datasetId=" + datasetId) }} >{datasetId}</Button>
}
