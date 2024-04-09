import React, { useEffect, useReducer, useState } from 'react'
import { useSearchGene } from 'webServices/queries'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Typography, Divider, Button, ButtonGroup } from '@mui/material'
import Accordion from 'ui-components/Web/Acordion'
import { DataVerifier } from 'ui-components/utils';

function markMatches(text = "", search = "") {
    const words = search.split(" ")
    let markedText = text
    let score = 0
    if (DataVerifier.isValidArray(words) && DataVerifier.isValidString(text)) {
        words.forEach((word) => {
            let matches = text.matchAll(word)
            score += [...matches].length
            markedText = markedText.replaceAll(word, "<b>" + word + "</b>")
        })
    }
    return { markedText, score }
}

function process(data, search = "") {
    let results = []
    if (DataVerifier.isValidArray(data)) {
        data.forEach((gene) => {
            let products = ""
            let score = 0
            if (DataVerifier.isValidArray(gene.products)) {
                products = gene.products.map(product => { return product.name }).join(', ')
                let matchesProducts = markMatches(products, search)
                products = matchesProducts.markedText
                score += matchesProducts.score
            }
            let geneName = gene.gene.name;
            let matcheName = markMatches(geneName, search)
            geneName = matcheName.markedText
            score += matcheName.score
            results.push({
                _id: gene._id,
                data: gene,
                type: "gene",
                primary: geneName,
                secondary: products,
                score: score
            })
        });
    }
    results.sort((a, b) => b.score - a.score);
    return results
}


export default function Genes({ id = "genesResult", search = "", onComplete = () => { } }) {
    const [page, setPage] = useState(1)
    const LIMIT = 5
    const { genes, fetching, error } = useSearchGene(search,onComplete)


    let nResults = 0
    let results = []
    if (genes && !fetching) {
        nResults = genes?.length ? genes.length : 0
        results = process(genes, search)
    }
    const handelFirstPage = () => {
        setPage(1)
    }
    const handelPrevPage = () => {
        if (page > 1) {
            setPage(p => p - 1)
        }
    }
    const handelNextPage = () => {
        if (nResults / LIMIT > page) {
            setPage(p => p + 1)
        }
    }
    const handelLastPage = () => {
        setPage(Math.ceil(nResults / LIMIT))
    }
    //console.log(genes, fetching);
    return (
        <Accordion title={<Typography variant='relevant' >{"Genes (" + nResults + ")"}</Typography>}
            actions={
                <>
                    <Typography variant='irrelevant' > {`${LIMIT} results shown out of ${nResults}`} </Typography>
                    <ButtonGroup variant="contained" color='secondary' size='small' aria-label="Basic button group">
                        <Button onClick={handelFirstPage} disabled={page === 1} >{"<<"}</Button>
                        <Button onClick={handelPrevPage} disabled={page <= 1} >{"<"}</Button>
                        <Typography> {".  " + page + "  ."} </Typography>
                        <Button onClick={handelNextPage} disabled={nResults / LIMIT < page} >{">"}</Button>
                        <Button onClick={handelLastPage} disabled={page === Math.ceil(nResults / LIMIT)} >{">>"}</Button>
                    </ButtonGroup>
                </>
            }
        >
            {DataVerifier.isValidArray(results) && (
                <List
                    sx={{
                        p: 0,
                    }}
                >
                    {results.slice((LIMIT * (page - 1)), (LIMIT * page)).map((result) => {
                        return (
                            <ListItem key={result._id} disablePadding>
                                <ListItemButton
                                    sx={{ pt: 0, pb: 0 }}
                                >
                                    <ListItemText
                                        primary={<span dangerouslySetInnerHTML={{ __html: result.primary }} />}
                                        secondary={<span dangerouslySetInnerHTML={{ __html: result.secondary }} />}
                                    />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
        </Accordion>
    )
}
