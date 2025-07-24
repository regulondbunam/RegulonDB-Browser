import React, { useReducer, useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LoadData from './LoadData'
import { Cover, DataVerifier } from '../../components/ui-components'
import reducer from './actions';
import { featureMapData } from './featureMapData';
import { featureMapsToTrackJson } from './Process';
import { ACTIONS, FORMATS } from './static'
import Draw from './Draw';
import {DialogLoading, DialogError} from "../../components/ui-components/Dialogs";
import DrawOptions from './DrawOptions'

export const FeatureMap_PATH = {
    path: "featureMaps",
    element: <FeatureMaps />,
}

function initFeatureMapData({ idSession }) {
    //load cache data
    return { ...featureMapData }
}

const toDrawResolverData = (format,raw,state)=>{
    return  new Promise((resolve, reject) => {
        switch (format) {
            case FORMATS.FEATURE_MAPS:
                resolve(featureMapsToTrackJson(raw,state.tracks,state))
                break;
            default:
                console.error("Unknown format file: ", format);
                reject("Unknown format file")
                break;
        }
    })
}

export default function FeatureMaps({ idSession = "" }) {
    const [state, dispatch] = useReducer(reducer, { idSession }, initFeatureMapData)
    const [tab, setTab] = React.useState('1');
    const [drawState, setDrawState] = useState()
    const [drawErrorDetails, setDrawErrorDetails] = useState("")

    const handleChange = (event, newValue) => {
        if (newValue !== '1') {
            if (!DataVerifier.isValidString(state.originData.raw)) {
                setDrawState("error")
                setDrawErrorDetails("Please provide data for drawing feature maps.")
                return
            }else{
                if(newValue === '3'){
                    handleToDraw()
                    return
                }
            }
        }
        setTab(newValue);
    };

    const handleToDraw = () => {
        if (DataVerifier.isValidString(state.originData.raw)) {
            setDrawState("loading");
            toDrawResolverData(state.originData.format,state.originData.raw,state)
            .then((data)=>{
                if (data){
                    setTimeout(()=>{
                        dispatch({type: ACTIONS.TO_DRAW,data: data})
                        setTab('3')
                        setDrawState("done");
                    },500)
                }
            }).catch((error)=>{
                setDrawState("error");
                console.error(error);
                setDrawErrorDetails("Format file error. Please check the format file and try again.")
            })
        }else{
            setDrawState("error")
            setDrawErrorDetails("No data has been provided for drawing feature maps.")
        }
    }

    const handleCloseError = ()=>{
        setDrawState(null)
        setDrawErrorDetails("")
    }

    console.log(state);

    return (
        <div>
            <Cover state={drawState ? drawState : "done"} >
                <h1>Feature Maps</h1>
            </Cover>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tab}  >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="step tabs">
                            <Tab label="1- Load Data" value="1" />
                            <Tab label="2- Configure Visualization" value="2" />
                            <Tab label="3- View" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel sx={{padding: "0 24px 12px 24px"}} value="1"><LoadData handleToDraw={handleToDraw} handleToConfVisual={""} state={state} dispatch={dispatch} /></TabPanel>
                    <TabPanel sx={{padding: "0 24px 12px 24px"}} value="2" ><DrawOptions handleToDraw={handleToDraw} state={state} dispatch={dispatch} /></TabPanel>
                    <TabPanel sx={{padding: 0}} value="3" ><Draw state={state} dispatch={dispatch} /></TabPanel>
                </TabContext>
            </Box>
            {drawState === "loading" && <DialogLoading title={"Drawing... please wait"} />}
            {drawState === "error" && <DialogError title={"Error to Draw"} message={drawErrorDetails} action={handleCloseError} />}
        </div>
    )
}
// form 