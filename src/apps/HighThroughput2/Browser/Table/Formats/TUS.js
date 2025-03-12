
import DataVerifier from "../utils"
import { useNavigate } from "react-router-dom"
import { Button, Typography } from "@mui/material"

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
        let growthConditions = [];
        if (Array.isArray(dataset.growthConditions)) {
            dataset.growthConditions.forEach(condition => {
                if (DataVerifier.isValidObject(condition)) {
                    let validValues = [];
                    Object.keys(condition).forEach(key => {
                        // Validate the value and exclude keys with "__" (e.g., __typename)
                        if (DataVerifier.isValidString(condition[key]) && !key.includes("__")) {
                            validValues.push(`${key}: ${condition[key]}`);
                        }
                    });
                    growthConditions.push(validValues);
                }
            });
        }
        table.data.push({
            "id": <LinkDataset value={dataset._id} datasetId={dataset._id} datasetType={datasetType} />,
            "Transcription Factor": <LinkDatasetFromName value={objects.join(", ")} datasetId={dataset._id} datasetType={datasetType} tfName={objects.join(", ")}/>,
            "Title": DataVerifier.isValidString(dataset?.sourceSerie?.title) ? dataset?.sourceSerie.title : "",
            "Strategy": DataVerifier.isValidString(dataset?.sourceSerie?.strategy) ? dataset?.sourceSerie.strategy : "",
            "Genes": genes.join(", "),
            "Publication Title": publicationsTitle.join(", "),
            "Publication Authors": [...publicationsAuthors].join(", "),
            "Growth Conditions": growthConditions.length > 0
            ? `${growthConditions.length} | ${growthConditions[0].join("; ")}`
            : undefined
        })
    })
    return table
}

function LinkDataset({ datasetId, datasetType }) {
    const navigate = useNavigate()
    //TFBINDING
    return <Button onClick={() => { navigate("./dataset/"+datasetType+"/datasetId=" + datasetId) }} >{datasetId}</Button>
}

function LinkDatasetFromName({ datasetId, datasetType, tfName }) {
    const navigate = useNavigate()
    //TFBINDING
    return (
        <Typography 
          onClick={() => { navigate("./dataset/"+datasetType+"/datasetId=" + datasetId) }} 
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