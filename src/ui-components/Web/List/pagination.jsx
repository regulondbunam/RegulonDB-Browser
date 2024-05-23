import React, { useState } from 'react'
import { DataVerifier } from 'ui-components/utils'
import MUIList from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Typography, Button, ButtonGroup, Divider, Box } from '@mui/material'
import Tooltip from "@mui/material/Tooltip"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { List as VirtualizedList } from 'react-virtualized';

export function List(props) {
    const {
        title = "",
        data = [],
        pagination = false,
        limit: _limit = 5,
    } = props
    console.log(data);
    const [page, setPage] = useState(1)
    // eslint-disable-next-line no-unused-vars
    const [limit, setLimit] = useState(_limit)
    let nResults = 0
    if (DataVerifier.isValidArray(data)) {
        nResults = data?.length ? data.length : 0
    }
    const handleFirstPage = () => {
        setPage(1)
    }
    const handlePrevPage = () => {
        if (page > 1) {
            setPage(p => p - 1)
        }
    }
    const handleNextPage = () => {
        if (nResults / limit > page) {
            setPage(p => p + 1)
        }
    }
    const handleLastPage = () => {
        setPage(Math.ceil(nResults / limit))
    }
    return (
        <div>
            <div>
                {title}
                <Divider />
                <Box
                    sx={{
                        p: 0,
                    }}
                >
                    {pagination ? (
                        <>
                            {data.slice((limit * (page - 1)), (limit * page)).map((item) => {
                                return (
                                    <ListItem key={item._id} disablePadding>
                                        <ListItemButton
                                            sx={{ pt: 0, pb: 0 }}
                                        >
                                            <ListItemText
                                                primary={<span dangerouslySetInnerHTML={{ __html: item.primary }} />}
                                                secondary={<span dangerouslySetInnerHTML={{ __html: item.secondary }} />}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </>
                    ) : (
                        <VirtualizedList
                            width={300}
                            height={300}
                            rowCount={data.length}
                            rowHeight={20}
                            rowRenderer={(props) => rowRender({ ...props, data })}
                        />
                    )}

                </Box>
                <Divider />
            </div>
            {(pagination && DataVerifier.isValidArray(data)) && (
                <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "flex-end" }}>
                    <FormControl variant="standard" >
                        <Select
                            value={limit}
                            onChange={(e) => { setLimit(e.target.value) }}
                            label="Items"
                        >
                            <MenuItem value={5}>5</MenuItem>
                            {nResults > 10 && (
                                <MenuItem value={10}>10</MenuItem>
                            )}
                            {nResults > 30 && (
                                <MenuItem value={20}>30</MenuItem>
                            )}
                            {nResults > 50 && (
                                <MenuItem value={50}>50</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <Typography sx={{ ml: 1, mr: 1 }} >{` rows of ${nResults}`}</Typography>
                    <ButtonGroup size='small' color="secondary" variant="contained" aria-label="Basic button group">
                        <Tooltip title="First page">
                            <Button onClick={handleFirstPage} >{"<<"}</Button>
                        </Tooltip>
                        <Tooltip title="Prev page">
                            <Button onClick={handlePrevPage} >{"<"}</Button>
                        </Tooltip>
                    </ButtonGroup>
                    <Typography sx={{ ml: 1, mr: 1 }} >{page}</Typography>
                    <ButtonGroup size='small' color="secondary" variant="contained" aria-label="Basic button group">
                        <Tooltip title="Next page">
                            <Button onClick={handleNextPage} >{">"}</Button>
                        </Tooltip>
                        <Tooltip title="Last page">
                            <Button onClick={handleLastPage} >{">>"}</Button>
                        </Tooltip>
                    </ButtonGroup>
                </div>
            )}
        </div>
    )
}

function rowRender({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
    data = []
}) {
    const item = data[index]
    if (!item) {
        return null
    }
    return (
        <ListItem key={item._id} disablePadding>
            <ListItemButton
                sx={{ pt: 0, pb: 0 }}
            >
                <ListItemText
                    primary={<span dangerouslySetInnerHTML={{ __html: item.primary }} />}
                    secondary={<span dangerouslySetInnerHTML={{ __html: item.secondary }} />}
                />
            </ListItemButton>
        </ListItem>
    );
}