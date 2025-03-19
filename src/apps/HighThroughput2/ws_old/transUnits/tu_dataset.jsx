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
        getAllTransUnitsOfDataset(datasetId: "${id_dataset}") {
          _id
          chromosome
          leftEndPosition
          rightEndPosition
          name
          strand
          length
          termType
          genes {
            _id
            name
            bnumber
          }
          phantom
          pseudo
          datasetIds
          temporalId
        }
      }
    `
}

const GetTUs = ({
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
        if (!data.getAllTransUnitsOfDataset.length) {
          status('no_results')
        } else {
          status('done')
        }
        resoultsData(data?.getAllTransUnitsOfDataset)

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

export default GetTUs;