import React, { useMemo } from 'react'
import { Cover } from 'ui-components/Web/Cover'
import FilterTable from 'ui-components/Web/FilterTable'
import { DataVerifier } from 'ui-components/utils'
import { Button, Typography, CircularProgress as Circular } from '@mui/material'
import { useGetDatasetByAdvancedSearch } from 'webServices/queries'
import { useNavigate } from 'react-router-dom'



export default function TUS({ experimentType, tfName, datasetType }) {
    const { datasets, loading, error } = useGetDatasetByAdvancedSearch(datasetType+"[datasetType]")
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
    if (loading) {
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
                <Table datasets={datasets} datasetType={datasetType} />
            </div>
        )
    }
}

function Table({ datasets, datasetType }) {
    const table = useMemo(() => processData(datasets,datasetType), [datasets,datasetType])
    return <FilterTable columns={table.columns} data={table.data} tableName='' />
}


function processData(datasets = [],datasetType) {
    let table = {
        columns: [
            {
                label: "id",
            },
            {
                label: "Title"
            },
            {
                label: "Strategy",
            },
            {
                label: "Publication Title",
            },
            {
                label: "Publication Authors",
                hide: true
            },
            {
                label: "Growth Conditions",
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
        table.data.push({
            "id": <LinkDataset value={dataset._id} datasetId={dataset._id} datasetType={datasetType} />,
            "Transcription Factor": objects.join(", "),
            "Title": DataVerifier.isValidString(dataset?.sourceSerie?.title) ? dataset?.sourceSerie.title : "",
            "Strategy": DataVerifier.isValidString(dataset?.sourceSerie?.strategy) ? dataset?.sourceSerie.strategy : "",
            "Genes": genes.join(", "),
            "Publication Title": publicationsTitle.join(", "),
            "Publication Authors": [...publicationsAuthors].join(", "),
            "Growth Conditions": growthConditions.join("; ")
        })
    })
    return table
}

function LinkDataset({ datasetId, datasetType }) {
    const navigate = useNavigate()
    //TFBINDING
    return <Button onClick={() => { navigate("./dataset/"+datasetType+"/datasetId=" + datasetId) }} >{datasetId}</Button>
}
