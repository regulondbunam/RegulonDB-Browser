import React, { useEffect, useState } from 'react';
//import { Person } from "schema-dts";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";
//import {CITATIONS_FIELDS} from "../fragments/fragments"

//const RegulonGeneOntologyItem = ``


const query = gql`
{
    publication: __type(name: "DatasetPublication") {
      fields {
        name
        type {
          name
        }
      }
    }
    growthConditions: __type(name: "HTGrowthCondition") {
      fields {
        name
        type {
          name
        }
      }
    }
  }
    `

const GetFields = ({
  status = () => { },
  resoultsData = () => { },
}) => {
  const [_res, set_res] = useState(false);
  const { data, loading, error } = useQuery(query)
  useEffect(() => {
    if (loading) {
      status('loading')
    }
    if (data && !_res) {
      set_res(true)
      try {
        resoultsData(data)
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
      console.log(error)
    }

  }, [loading, error, status, data, _res, resoultsData]);
  if (error) { console.log(error) }
  return (<></>);
}

export default GetFields;