import React, {useReducer, useState} from 'react'
import { Cover, DataVerifier } from '../../../components/ui-components'
import TreeView from './Tree'
import Table from './Table'
import { DISPATCH_TYPE } from './static';
import {Grid, IconButton, Tooltip} from "@mui/material/";
import {ExpandMore, ExpandLess} from "@mui/icons-material"
import './HTBrowserStyles.css'
import {Typography} from "@mui/material";


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
        console.log("AQUI?",newDatasetType, newSource, newExperimentType);
        dispatch({
            type: DISPATCH_TYPE.UPDATE_TREE,
            datasetType: newDatasetType,
            source: newSource,
            experimentType: newExperimentType
        })
    }

    const [tooltipMessage, setTooltipMessage] = useState("Read more");
    const [expanded, setExpanded] = useState(false);

    const toggleDescription = () => {
        setExpanded(!expanded);
        setTooltipMessage(prevMessage => prevMessage === "Read more" ? "Read less" : "Read more");
    };
    return (
        <div>
            <Cover>
                <h1>{`High Throughput Collection ${state.dir}`}</h1>
            </Cover>
            <Grid container spacing={2} >
                <Grid item className='' xs={2}>
                    <TreeView updateDataset={handleUpdateDatasets} datasetType={datasetType} sources={source} />
                </Grid>
                <Grid item className='' xs={10}>
                    <Grid container spacing={1} direction={"column"}>
                        <Grid item xs={1}>
                            <Typography className={`description ${expanded ? "expanded" : ""}`}>
                                {state.datasetType} {state.source} {state.experimentType}
                            </Typography>
                            <Tooltip title={tooltipMessage} enterDelay={500} followCursor={true}>
                                <IconButton onClick={toggleDescription} className="toggle-button">
                                    {expanded ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={11}>
                            <Table
                                dir={state.dir}
                                datasetType={state.datasetType}
                                source={state.source}
                                experimentType={state.experimentType}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}