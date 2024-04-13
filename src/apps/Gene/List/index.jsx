import React, { useState } from 'react'
import SearchList from './SearchList'
import { useGetObjectList } from "webServices/queries"
import { Cover } from 'ui-components/Web/Cover'
import Typography from "@mui/material/Typography";
import { DataVerifier, markMatches } from 'ui-components/utils';
import {AccordionList} from 'ui-components/Web/Accordion';
import style from "./style.module.css"

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
        secondary: synonyms+" "+products,
        score: score
      })
    });
  }
  results.sort((a, b) => b.score - a.score);
  return results
}



export default function List() {
  const { objectsList, loading, error } = useGetObjectList({
    datamartType: "gene",
  });
  const [search, setSearch] = useState("")
  console.log(objectsList);
  let data = []
  if (objectsList && !loading && !error) {
    data = process(objectsList,search)
  }
  return (
    <div>
      <Cover state={loading ? "loading" : "done"} message={error && "Error to load gene list"} >
        <Typography variant="h1" sx={{ ml: "10%" }} >{"Genes"}</Typography>
      </Cover>
      <div className={style.geneLayout}>
        <div className={style.geneFilters} style={{minWidth: "420px"}} >
        <SearchList />
      </div>
      <div style={{minWidth: "376px", width: "100%"}} >
        <AccordionList data={data} title={"Genes List ("+data.length+")"} defaultExpanded={true} />
      </div>
      </div>
      
    </div>
  )
}
