import React, { useEffect } from 'react';
//import { Person } from "schema-dts";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";
//import {CITATIONS_FIELDS} from "../fragments/fragments"

//const RegulonGeneOntologyItem = ``


function query(id_dataset) {
  return gql`
    {
      getAllPeaksOfDataset(datasetId: "${id_dataset}") {
        _id
        name
        chromosome
        peakLeftPosition
        peakRightPosition
        score
        siteIds
        datasetIds
        temporalId
        closestGenes {
          _id
          name
          distanceTo
        }
      }
    }
    `
}

const GetPeaks = ({
  id_dataset = "",
  status = () => { },
  resoultsData = () => { },
}) => {
  const { data, loading, error } = useQuery(query(id_dataset))
  useEffect(() => {
    if (loading) {
      status('loading')
    }
    if (data) {
      try {
        resoultsData(data?.getAllPeaksOfDataset)
        if (data.getAllPeaksOfDataset.length > 0) {
          status('done')
        } else {
          status('no_results')
        }
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

  }, [loading, error, status, data, resoultsData, id_dataset]);
  return (<></>);
}

export default GetPeaks;