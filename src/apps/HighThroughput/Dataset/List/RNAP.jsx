import React, { useMemo } from 'react'
import { Cover, Circular, DataVerifier } from '../../../../../components/ui-components'
import FilterTable from "./filterTable"
import { Button, Typography } from '@mui/material'
import { useGetDatasetByAdvancedSearch } from '../../../../../regulondb-ws/queries'
import { useNavigate } from 'react-router-dom'



export default function RNAP({ experimentType, tfName }) {
    const { datasets, loading, error } = useGetDatasetByAdvancedSearch("RNAP_BINDING_SITES[datasetType]")
    let title = " RNAP Binding Sites"
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
        console.log(datasets);
        return (
            <div>
                <Cover>
                    <Typography variant='h1' >{title}</Typography>
                </Cover>
                <br />
                <Table datasets={datasets} />
            </div>
        )
    }
}

function Table({ datasets }) {
    const table = useMemo(() => processData(datasets), [datasets])
    return <FilterTable columns={table.columns} data={table.data} />
}


function processData(datasets = []) {
    let table = {
        columns: [
            {
                label: "id",
            },
            {
                label: "Transcription Factor",
            },
            {
                label: "Dataset Title"
            },
            {
                label: "Strategy",
            },
            {
                label: "Genes",
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
            "id": <LinkDataset value={dataset._id} datasetId={dataset._id} />,
            "Transcription Factor": objects.join(", "),
            "Dataset Title": DataVerifier.isValidString(dataset?.sample.title) ? dataset?.sample.title : "",
            "Strategy": dataset?.sourceSerie.strategy,
            "Genes": genes.join(", "),
            "Publication Title": publicationsTitle.join(", "),
            "Publication Authors": [...publicationsAuthors].join(", "),
            "Growth Conditions": growthConditions.join("; ")
        })
    })
    return table
}

function LinkDataset({ datasetId }) {
    const navigate = useNavigate()
    //TFBINDING
    return <Button onClick={() => { navigate("./dataset/RNAP_BINDING_SITES/datasetId=" + datasetId) }} >{datasetId}</Button>
}
