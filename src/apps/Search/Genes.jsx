import React from 'react'
import { useSearchGene } from 'webServices/queries'


export default function Genes({ search }) {
    const { genes, fetching, error } = useSearchGene(search)
    console.log(genes, fetching);
    return (
        <div>Genes</div>
    )
}
