import React, { useState } from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Divider, Box } from '@mui/material'
import { List as VirtualizedList } from 'react-virtualized';
import { DataVerifier } from 'ui-components/utils';

export function List({
    title = "",
    data = [],
    pagination = false,
    limit: _limit = 5,
    idContainer,
    setWidth,
    setHeight,
}) {
    let width = Number.isInteger(setWidth) ? setWidth : 500
    let height = Number.isInteger(setHeight) ? setHeight : 500
    if (DataVerifier.isValidString(idContainer)) {
        const container = document.getElementById(idContainer)
        if (container) {
            width = Number.isInteger(setWidth) ? setWidth : container.clientWidth
            height = Number.isInteger(setHeight) ? setHeight : container.clientHeight - 50
        }
    }

    const getRowHeight = ({index}) => {
        const item = data[index]
        let rowHeight = 10
        if (DataVerifier.isValidString(item?.primary)) {
            const n = item.primary.length
            if ((n * 15) > width) {
                rowHeight += (28 * ((n * 15) / width))
            } else {
                rowHeight += 27
            }
        }
        if (DataVerifier.isValidString(item?.secondary)) {
            const n = item.secondary.length
            if ((n * 12) > width) {
                rowHeight += (25 * ((n * 12) / width))
            } else {
                rowHeight += 24
            }
        }
        return rowHeight
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
                    <VirtualizedList
                        width={width}
                        height={height}
                        rowCount={data.length}
                        rowHeight={getRowHeight}
                        rowRenderer={(props) => rowRender({ ...props, data })}
                    />
                </Box>
                <Divider />
            </div>
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
        <ListItem key={key} style={{ ...style }} component="div" disablePadding>
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