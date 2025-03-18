import React, {useReducer, useState } from 'react'
import { Cover, DataVerifier } from '../../../components/ui-components'
import TreeView from './Tree'
import Table from './Table'
import { DISPATCH_TYPE } from './static';
import {Grid, IconButton, Tooltip, Dialog, DialogContent, DialogActions, Button, DialogTitle} from "@mui/material/";
import {ExpandMore, ExpandLess} from "@mui/icons-material"
import './HTBrowserStyles.css'
import {Typography} from "@mui/material";
import {DATASET_TYPE_NAME} from "../static";
import { useLocation } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from 'react-markdown';

const GET_DATASETS_WITH_METADATA  = gql`
    query GetDatasetsWithMetadata($datasetType: String!, $source: String!) {
        getDatasetsWithMetadata(datasetType: $datasetType, source: $source) {
            metadata {
                metadataContent
            }
        }
    }
`;

function setDir(
    datasetType,
    source,
    experimentType
) {
    let dir = ""
    if (DataVerifier.isValidString(datasetType)) {
        dir += ` / ${datasetType}`
    }
    if (DataVerifier.isValidString(source)) {
        dir += ` / ${source}`
    }
    if (DataVerifier.isValidString(experimentType)) {
        dir += ` / ${experimentType}`
    }
    return dir
}

function initState({
    datasetType,
    source,
    experimentType
}) {
    //set dir
    const dir = setDir(datasetType, source, experimentType)
    //set tree id
    let treeId = ""
    if (DataVerifier.isValidString(datasetType)) {
        treeId += `datasetType:${datasetType}`
    }
    if (DataVerifier.isValidString(source)) {
        treeId += `&source:${source}`
    }
    if (DataVerifier.isValidString(experimentType)) {
        treeId += `&experimentType:${experimentType}`
    }
    return {
        datasetType: datasetType,
        source: source,
        experimentType: experimentType,
        dir: dir,
        treeId: treeId
    }
}

function reducer(state, action) {
    switch (action.type) {
        case DISPATCH_TYPE.UPDATE_TREE:
            const dir = setDir(action.datasetType, action.source, action.experimentType)
            console.log(state)
            return {
                ...state,
                dir: dir,
                datasetType: action.datasetType,
                source: action.source,
                experimentType: action.experimentType
            }
        default:
            break;
    }
    return state
}


export default function Browser({
    datasetType,
    source,
    experimentType
}) {
    const [state, dispatch] = useReducer(reducer, { datasetType, source, experimentType }, initState)

    const handleUpdateDatasets = (newDatasetType, newSource, newExperimentType) => {

        dispatch({
            type: DISPATCH_TYPE.UPDATE_TREE,
            datasetType: newDatasetType,
            source: newSource,
            experimentType: newExperimentType
        })
    }

    const { data, error } = useQuery(GET_DATASETS_WITH_METADATA, {
        variables: {datasetType: datasetType, source: source}
    });

    const [tooltipMessage, setTooltipMessage] = useState("Read more");
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    let note = ""

    const toggleDescription = () => {
        setExpanded(!expanded);
        setTooltipMessage(prevMessage => prevMessage === "Read more" ? "Read less" : "Read more");
    };
    const location = useLocation();
    const isTargetPath = location.pathname === "/ht/dataset/TFBINDING/source=GALAGAN";

    if(data){
        note = data["getDatasetsWithMetadata"]["metadata"]["metadataContent"]
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (error) {
        return <>error...</>
    }
    return (
        <div>
            <Cover>
                <h1>{`High Throughput Collection / ${DATASET_TYPE_NAME(state.datasetType)}`}</h1>
            </Cover>
            <Grid container spacing={2} >
                <Grid item className='' xs={2}>
                    <TreeView updateDataset={handleUpdateDatasets} datasetType={datasetType} sources={source} />
                </Grid>
                <Grid item className='' xs={10}>
                    <Grid container spacing={0} direction={"column"}>
                    <Grid item xs={1}>
                        <Typography className="description" style={{ marginBottom: isTargetPath ? "8px" : "0px" }}>
                            <strong>{state.datasetType} {state.source} {state.experimentType}</strong>
                        </Typography>
                        {/*TODO: Set on a dictionary*/}
                        {isTargetPath && (
                            <Typography className={`description ${expanded ? "expanded" : ""}`} sx={{ mt: 1 }} fontSize={"medium"}>
                                Access to the whole <strong>Galagan collection</strong> of union peaks for each TF and their corresponding individual experiments.{" "}
                                For details of the whole collection click{" "}
                                <span role='button' tabIndex="0" onClick={handleClickOpen} style={{ fontSize: "inherit", textDecoration: "underline", color: "#0C6A87", cursor: "pointer" }}>
                                    here
                                </span>.{" "}
                                To download the whole union peaks click <a href="http://regulondbdata.ccg.unam.mx/ht/galagan/tf_binding/tf_binding_peaks_galagan.zip" target="_blank" rel="noopener noreferrer" style={{ fontSize: "inherit", textDecoration: "underline" }}>here</a>.{" "}
                                When using this information please cite:{" "}
                                <a href="https://pubmed.ncbi.nlm.nih.gov/38826350/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "inherit", textDecoration: "underline" }}>
                                    Lally P. et al (PMID:38826350)
                                </a>.
                                This information corresponds to <strong>RegulonDB version 13.6</strong>.
                            </Typography>
                        )}

                        <Tooltip title={tooltipMessage} enterDelay={500} followCursor>
                            <IconButton onClick={toggleDescription} className="toggle-button">
                                {expanded ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        </Tooltip>
                    </Grid>
                        <Grid item xs={11}>
                            <Table
                                // dir={state.dir}
                                datasetType={state.datasetType}
                                source={state.source}
                                experimentType={state.experimentType}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    <div>
                        <h1>{source} {datasetType}</h1>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <ReactMarkdown>{note}</ReactMarkdown>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}