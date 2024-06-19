import React, { useEffect, useState } from 'react'
import Typography from "@mui/material/Typography";
import { useLazySearchOperon } from "webServices/queries"
import { DISPATCH } from '../static';
import { InputSearch } from './InputSearch';
import { DataVerifier, markMatches } from 'ui-components/utils';
import { Button, Tooltip, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useNavigate } from 'react-router-dom';
//import MenuIcon from '@mui/icons-material/Menu';



async function process(operons, search = "", nav = () => { }) {
  let list = []
  let table = {
    columns: [
      { label: "name", },
      { label: "genes", },
      { label: "promoters" },
      { label: "TUs" },
    ],
    data: []
  }
  if (DataVerifier.isValidArray(operons)) {
    operons.forEach((data) => {
      const operon = data.operon
      const id = operon._id
      const operonName = operon.name
      const genes = DataVerifier.isValidNumber(operon.statistics?.genes) ? operon.statistics?.genes : 0
      const promoters = DataVerifier.isValidNumber(operon.statistics?.promoters) ? operon.statistics?.promoters : 0
      const transcriptionFactors = DataVerifier.isValidNumber(operon.statistics?.transcriptionFactors) ? operon.statistics?.transcriptionFactors : 0
      table.data.push({
        id: id,
        name: <p value={operonName} dangerouslySetInnerHTML={{ __html: operonName }} />,
        genes: <p value={genes} dangerouslySetInnerHTML={{ __html: genes }} />,
        promoters: <p value={promoters} dangerouslySetInnerHTML={{ __html: promoters }} />,
        TUs: <p value={transcriptionFactors} dangerouslySetInnerHTML={{ __html: transcriptionFactors }} />,
        _properties: {
          onClick: () => {
            nav("/operon/" + id)
          }
        }
      })
      list.push({
        _id: id,
        data: operon,
        type: "operon",
        primary: operonName,
        secondary: `Genes: ${genes}, Promoters: ${promoters}, Transcription Factors: ${transcriptionFactors}`,
        _properties: {
          onClick: () => {
            nav("/operon/" + id)
          }
        },
      })
    });
  }
  list.sort((a, b) => b.score - a.score);
  //delay for state in program is very important
  await setTimeout(() => { }, 100);
  return { list, table }
}

export default function SearchList({ data, dispatch, state }) {
  const [getOperons, { loading, error }] = useLazySearchOperon()
  const [hide, setHide] = useState(true)
  const nav = useNavigate()

  useEffect(() => {
    if (loading) {
      dispatch({ type: DISPATCH.SET_LOADING, loading: true })
    }
    if (error) {
      dispatch({ type: DISPATCH.SET_LOADING, loading: false })
    }
  }, [loading, error, dispatch])


  const handleClean = ()=>{
    dispatch({ type: DISPATCH.SEARCH, search: "", resultsSearch: null })
  }

  const handleSearch = (search) => {
    if (DataVerifier.isValidString(search)) {
      getOperons(search,
        (operons) => {
          process(operons, search, nav).then((resultsSearch) => {
            dispatch({ type: DISPATCH.SEARCH, search: search, resultsSearch: resultsSearch })
          })
        }
      )
    }

  }
  return (
    <div style={!hide ? { padding: "16px",  minWidth: "420px" } : {paddingTop: "16px"}}>
      <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }} >
        {!hide && (
          <Typography variant="relevant" component="div">
            Search
          </Typography>
        )}

        <Tooltip title={!hide ? "hide options" : "show search options"}>
          <Button size='small' sx={{minWidth: 35}} variant={hide ? "contained" : "outlined"} onClick={() => { setHide(!hide) }} >
            {!hide ? (
              <MenuOpenIcon />
            ):(
              <SearchIcon/>
            )}
            
          </Button>
        </Tooltip>
      </div>
      {!hide && (
        <div>
          <Divider />
          <InputSearch handleSearch={handleSearch} handleClean={handleClean} />
        </div>
      )}
    </div>
  )
}
