import React, {useReducer, useState } from 'react'
import { Cover, DataVerifier } from '../../../components/ui-components'
import TreeView from './Tree'
import Table from './Table'
import { DISPATCH_TYPE } from './static';
import {Grid, IconButton, Tooltip, Dialog, DialogContent, DialogActions, Button, DialogTitle} from "@mui/material";
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
    experimentType,
    tfName,
    experimentTitle
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
        variables: {datasetType: datasetType, source: source},
        skip: !source,
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
                            <strong>
                                {
                                    state.source === "GALAGAN"
                                        ? "Galagan Collection of Transcription Factor Binding Sites (ChIP-seq)"
                                        : `${state.datasetType || ''} ${state.source || ''} ${state.experimentType || ''}`
                                }
                            </strong>
                        </Typography>
                        {/*TODO: Set on a dictionary*/}
                        {state.source === "GALAGAN" && (
                            <Typography className={`description ${"expanded"}`} sx={{ mt: 1 }} fontSize={"medium"}>
                            {/*<Typography className={`description ${expanded ? "expanded" : ""}`} sx={{ mt: 1 }} fontSize={"medium"}>*/}
                                <strong>Access the complete Galagan collection of ChIP-seq binding sites</strong>, which includes union peaks for each transcription factor (<strong>TF</strong>) and their corresponding individual experiments.{" "}
                                <strong>For details on the full collection</strong>{" "}
                                <span role='button' tabIndex="0" onClick={handleClickOpen} style={{ fontSize: "inherit", textDecoration: "underline", color: "#0C6A87", cursor: "pointer" }}>
                                    click here
                                </span>.{" "}
                                <strong>To download the complete set of union peaks</strong> <a href="http://regulondbdata.ccg.unam.mx/ht/galagan/tf_binding/tf_binding_peaks_galagan.zip" target="_blank" rel="noopener noreferrer" style={{ fontSize: "inherit", textDecoration: "underline" }}>click here</a>.{" "}
                                If you use this information, <strong>please cite</strong>:{" "}
                                <a href="https://pubmed.ncbi.nlm.nih.gov/40335485/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "inherit", textDecoration: "underline" }}>
                                    Lally P. et al. Predictive biophysical neural network modeling of a compendium of in vivo transcription factor DNA binding profiles for Escherichia coli. (PMID:40335485)
                                </a>{" "}
                                and <strong>specify the RegulonDB version used in your work</strong>. You can find details about the latest release of <strong>RegulonDB</strong> <a href="https://regulondb.ccg.unam.mx/releasesNote" style={{ fontSize: "inherit", textDecoration: "underline" }}>here</a>.

                                <div style={{ marginTop: '16px' }}>
                                    For models, code, and more information please visit{" "}
                                    <a href="http://boltznet.bu.edu" target="_blank" rel="noopener noreferrer" style={{ fontSize: "inherit", textDecoration: "underline" }}>
                                    http://boltznet.bu.edu
                                    </a>
                                </div>
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
                                tfName={tfName}
                                datasetType={state.datasetType}
                                source={state.source}
                                experimentType={state.experimentType}
                                experimentTitle={experimentTitle}
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