import React, { useEffect, useState } from 'react'
import Typography from "@mui/material/Typography";
import { useLazySearchRegulon } from "webServices/queries"
import { DISPATCH } from '../static';
import { InputSearch } from './InputSearch';
import { DataVerifier, markMatches } from 'ui-components/utils';
import { Button, Tooltip, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useNavigate } from 'react-router-dom';
//import MenuIcon from '@mui/icons-material/Menu';



async function process(data, search = "", nav = () => {}) {
  let list = [];
  let table = {
    columns: [
      { key:"name", label: "Name", width: 600 },
      { key:"genes", label: "Genes" },
      { key:"operons", label: "Operons" },
      { key:"tf", label: "Transcription Factor" },
      { key:"tu", label: "Transcription Units" },
      { key:"ri", label: "Regulatory Interaction" },
      { key:"bs", label: "Binding Sites" },
    ],
    data: [],
  };
  if (DataVerifier.isValidArray(data)) {
    data.forEach((regulon) => {
      const id = regulon._id;
      const name = `${regulon.regulator.name} ${DataVerifier.isValidString(regulon.regulator.abbreviatedName) ? "("+regulon.regulator.abbreviatedName+")": ""}`
      let genes = 0
      if (DataVerifier.isValidObjectWithProperty(regulon.summary,"genes")) {
        genes = DataVerifier.isValidNumber(regulon.summary.genes?.total) ? regulon.summary.genes?.total : 0
      }
      let operons = 0
      if (DataVerifier.isValidObjectWithProperty(regulon.summary,"operons")) {
        operons = DataVerifier.isValidNumber(regulon.summary.operons?.total) ? regulon.summary.operons?.total : 0
      }
      let tf = 0
      if (DataVerifier.isValidObjectWithProperty(regulon.summary,"transcriptionFactors")) {
        tf = DataVerifier.isValidNumber(regulon.summary.transcriptionFactors?.total) ? regulon.summary.transcriptionFactors?.total : 0
      }
      let tu = 0
      if (DataVerifier.isValidObjectWithProperty(regulon.summary,"transcriptionUnits")) {
        tu = DataVerifier.isValidNumber(regulon.summary.transcriptionUnits?.total) ? regulon.summary.transcriptionUnits?.total : 0
      }
      let ri = 0
      if (DataVerifier.isValidObjectWithProperty(regulon.summary,"regulatoryInteractions")) {
        ri = DataVerifier.isValidNumber(regulon.summary.regulatoryInteractions?.total) ? regulon.summary.regulatoryInteractions?.total : 0
      }
      let bs = 0
      if (DataVerifier.isValidObjectWithProperty(regulon.summary,"bindingSites")) {
        bs = DataVerifier.isValidNumber(regulon.summary.bindingSites?.total) ? regulon.summary.bindingSites?.total : 0
      }
      table.data.push({
        id: id,
        name: (
          <p
            value={name}
            dangerouslySetInnerHTML={{ __html: name }}
          />
        ),
        genes: genes,
        operons: operons,
        tf:tf,
        tu:tu,
        ri:ri,
        bs:bs,
        _properties: {
          onClick: () => {
            nav("/regulon/" + id);
          },
        },
      });
      list.push({
        _id: id,
        data: regulon,
        type: "operon",
        primary: name,
        secondary: ``,
        _properties: {
          onClick: () => {
            nav("/regulon/" + id);
          },
        },
      });
    });
  }
  //list.sort((a, b) => b.score - a.score);
  //delay for state in program is very important
  await setTimeout(() => {}, 100);
  return { list, table };
}

export default function SearchList({ data, dispatch, state }) {
  const [getOperons, { loading, error }] = useLazySearchRegulon()
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
