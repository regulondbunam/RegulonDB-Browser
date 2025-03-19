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
        const table = formatDatasetFilterTable(datasets, datasetType, experimentType, source)
        return <FilterTable columns={table.columns} data={table.data} tableName={dir} />
    }

    return <>...</>
}
