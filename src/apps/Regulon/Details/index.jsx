import React from 'react'
import Cover from './Cover'
import { useGetRegulonData } from 'webServices/queries'
import PageState from 'ui-components/Web/PageStates'

export default function Details({ regulonId }) {
    const { regulonData, error, loading } = useGetRegulonData(regulonId)
    if (loading) {
        return <PageState state='loading' title='loading data...' />
    }
    if (error) {
        return <PageState state='error' title='error on load data' />
    }
    if (regulonData) {
     console.log(regulonData);
    return (
        <div>
            <Cover regulator={regulonData.regulator} />
        </div>
    )   
    }
    return null
}
