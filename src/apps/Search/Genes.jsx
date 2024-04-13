import React, { useEffect, useReducer, useState } from 'react'
import { useSearchGene } from 'webServices/queries'
import {AccordionList} from "ui-components/Web/Acordion"
import { DataVerifier, markMatches } from 'ui-components/utils';

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


export default function Genes({ id = "genesResult", search = "", onCompleted = () => { } }) {
    const { genes, loading, error } = useSearchGene(search, onCompleted)
    if (genes) {
        let data = process(genes,search)
        console.log(data);
        return (
            <AccordionList data={data} />
        )
    }
    return "loading"
}
