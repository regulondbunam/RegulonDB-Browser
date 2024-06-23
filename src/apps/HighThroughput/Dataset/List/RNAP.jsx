import React, { useMemo } from 'react'
import { Cover } from 'ui-components/Web/Cover'
import FilterTable from 'ui-components/Web/FilterTable'
import { DataVerifier } from 'ui-components/utils'
import { Button, Typography, CircularProgress as Circular } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useGetDatasetByAdvancedSearch } from 'webServices/queries'




export default function RNAP({ experimentType, tfName, strategy, gene, gc }) {
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
        //console.log(datasets);
        return (
            <div>
                <Cover>
                    <Typography variant='h1' >{title}</Typography>
                </Cover>
                <br />
                <Table datasets={datasets} tf={tfName} strategy={strategy} gene={gene} gc={gc} />
            </div>
        )
    }
}

function Table({ datasets, tf, strategy, gene, gc  }) {
    const table = useMemo(() => processData(datasets,tf, strategy, gene, gc ), [datasets, tf, strategy, gene, gc ])
    return <FilterTable columns={table.columns} data={table.data} />
}


function processData(datasets = [], tf, strategy, gene, gc) {
    let table = {
        columns: [
            {
                label: "id",
            },
            {
                label: "Transcription Factor",
                setFilter: tf,
            },
            {
                label: "Dataset Title"
            },
            {
                label: "Strategy",
                setFilter: strategy,
            },
            {
                label: "Genes",
                setFilter: gene,
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
                setFilter: gc
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
