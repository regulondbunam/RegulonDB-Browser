import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import React, { useEffect } from 'react'

const QUERY_GetGeneList = gql`
query GetGeneList{
    getObjectList(datamartType: "gene"){
      _id
      name
      synonyms
      productsName
    }
  }
`

export function GetGeneList({ getGeneList = () => { }, setState }) {

    const { loading, error, data } = useQuery(QUERY_GetGeneList);

    useEffect(() => {
        if (loading) {
            setState('loading')
        } else {
            setState('done')
        }
        if (error) {
            setState('error')
        }
        if (!error && data) {
            getGeneList(data)
        }
    })

    if (error) {
        console.error("error al consultar la lista de genes: " + error)
    }

    return (<></>)

}