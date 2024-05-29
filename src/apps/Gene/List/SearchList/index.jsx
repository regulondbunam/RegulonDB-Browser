import React, { useEffect, useState } from 'react'
import Typography from "@mui/material/Typography";
import { useLazySearchGene } from "webServices/queries"
import { DISPATCH } from '../static';
import { InputSearch } from './InputSearch';
import { DataVerifier, markMatches } from 'ui-components/utils';
import { Button, Tooltip, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Link } from 'react-router-dom';
//import MenuIcon from '@mui/icons-material/Menu';



async function process(genes, search) {
  let list = []
  let table = {
    columns: [
      {label: "ID"},
      {label: "name"},
      {label: "synonyms"},
      {label: "products"}
    ],
    data: []
  }
  if (DataVerifier.isValidArray(genes)) {
    genes.forEach(gene => {
      let score = 0
      let products = ""
      if (DataVerifier.isValidArray(gene.products)) {
        products += "Products: " + gene.products.map(product => product.name).join(", ")
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
      table.data.push({
        ID: <Link value={gene._id} to={"/gene/"+gene._id} >{gene._id}</Link>,
        name: geneName,
        synonyms: synonyms,
        products: products,
      })
      list.push({
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
  await setTimeout(() => { }, 100);
  return {list, table}
}

export default function SearchList({ data, dispatch, state }) {
  const [getGenes, { loading, error }] = useLazySearchGene()
  const [hide, setHide] = useState(true)

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
      getGenes(search,
        (genes) => {
          process(genes, search).then((resultsSearch) => {
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
