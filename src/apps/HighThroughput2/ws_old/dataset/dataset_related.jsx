import React, { useEffect } from 'react';
//import { Person } from "schema-dts";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";
//import {CITATIONS_FIELDS} from "../fragments/fragments"

//const RegulonGeneOntologyItem = ``


function query(ht_query) {
  try {
    return gql`
    {
      getDatasetsFromSearch(advancedSearch: "${ht_query}") {
        _id
        collectionData {
          source
          type
        }
          publications {
            pmid
            title
          }
          sample {
            title
          }
          
        }
      }
      `
  } catch (error) {
    console.log(error)
  }
  return gql`{
    getDatasetsFromSearch(advancedSearch: "a[]") {
      datasetID
    }
  }`

}

const GetRelatedDataset = ({
  ht_query = "",
  status = () => { },
  resoultsData = () => { },
}) => {
  const { data, loading, error } = useQuery(query(ht_query))
  useEffect(() => {
    if (loading) {
      status('loading')
    }
    if (data) {

      try {
        //console.log(data)
        resoultsData(clean(data?.getDatasetsFromSearch))
        status('done')
      } catch (error) {
        resoultsData(undefined)
        status('error')
        console.error(error)
      }
    }
    if (error) {
      resoultsData(undefined)
      status('error')
      console.error(error)
    }

  }, [loading, error, status, data, resoultsData, ht_query]);
  return (<></>);
}

function clean(arrayData) {
  arrayData.forEach((data, i) => {
    if (data?.sample?.title === '-') {
      arrayData[i].sample.title = undefined;
    }
  });
  return arrayData
}

export default GetRelatedDataset;