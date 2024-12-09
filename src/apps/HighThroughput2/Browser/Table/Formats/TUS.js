
import DataVerifier from "../utils"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"

export default function formatTUS(datasets = [],datasetType) {
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