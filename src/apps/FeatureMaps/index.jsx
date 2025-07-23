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

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleToDraw = () => {
        if (DataVerifier.isValidString(state.originData.raw)) {
            setDrawState("loading");
            toDrawResolverData(state.originData.format,state.originData.raw,state)
            .then((data)=>{
                dispatch({type: ACTIONS.TO_DRAW,data: data})
                setTab('2')
                setDrawState("done");
            }).catch((error)=>{
                setDrawState("error");
                console.error(error);
                alert("Error Format")
            })
        }
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
                    <TabPanel sx={{padding: "0 24px 12px 24px"}} value="1"><LoadData handleNext={""} state={state} dispatch={dispatch} /></TabPanel>
                    <TabPanel sx={{padding: 0}} value="2" ><Draw state={state} dispatch={dispatch} /></TabPanel>
                </TabContext>
            </Box>

        </div>
    )
}
// form 