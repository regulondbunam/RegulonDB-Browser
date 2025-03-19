import DataVerifier from "../utils"
import { useNavigate } from "react-router-dom"
import { Button, Typography } from "@mui/material"

export default function formatGE(datasets = [], nlgc){
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
                objects.push(obj.abbreviatedName || obj.name)
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
            "Transcription Factor": <LinkDatasetFromName value={objects.join(", ")} datasetId={dataset._id} tfName={objects.join(", ")}/>,
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

function LinkDatasetFromName({ datasetId, tfName }) {
    const navigate = useNavigate()
    //TFBINDING
    return (
        <Typography 
          onClick={() => { navigate("./dataset/GENE_EXPRESSION/datasetId=" + datasetId) }} 
          sx={{ 
            fontWeight: "bold", 
            fontFamily: "Arial, sans-serif", 
            cursor: "pointer",
            fontSize: "14px",
            color: "#1F3D4F"
          }}
        >
          {tfName}
        </Typography>
      );
}