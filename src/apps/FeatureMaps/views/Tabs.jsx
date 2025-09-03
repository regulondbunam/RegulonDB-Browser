import {Cover} from "../../../components/ui-components";
import React from "react";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from "@mui/material/Tab";
import useTabsVM from "../viewModel/useTabsVM";
import LoadData from "./LoadData";
import OptionsDraw from "./OptionsDraw";
import DrawFeatureMap from "../DrawFeatureMap";
import {useStore} from "../store";

export default function Tabs() {
    const {tab, handleChangeTab} = useTabsVM();
    const featureMapData = useStore()
    return (
        <div>
            <Cover >
                <h1>Feature Maps</h1>
            </Cover>
            <TabContext value={tab}>
                <TabList onChange={handleChangeTab} >
                    <Tab label="1- Load Data" value={1} />
                    <Tab label="2- Configure Visualization" value={2} />
                    <Tab label="3- View" value={3} />
                </TabList>
                <TabPanel sx={{padding: "0 24px 12px 24px"}} value={1}><LoadData /></TabPanel>
                <TabPanel sx={{padding: "0 24px 12px 24px"}} value={2}><OptionsDraw/></TabPanel>
                <TabPanel sx={{padding: 0}} value={3}><DrawFeatureMap featureMapData={featureMapData} /></TabPanel>
            </TabContext>
        </div>
    )
}