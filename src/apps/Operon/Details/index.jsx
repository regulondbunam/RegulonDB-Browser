import React from 'react'
import { useGetOperonByID } from 'webServices/queries'
import { useGetIndexedReferences } from "ui-components/Web/Citations";


export default function Details({ id }) {
    const { operon, loading, error } = useGetOperonByID(id)
    const references = useGetIndexedReferences(operon?.allCitations)

    console.log(operon);
    return <div>{id}</div>
}