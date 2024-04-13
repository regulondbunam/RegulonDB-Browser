import React, { useEffect, useReducer, useState } from 'react'
import { useSearchGene } from 'webServices/queries'
import { AccordionList } from "ui-components/Web/Accordion"
import { DataVerifier, markMatches } from 'ui-components/utils';
import Skeleton from '@mui/material/Skeleton';


function process(data, search = "") {
    let results = []
    if (DataVerifier.isValidArray(data)) {
        data.forEach((gene) => {
            let products = ""
            let score = 0
            if (DataVerifier.isValidArray(gene.products)) {
                products = gene.products.map(product => { return product.name }).join(', ')
                let matchesProducts = markMatches(products, search)
                products = "Products: "+matchesProducts.markedText
                score += matchesProducts.score
            }
            let synonyms = ""
            if (DataVerifier.isValidArray(gene.gene.synonyms)) {
                synonyms += "Synonyms: " + gene.gene.synonyms.join(", ")
                let matchesSynonyms = markMatches(synonyms, search)
                synonyms = matchesSynonyms.markedText
                score += matchesSynonyms.score
            }
            let geneName = gene.gene.name;
            let matchName = markMatches(geneName, search)
            geneName = matchName.markedText
            score += matchName.score
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


export default function Genes({ id = "genesResult", search = "", onCompleted = () => { } }) {
    const { genes, loading, error } = useSearchGene(search, onCompleted)
    if (loading) {
        return <Skeleton variant="rectangular" height={40} />
    }
    if (genes) {
        let data = process(genes, search)
        return (
            <AccordionList data={data} title={"Genes (" + data.length + ")"} />
        )
    }
    return "loading"
}
