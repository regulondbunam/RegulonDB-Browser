import React, { useEffect } from 'react'
import Typography from "@mui/material/Typography";
import { useLazySearchGene } from "webServices/queries"
import { DISPATCH } from '../static';
import { InputSearch } from './InputSearch';
import { DataVerifier, markMatches } from 'ui-components/utils';


async function process(genes,search) {
  let resultsSearch = []
  if (DataVerifier.isValidArray(genes)) {
    genes.forEach(gene=>{
      let score = 0
      let products = ""
      if (DataVerifier.isValidArray(gene.products)) {
        products += "Products: " + gene.products.map(product=>product.name).join(", ")
        let matchesProducts = markMatches(products, search)
        products = matchesProducts.markedText
        score += matchesProducts.score
      }
      let geneName = gene.gene.name;
      let matchName = markMatches(geneName, search)
      geneName = matchName.markedText
      score += matchName.score
      let synonyms = ""
      if (DataVerifier.isValidArray(gene.gene.synonyms)) {
        synonyms += "Synonyms: " + gene.gene.synonyms.join(", ")
        let matchesSynonyms = markMatches(synonyms, search)
        synonyms = matchesSynonyms.markedText
        score += matchesSynonyms.score
      }
      resultsSearch.push({
        _id: gene._id,
        data: gene,
        type: "gene",
        primary: geneName,
        secondary: synonyms + " " + products,
        score: score
      })
    })
  }
  //delay for state in program is very important
  await setTimeout(()=>{},100);
  return resultsSearch
}

export default function SearchList({data,dispatch,state}) {
  const [getGenes, {loading, error}] = useLazySearchGene()

  useEffect(() => {
    if (loading) {
      dispatch({type: DISPATCH.SET_LOADING, loading: true})
    }
    if (error) {
      dispatch({type: DISPATCH.SET_LOADING, loading: false})
    }
  }, [loading,error,dispatch])
  

  const handleSelectView = (viewType)=>{
    dispatch({type:DISPATCH.UPDATE_VIEW,viewType})
  }

  const handleSearch = (search)=>{
    if (DataVerifier.isValidString(search)) {
      getGenes(search,
      (genes)=>{
        process(genes,search).then((resultsSearch)=>{
          dispatch({type: DISPATCH.SEARCH, search: search, resultsSearch: resultsSearch})
        })
      }
      )
    }
    
  }
  return (
    <div style={{ padding: "16px" }}>
      <Typography gutterBottom variant="relevant" component="div">
        Options
      </Typography>
      <InputSearch handleSearch={handleSearch} />
    </div>
  )
}
