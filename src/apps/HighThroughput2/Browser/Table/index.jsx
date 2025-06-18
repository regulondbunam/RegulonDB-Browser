import React from 'react'
import FilterTable from './filterTable'
import formatDatasetFilterTable from "./Formats"
import { useInitDatasetsByDatasetType } from '../../WebServices'
import { CircularProgress } from '@mui/material'

export default function Table({
    datasetType,
    dir = "",
    source,
    experimentType,
    tfName,
    experimentTitle
}) {

    const { datasets, loading, error } = useInitDatasetsByDatasetType(datasetType, source);

    if (loading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                Loading...
                <CircularProgress />
            </div>
        )

    }

    if (error) {
        return <>error...</>
    }

    if (datasets) {
        console.log("EXP_TITLE: ",experimentTitle);
        const table = formatDatasetFilterTable(datasets, datasetType, experimentType, source, tfName, experimentTitle)
        return <FilterTable columns={table.columns} data={table.data} tableName={dir} />
    }

    return <>...</>
}
