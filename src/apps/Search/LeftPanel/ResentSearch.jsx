import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Typography, Divider } from '@mui/material'
import { LocalStorage, DataVerifier } from 'ui-components/utils';
import { PATH_SEARCH } from '../index';

export default function ResentSearch({setSearch=()=>{}}) {
    const resentSearches = LocalStorage.getRecentSearches()
    const handelOnSearch = (value) => {
        window.history.replaceState(null, null, "/" + PATH_SEARCH.path + "/" + value)
        setSearch(value)
      }

      return(
          <div>
              <List>
                  <ListItem disablePadding>
                      <ListItemText primary={<Typography variant='irrelevantB' sx={{m: 1}}>RESENT SEARCHES</Typography>}/>
                  </ListItem>
                  {DataVerifier.isValidArray(resentSearches)?(
                      <>
                          {resentSearches.map((search,index) => {
                              return (
                                  <ListItem key={"resent-search-"+index+"-"+search} disablePadding>
                                      <ListItemButton
                                          dense
                                          onClick={()=>handelOnSearch(search)}
                                      >
                                          <Typography variant='irrelevant' >
                                              <span dangerouslySetInnerHTML={{__html: search}}/>
                                          </Typography>

                                      </ListItemButton>
                                  </ListItem>
                              )
                          })}
                      </>
                  ):(
                      <Typography variant='relevant' >
                          No searches in your local history yet
                      </Typography>
                  )}
              </List>
          </div>
      )

}
