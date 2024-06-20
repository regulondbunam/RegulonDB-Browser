import React from 'react'
import { Typography, CircularProgress as Circular } from "@mui/material";
import Box from '@mui/material/Box';
import Author from './Author';
import Normalized from './Normalized';
import { useGetAuthorDataOfDataset, useGetNormalizedData } from 'webServices/queries';
import Tabs from 'ui-components/Web/Tabs';

export default function DataFromDataset({ _id, datasetType }) {
    const { authorData, loading: authorDataLoading } = useGetAuthorDataOfDataset(_id)
    const { normalizedData, loading } = useGetNormalizedData(_id, datasetType)

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
                    <Tabs tabSelect={"1"} tabs={[
                        {
                            id: "1",
                            name: "Normalized",
                            component: <Normalized datasetType={datasetType} datasetId={_id} normalizedData={normalizedData} />
                        },
                        {
                            id: "2",
                            name: "Author",
                            component: <>
                            {authorData.map((data, index) => <Author {...data} key={"author_" + index} />)}
                        </>
                        }
                    ]} />
                </Box>
            )}
        </div>
    )
}

