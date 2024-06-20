import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DataVerifier, FilterTable } from '../../../../../../components/ui-components';
import ViewerIGV from './IGV';

export default function TFBS({ datasetId, normalizedData }) {
    const { peaks, tfbs } = normalizedData.TFBINDING
    const [tableView, setTableView] = useState(tfbs ? 0 : 1)

    const tfbsTable = useMemo(() => {
        if (tfbs) {
            return processTFBsTableFormat(tfbs)
        }
    }, [tfbs])

    const peaksTable = useMemo(() => {
        if (peaks) {
            return processPeaksTableFormat(peaks)
        }
    }, [peaks])

    const handleChange = (event) => {
        setTableView(event.target.value);
    };
    //console.log(peaks);
    return (
        <div>
            <div style={{ paddingLeft: "12%" }}>
                <InputLabel id="demo-select-small-label">Select Table</InputLabel>
                <Select
                    value={tableView}
                    variant="standard"
                    onChange={handleChange}
                >
                    {tfbs && (
                        <MenuItem value={0}>TFBS</MenuItem>
                    )}
                    {peaks && (
                        <MenuItem value={1}>PEAKS</MenuItem>
                    )}
                    {(peaks && tfbs) && (
                        <MenuItem value={2}>TFBS & PEAKS</MenuItem>
                    )}

                </Select>
            </div>
            {(tableView === 0) && (
                <FilterTable {...tfbsTable} tableName={'tfbs_table_dataset_' + datasetId} />
            )}
            {(tableView === 1) && (
                <FilterTable {...peaksTable} tableName={'peaks_table_dataset_' + datasetId} />
            )}
            {(tableView === 2) && (
                <>
                <FilterTable {...tfbsTable} tableName={'tfbs_table_dataset_' + datasetId} />
                <FilterTable {...peaksTable} tableName={'peaks_table_dataset_' + datasetId} />
                </>
            )}
            <div>
                <ViewerIGV id_dataset={datasetId} tfs={[]} datasetType={"TFBINDING"} />
            </div>
        </div>
    )
}

function processPeaksTableFormat(data = []) {
    let formatTable = {
        data: [],
        columns: [
            { label: "start" },
            { label: "end" },
            { label: "score" },
            { label: "Closest Genes" },
            { label: "name" }

        ]
    }
    data.forEach(row => {
        let genes = []
        let geneNames = []
        if (DataVerifier.isValidArray(row.closestGenes)) {
            row.closestGenes.forEach(gene => {
                genes.push({ _id: gene._id, name: gene.name })
                geneNames.push(gene.name)
            })
        }
        formatTable.data.push({
            start: row?.peakLeftPosition,
            end: row?.peakRightPosition,
            score: row?.score,
            "Closest Genes": <div value={geneNames.join("; ")} >
                {genes.map(gene => {
                    return <Link style={{ marginRight: "10px" }} key={"link_to_" + gene._id} to={"/gene/" + gene._id} ><span dangerouslySetInnerHTML={{ __html: gene.name }} /></Link>
                })}
            </div>,
            name: row?.name
        })
    })
    return formatTable
}

function processTFBsTableFormat(data = []) {
    let formatTable = {
        data: [],
        columns: [
            { label: "start" },
            { label: "end" },
            { label: "score" },
            { label: "strand" },
            { label: "sequence" },
            { label: "Closest Genes" }
        ]
    }
    data.forEach(row => {
        let genes = []
        let geneNames = []
        if (DataVerifier.isValidArray(row.closestGenes)) {
            row.closestGenes.forEach(gene => {
                genes.push({ _id: gene._id, name: gene.name })
                geneNames.push(gene.name)
            })

        }
        formatTable.data.push({
            start: row?.chrLeftPosition,
            end: row?.chrRightPosition,
            score: row?.score,
            strand: row?.strand,
            sequence: row?.sequence,
            "Closest Genes": <div value={geneNames.join("; ")} >
                {genes.map(gene => {
                    return <Link style={{ marginRight: "10px" }} key={"link_to_" + gene._id} to={"/gene/" + gene._id} ><span dangerouslySetInnerHTML={{ __html: gene.name }} /></Link>
                })}
            </div>,
        })
    })
    return formatTable
}
