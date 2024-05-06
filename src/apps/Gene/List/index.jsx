import React, { useReducer } from 'react'
import SearchList from './SearchList'
import { useGetObjectList } from "webServices/queries"
import { Cover } from 'ui-components/Web/Cover'
import Typography from "@mui/material/Typography";
import { DataVerifier, markMatches } from 'ui-components/utils';
import GeneList from './Genes';
import Divider from '@mui/material/Divider';
import style from "./style.module.css"
import { DISPATCH, VIEW_TYPE } from './static';

async function process(data, search = "") {
  let results = []
  if (DataVerifier.isValidArray(data)) {
    data.forEach((gene) => {
      let score = 0
      let products = ""
      if (DataVerifier.isValidArray(gene.productsName)) {
        products += "Products: " + gene.productsName.join(", ")
      }
      let geneName = gene.name;
      let matchName = markMatches(geneName, search)
      geneName = matchName.markedText
      score += matchName.score
      let synonyms = ""
      if (DataVerifier.isValidArray(gene.synonyms)) {
        synonyms += "Synonyms: " + gene.synonyms.join(", ")
        let matchesSynonyms = markMatches(synonyms, search)
        synonyms = matchesSynonyms.markedText
        score += matchesSynonyms.score
      }
      results.push({
        _id: gene._id,
        data: gene,
        type: "gene",
        primary: geneName,
        secondary: synonyms + " " + products,
        score: score
      })
    });
  }
  results.sort((a, b) => b.score - a.score);
  //delay for state in program is very important
  await setTimeout(() => { }, 100);
  return results
}

const reducer = (state, action) => {
  switch (action.type) {
    case DISPATCH.SET_LOADING:
      const { loading } = action
      return { ...state, loading: loading }
    case DISPATCH.SET_GENE_LIST:
      const { geneList } = action
      return { ...state, geneList: geneList, loading: false }
    case DISPATCH.SEARCH:
      const { search, resultsSearch } = action
      return { ...state, search: search, resultsSearch: resultsSearch, loading: false }
    case DISPATCH.CLEAN_SEARCH:
      return { ...state, search: "", resultsSearch: null }
    default:
      return state;
  }
};


export default function List({ query }) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    resultsSearch: null,
    geneList: [],
    search: "",
    advanceSearch: {},
    viewType: VIEW_TYPE.LIST
  })

  const { loading: objectListLoading, error } = useGetObjectList({
    datamartType: "gene",
    onCompleted: (data) => {
      process(data.getObjectList, state.search).then((geneList) => {
        dispatch({ type: DISPATCH.SET_GENE_LIST, geneList: geneList })
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
        <Typography variant="h1" sx={{ ml: "10%" }} >{"Genes"}</Typography>
      </Cover>
      <div className={style.geneLayout}>
        <div className={style.geneFilters} >
          <SearchList state={state} dispatch={dispatch} />
        </div>
        <Divider orientation="vertical" flexItem />
        <div style={{ minWidth: "376px", width: "100%" }} >
          <GeneList loading={loading} data={state.resultsSearch === null ? state.geneList : state.resultsSearch} />
        </div>
      </div>

    </div>
  )
}
