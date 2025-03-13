import React, {useState} from 'react'
import SourceSerie from './SourceSerie'
import Publications from './Publications'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import TranscriptionFactor from "../transcriptionFactor/TranscriptionFactor";


export default function Maininfo({ _id, sample, fivePrimeEnrichment, datasetType, sourceSerie, publications, objectTested}) {
    let datasetTitle = ""
    //Condicion para filtrar comentarios de Victor (curador) saludos n.n
    if (sample?.title) {
        if (sample?.title === "obtener de GEO") {
            datasetTitle = ""
        } else {
            datasetTitle = sample?.title
        }
        //console.log(_data)
    }
    //console.log(sourceSerie);

    const [expanded, setExpanded] = useState(false);

    const handleAccordionChange = () => {
        setExpanded(!expanded);
    };

    return (
        <div style={{ marginLeft: "5%" }} id={`dataset_${_id}_main_info`} >
            <p style={{ fontSize: "22px" }} className="p_accent">{datasetTitle}</p>

            <p style={{ fontSize: "14px", float:'left', marginRight:'10px' }} >
                Dataset ID: {_id} | Dataset Type: {datasetType}
            </p>
            { sourceSerie?.strategy &&
                <p style={{ fontSize: "14px" }} >
                    |  Strategy: {sourceSerie.strategy}
                </p>
            }
            <hr />
            {datasetType === "TFBINDING" && (
                <Accordion
                    expanded={expanded}
                    onChange={handleAccordionChange}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <h4>Transcription Factor Details</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TranscriptionFactor objectsTested={objectTested} />
                    </AccordionDetails>
                </Accordion>
            )}
            {
                fivePrimeEnrichment && <p style={{ fontSize: "14px", marginTop:'15px' }} >5' Enrichment: {fivePrimeEnrichment}</p>
            }
            {
                sample?.controlId.length > 0 && (
                    <p style={{ fontSize: "14px" , marginTop:'15px' }}>
                    Control ID:{" "}
                    <span style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                        {sample?.controlId.map((id) => (
                        <a
                            key={id}
                            href={`https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "underline"}}
                        >
                            {id}
                        </a>
                        ))}
                    </span>
                    </p>
                )
            }
            {
                sample?.experimentId.length > 0 && (
                    <p style={{ fontSize: "14px" }}>
                        Experiment ID:{" "}
                        <span style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                        {sample?.experimentId.map((id) => (
                        <a
                            key={id}
                            href={`https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "underline"}}
                        >
                            {id}
                        </a>
                        ))}
                    </span>
                    </p>
                )
            }
            <SourceSerie sourceSerie={sourceSerie} />
            {
                publications.length > 0 && <div>
                    <p style={{ fontSize: "12px" }} className="p_accent" >Publications:</p>
                    <Publications publications={publications} />
                </div>
            }

        </div>
    )
}
