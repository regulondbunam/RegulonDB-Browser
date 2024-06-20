import React from 'react'
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Author from './Author';
import Normalized from './Normalized';
import { useGetAuthorDataOfDataset, useGetNormalizedData } from '../../../../../regulondb-ws/queries';
import { Circular } from '../../../../../components/ui-components';


export default function DataFromDataset({ _id, datasetType }) {
    const [value, setValue] = React.useState('1');
    const { authorData, loading: authorDataLoading } = useGetAuthorDataOfDataset(_id)
    const { normalizedData, loading } = useGetNormalizedData(_id, datasetType)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <br />
            <div style={{ marginLeft: "11%" }}>
                <Typography variant="h2" sx={{ fontSize: "22px" }}>
                    Data
                </Typography>
            </div>
            {(loading|| authorDataLoading) ? (
                <div><Circular /></div>
            ) : (
                <Box sx={{ width: '100%' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', pl: "11%" }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                {normalizedData && (
                                    <Tab label="Normalized" value="1" />
                                )}
                                {authorData && (
                                    <Tab label="Author" value={normalizedData ? "2" : "1"} />
                                )}
                            </TabList>
                        </Box>
                        {normalizedData && (
                            <TabPanel sx={{ p: 0, pt: 2 }} value="1">
                                <Normalized datasetType={datasetType} datasetId={_id} normalizedData={normalizedData} />
                            </TabPanel>
                        )}

                        <TabPanel sx={{ p: 0, pt: 2 }} value={normalizedData ? "2" : "1"}>
                            {authorData && (<>
                                {authorData.map((data, index) => <Author {...data} key={"author_" + index} />)}
                            </>)}
                        </TabPanel>
                    </TabContext>
                </Box>
            )}

        </div>
    )
}
