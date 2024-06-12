import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import React, { useEffect } from 'react'

const QUERY_getGeneById = gql`
query getGeneById($search:String!, $limit:Int=10){
    getGenesBy(search:$search, limit:$limit){
      data{
        gene{
          _id
          name
        }
        regulation{
          operon{
            _id
            name
          }
          regulators{
            _id
            name
          }
        }
        products{
          _id
          name
          geneOntologyTerms{
            cellularComponent{
              _id
              name
            }
            biologicalProcess{
              _id
              name
            }
            molecularFunction{
              _id
              name
            }
          }
        }
      }
    }
  }
`

export function GetGeneInfo({ getGeneResults = () => { }, idsGenes, limit=10, setState }) {

  const { loading, error, data } = useQuery(QUERY_getGeneById, { variables: { "search": idsGenes, "limit":limit } });

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
      getGeneResults(data)
    }
  })

  if (error) {
    console.error("error al consultar la lista de genes: " + error)
  }

  return (<></>)

}