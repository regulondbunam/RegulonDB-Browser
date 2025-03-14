import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";

function query(datasetId) {
  return gql`
        {
            getDatasetsFromSearch(advancedSearch: "${datasetId}[_id]") {
              _id
                publications {
                  pmid
                  doi
                  authors
                  title
                  date
                  pmcid
                }
                fivePrimeEnrichment
                objectsTested {
                  _id
                  name
                  synonyms
                  genes {
                    _id
                    name
                  }
                  note
                  activeConformations
                  externalCrossReferences {
                    externalCrossReferenceId
                    externalCrossReferenceName
                    objectId
                    url
                  }
                }
                sourceSerie {
                  series{
                    sourceId
                    sourceName
                  }
                  platform{
                    _id
                    title
                  }
                  title
                  strategy
                  method
                }
                sample {
                  experimentId
                  controlId
                  title
                }
                linkedDataset {
                  controlId
                  experimentId
                  datasetType
                }
                referenceGenome
                datasetType
                temporalId
                growthConditions {
                  organism
                  geneticBackground
                  medium
                  mediumSupplements
                  aeration
                  temperature
                  ph
                  pressure
                  opticalDensity
                  growthPhase
                  growthRate
                  vesselType
                  agitationSpeed
                  experimentId
                  experimentTitle
                }
                releaseDataControl {
                  date
                  version
                }
                nlpGrowthConditionsId
                experimentCondition
              }
        }
    `
}



const GetInfoDataset = ({
  datasetId = "",
  status = () => { },
  resoultsData = () => { },
}) => {
  const { data, loading, error } = useQuery(query(datasetId))
  useEffect(() => {
    if (loading) {
      status('loading')
    }
    if (data) {
      try {
        resoultsData(clean(data?.getDatasetsFromSearch[0]))
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

  }, [loading, error, status, data, resoultsData, datasetId]);
  return (<></>);
}

function clean(data = {}) {
  if (data?.sample?.title === '-') {
    data.sample.title = undefined;
  }
  return data
}

export default GetInfoDataset;