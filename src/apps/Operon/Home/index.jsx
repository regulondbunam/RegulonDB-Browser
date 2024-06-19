import React, { useReducer } from 'react'
import SearchList from './SearchList'
import { useGetObjectList } from "webServices/queries"
import { Cover } from 'ui-components/Web/Cover'
import Typography from "@mui/material/Typography";
import { DataVerifier, markMatches } from 'ui-components/utils';
import OperonViews from './Operons';
import Divider from '@mui/material/Divider';
import style from "./style.module.css"
import { DISPATCH, VIEW_TYPE } from './static';
import { useNavigate } from 'react-router-dom';

async function process(data, search = "", nav = () => { }) {
  console.log(data);
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
  if (DataVerifier.isValidArray(data)) {
    data.forEach((operon) => {
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

const reducer = (state, action) => {
  switch (action.type) {
    case DISPATCH.SET_LOADING:
      const { loading } = action
      return { ...state, loading: loading }
    case DISPATCH.SET_GENE_LIST:
      const { geneList, geneTable } = action
      return { ...state, geneList: geneList, geneTable: geneTable, loading: false }
    case DISPATCH.SEARCH:
      const { search, resultsSearch } = action
      return { ...state, search: search, resultsSearch: resultsSearch, loading: false }
    case DISPATCH.CLEAN_SEARCH:
      return { ...state, search: "", resultsSearch: null }
    case DISPATCH.UPDATE_VIEW:
      return { ...state, viewType: action.viewType }
    default:
      return state;
  }
};


export default function Home({ query }) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    resultsSearch: null,
    geneList: [],
    geneTable: {},
    search: "",
    advanceSearch: {},
    viewType: VIEW_TYPE.TABLE
  })
  const nav = useNavigate()

  const { loading: objectListLoading, error } = useGetObjectList({
    datamartType: "operon",
    onCompleted: (data) => {
      process(data.getObjectList, state.search, nav).then((gene) => {
        dispatch({ type: DISPATCH.SET_GENE_LIST, geneList: gene.list, geneTable: gene.table })
      }).catch(() => {
        dispatch({ type: DISPATCH.SET_LOADING, loading: false })
      })
      dispatch({ type: DISPATCH.SET_LOADING, loading: true })
    }
  });

  const loading = objectListLoading || state.loading


  //console.log(state);
  return (
    <div>
      <Cover state={loading ? "loading" : "done"} message={error && "Error to load gene list"} >
        <Typography variant="h1" sx={{ ml: "10%" }} >Operon</Typography>
      </Cover>
      <div className={style.geneLayout} style={{ height: `${window.screen.height - 180}px` }} >
        <div className={style.geneFilters} >
          <SearchList state={state} dispatch={dispatch} />
        </div>
        <Divider orientation="vertical" flexItem />
        <div style={{ minWidth: "376px", width: "100%" }} >
          <OperonViews loading={loading} state={state} dispatch={dispatch} />
        </div>
      </div>

    </div>
  )
}
