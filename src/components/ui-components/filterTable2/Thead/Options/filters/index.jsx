import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { FILTER, getCellValue } from '../../../static';
import Autocomplete from '@mui/material/Autocomplete';
import DataVerifier from '../../../../utils';
import Box from '@mui/material/Box';
import { deleteTextFilter, setTextFilter } from './text';
import Button from '@mui/material/Button';


//import MenuItem from '@mui/material/MenuItem';
//import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
//import { FilterSharp } from '@mui/icons-material';

const filtersForm = {}
filtersForm[FILTER.TYPES.TEXT] = FormTextFilter

export default function Filters(props) {

    const Element = filtersForm[props.column.filterType]
    const [options, setOptions] = useState(null)

    const [filters, setFilters] = useState([...props.state.filters].filter(filter=>filter.columnLabel===props.column.label))
    

    useEffect(() => {
        if (options === null) {
            createListOptions(props.state, props.column).then((data) => {
                //console.log(data);
                setOptions(data)
            })
        }
        return()=>{
            setFilters([...props.state.filters].filter(filter=>filter.columnLabel===props.column.label))
        }
    }, [props, options])

    const handleNewFilter = () => {
        setFilters([...filters, {
            columnLabel: props.column.label,
            key: "textFilter_" + (filters.length + 1) + "_" + props.column.key,
            type: props.column.filterType,
            index: filters.length + 1,
            logicConnector: "OR",
            value: "",
            keyRowsDeleted: [],
        }])
    }

    //console.log(filters);
    return (
        <div>
            {DataVerifier.isValidArray(filters) ? (<>{
                filters.map((filter) => {
                    if (filter.type === FILTER.TYPES.ONLY_CONTENT) {
                        return null
                    }
                    const Form = filtersForm[filter.type]
                    return Form({ key: filter.key, ...props, filter: filter, options: options })
                })
            }
                <Button onClick={handleNewFilter} size='small' sx={{ width: "80px" }} >+ Filter</Button>
            </>) : (<>
                {Element({ ...props, filterIndex: 0, options: options })}
            </>)}


        </div>
    )
}

function FormTextFilter(props) {
    const { state, column, dispatch, index, filter, filterIndex, handleClose, options } = props
    const filterKey = "textFilter_" + filterIndex + "_" + column.key
    //const [logicConnector, setLogicConnector] = useState(filter?.logicConnector ? filter?.logicConnector : FILTER.LOGIC_CONNECTOR.OR)
    //const logicConnector = filter?.logicConnector ? filter?.logicConnector : FILTER.LOGIC_CONNECTOR.OR
    if (options !== null) {
        if (options.length < 1) {
            return <div>This column has no values </div>
        }
    }

    const handleFilterText = (event, newValue) => {
        let filterValue = newValue ? newValue : event.target.value
        let logicConnector = document.getElementById('logicConnector_' + filterKey)

        if (logicConnector) {
            logicConnector = logicConnector.innerText
        } else {
            logicConnector = "OR"
        }

        if (DataVerifier.isValidString(filterValue)) {
            setTextFilter(filterValue, column.label, state, dispatch, logicConnector)
        }else{
            deleteTextFilter(filter.key,state,dispatch)
        }
        handleClose()
    }
    

    const handleDeleteFilter = () => {
        deleteTextFilter(filter.key,state,dispatch)
        handleClose()
    }
    //
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: "255px 40px" }} >
            {/*(filterIndex > 0) ? (
                <Select
                defaultValue={"OR"}
                    size='small'
                    id={'logicConnector_'+filterKey}
                >
                    {Object.keys(FILTER.LOGIC_CONNECTOR).map(filterType => (
                        <MenuItem value={FILTER.LOGIC_CONNECTOR[filterType]}>
                            {FILTER.LOGIC_CONNECTOR[filterType]}
                        </MenuItem>
                    ))}
                </Select>
            ) : (<div style={{backgroundColor: "#f5f4f4", margin: "1px", borderRadius: "5px"}} />)*/}
            <Autocomplete
                value={filter?.value ? filter.value : ""}
                onChange={handleFilterText}
                options={options === null ? [] : options}
                sx={{ width: 250, ml: 1 }}
                loading={options === null}
                renderInput={(params) => <TextField {...params} size='small' id="input-column-filter" label="Filter" />}
            />
            {/*
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }} >
                <Button onClick={handleDeleteFilter} variant="outlined" size='small' sx={{ minWidth: 0 }}>delete filter</Button>
                <Button onClick={handleSetFilter} color='secondary' variant="contained" size='small' sx={{ minWidth: 0 }}>set filter</Button>
            </div>*/
            }
            <Button size='small' sx={{ minWidth: 0 }} onClick={handleDeleteFilter}><DeleteIcon /></Button>

        </Box>
    )
}

async function createListOptions(state, column) {
    const data = new Set();
    Object.keys(state.data).forEach((key, index) => {
        const row = state.data[key]
        const value = getCellValue(row, column.label)
        if (DataVerifier.isValidValue(value)) {
            data.add(value + "")
        }
    })
    return [...data]
}