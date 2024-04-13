import React, { useReducer, useState } from 'react'
import SearchList from './SearchList'
import { useGetObjectList } from "webServices/queries"
import { Cover } from 'ui-components/Web/Cover'
import Typography from "@mui/material/Typography";
import { DataVerifier, markMatches } from 'ui-components/utils';
import GeneList from './Genes';
import Divider from '@mui/material/Divider';
import style from "./style.module.css"
import { DISPATCH, VIEW_TYPE } from './static';

function process(data, search = "") {
  let results = []
  if (DataVerifier.isValidArray(data)) {
    data.forEach((gene) => {
      let score = 0
      let products = ""
      if (DataVerifier.isValidArray(gene.productsName)) {
        products += "Products: " + gene.productsName.join(", ")
        let matchesProducts = markMatches(products, search)
        products = matchesProducts.markedText
        score += matchesProducts.score
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
  return results
}

const reducer = (state, action) => {
  switch (action.type) {
    case DISPATCH.SEARCH:
      const { search, data } = action
      return { ...state, search: search, resultsSearch: data }
    case DISPATCH.CLEAN_SEARCH:
      return { ...state, search: "", resultsSearch: null }
    default:
      return state;
  }
};


export default function List({ query }) {
  const { objectsList, loading, error } = useGetObjectList({
    datamartType: "gene",
  });

  const [state, dispatch] = useReducer(reducer, {
    resultsSearch: null,
    search: "",
    advanceSearch: {},
    viewType: VIEW_TYPE.LIST
  })

  let data = []
  if (state.resultsSearch !== null) {
    data = process(state.resultsSearch, state.search)
  } else {
    if (objectsList && !loading && !error) {
      data = process(objectsList, state.search)
    }

  }

  console.log(data);
  return (
    <div>
      <Cover state={loading ? "loading" : "done"} message={error && "Error to load gene list"} >
        <Typography variant="h1" sx={{ ml: "10%" }} >{"Genes"}</Typography>
      </Cover>
      <div className={style.geneLayout}>
        <div className={style.geneFilters} style={{ minWidth: "420px" }} >
          <SearchList state={state} dispatch={dispatch} />
        </div>
        <Divider orientation="vertical" flexItem />
        <div style={{ minWidth: "376px", width: "100%" }} >
          <GeneList data={data} />
        </div>
      </div>

    </div>
  )
}
