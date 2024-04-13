import React, {useState} from 'react'
import { DataVerifier } from 'ui-components/utils'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Typography, Button, ButtonGroup } from '@mui/material'
import Accordion from 'ui-components/Web/Accordion'

/**data poperties
 * {
    _id: id item,
    data: object item,
    type: item type,
    primary: string label promary,
    secondary: string label secondary,
    score: score
    }
 */

export default function AccordionList({
    title = "List",
    data = [],
    pagination = true,
    limit: _limit = 5,
    defaultExpanded
}) {
    const [page, setPage] = useState(1)
    // eslint-disable-next-line no-unused-vars
    const [limit, setlimit] = useState(_limit)
    let nResults = 0
    if (DataVerifier.isValidArray(data)) {
        nResults = data?.length ? data.length : 0
    }else{
        return <></>
    }
    const handelFirstPage = () => {
        setPage(1)
    }
    const handelPrevPage = () => {
        if (page > 1) {
            setPage(p => p - 1)
        }
    }
    const handelNextPage = () => {
        if (nResults / limit > page) {
            setPage(p => p + 1)
        }
    }
    const handelLastPage = () => {
        setPage(Math.ceil(nResults / limit))
    }
    return (
        <Accordion defaultExpanded={defaultExpanded} title={<Typography variant='relevant' >{title}</Typography>}
            actions={
                pagination && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{marginRight: "10px"}} >
                        <Typography variant='irrelevant' > {`${limit} results shown out of ${nResults}`} </Typography>
                    </div>
                    <ButtonGroup variant="contained" color='secondary' size='small' aria-label="Basic button group">
                        <Button onClick={handelFirstPage} disabled={page === 1} >{"<<"}</Button>
                        <Button onClick={handelPrevPage} disabled={page <= 1} >{"<"}</Button>
                    </ButtonGroup>
                    <div style={{margin: " 0 10px 0 10px"}} >
                        <Typography variant='normal' >  {page}  </Typography>
                    </div>
                    <ButtonGroup variant="contained" color='secondary' size='small' aria-label="Basic button group">
                        <Button onClick={handelNextPage} disabled={nResults / limit < page} >{">"}</Button>
                        <Button onClick={handelLastPage} disabled={page === Math.ceil(nResults / limit)} >{">>"}</Button>
                    </ButtonGroup>
                </div>
                )
            }
        >
           <List
                    sx={{
                        p: 0,
                    }}
                >
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
                </List>
        </Accordion>
    )
}
