import React, { useMemo } from 'react'
import { Cover } from 'ui-components/Web/Cover'
import FilterTable from 'ui-components/Web/FilterTable'
import { DataVerifier } from 'ui-components/utils'
import { Button, Typography, CircularProgress as Circular } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useGetDatasetByAdvancedSearch, useGetNLPGC } from 'webServices/queries'



export default function GENeEXPRESSION({ experimentType, tfName, datasetType }) {
    const { datasets, loading, error } = useGetDatasetByAdvancedSearch(datasetType + "[datasetType]")
    const { nlgc, loading: nlgcLoading } = useGetNLPGC()
    let title = datasetType
    if (experimentType) {
        title += ` with strategy ${experimentType}`
    }
    if (tfName) {
        title += ` only TF ${tfName}`
    }
    if (error) {
        return <div>
            <Cover state={"error"} >
                <Typography variant='h1' >Error</Typography>
            </Cover>
        </div>
    }
    if (loading || nlgcLoading) {
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
                <Table datasets={datasets} nlgc={nlgc} />
            </div>
        )
    }
}

function Table({ datasets, nlgc }) {
    const table = useMemo(() => processData(datasets, nlgc), [datasets, nlgc])
    return <FilterTable columns={table.columns} data={table.data} />
}


function processData(datasets = [], nlgc) {
    //console.log(nlgc);
    let table = {
        columns: [
            {
                label: "id",
            },
            {
                label: "Title"
            },
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
        let objects = []
        let genes = []
        if (DataVerifier.isValidArray(dataset.objectsTested)) {
            dataset.objectsTested.forEach((obj) => {
                objects.push(obj.name)
                if (DataVerifier.isValidArray(obj.genes)) {
                    genes = obj.genes.map(gene => gene.name)
                }
            })
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
        let growthConditions = []
        if (DataVerifier.isValidObject(dataset.growthConditions)) {
            Object.keys(dataset.growthConditions).forEach(key => {
                if (DataVerifier.isValidString(dataset.growthConditions[key]) && !key.includes("__")) {
                    growthConditions.push(`${key}: ${dataset.growthConditions[key]}`)
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
                                return cont.name+": "+cont.value.map(vl=>vl.value).join("; ")
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
        table.data.push({
            "id": <LinkDataset value={dataset._id} datasetId={dataset._id} />,
            "Transcription Factor": objects.join(", "),
            "Title": DataVerifier.isValidString(dataset?.sample?.title) ? dataset?.sample.title : "",
            "Strategy": DataVerifier.isValidString(dataset?.sample?.strategy) ? dataset?.sample.strategy : "",
            "Genes": genes.join(", "),
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
