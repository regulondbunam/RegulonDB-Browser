import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Typography, Divider } from '@mui/material'
import { LocalStorage, DataVerifier } from 'ui-components/utils';
import { PATH_SEARCH } from '.';

export default function ResentSearch({setSearch=()=>{}}) {
    const resentSearches = LocalStorage.getRecentSearches()
    const handelOnSearch = (value) => {
        window.history.replaceState(null, null, "/" + PATH_SEARCH.path + "/" + value)
        setSearch(value)
      }
    return (
        <div style={{ marginLeft: "5%", marginRight: "5%" }} >
            <Typography variant='h2' >
                Resent Searches
            </Typography>
            <Divider sx={{ borderTop: "1px solid #d59f0f" }} />
            <div>
                {resentSearches ? (
                    <>
                    {DataVerifier.isValidArray(resentSearches) ? (
                <List
                    sx={{
                        p: 0,
                    }}
                >
                    {resentSearches.map((search,index) => {
                        return (
                            <ListItem key={"resent-search-"+index+"-"+search} disablePadding>
                                <ListItemButton
                                    sx={{ pt: 0, pb: 0 }}
                                    onClick={()=>handelOnSearch(search)}
                                >
                                    <ListItemText
                                        primary={<span dangerouslySetInnerHTML={{ __html: search }} />}
                                    />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            ) : (
                <Typography variant='relevant' >
                    No searches in your local history yet
                </Typography>
            )}
            </>
                ) : (
                    <Typography variant='relevant' >
                        No searches in your local history yet
                    </Typography>
                )}
            </div>
        </div>
    )
}
