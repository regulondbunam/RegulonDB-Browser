import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";

const query = gql`query GetDatasetsFromSearch($advancedSearch: String) {
  getDatasetsFromSearch(advancedSearch: $advancedSearch) {
    _id
    assemblyGenomeId
    collectionData {
      source
      type
    }
    cutOff
    experimentCondition
    externalReferences {
      description
      name
      note
      url
    }
    fivePrimeEnrichment
    geneExpressionFiltered
    growthConditions {
      aeration
      agitationSpeed
      geneticBackground
      growthPhase
      growthRate
      medium
      mediumSupplements
      opticalDensity
      organism
      otherTerms
      ph
      pressure
      temperature
      vesselType
      experimentId
      experimentTitle
    }
    linkedDataset {
      controlId
      datasetType
      experimentId
    }
    nlpGrowthConditionsId
    notes
    objectsTested {
      _id
      abbreviatedName
      activeConformations
      externalCrossReferences {
        url
        externalCrossReferenceId
        externalCrossReferenceName
        objectId
      }
      genes {
        _id
        name
      }
      name
      note
      synonyms
    }
    publications {
      abstract
      authors
      date
      doi
      pmcid
      pmid
      title
    }
    referenceGenome
    releaseDataControl {
      date
      version
    }
    sample {
      controlId
      experimentId
      srrId
      title
    }
    sourceReferenceGenome
    sourceSerie {
      method
      platform {
        title
        _id
      }
      readType
      series {
        sourceId
        sourceName
      }
      sourceDB
      strategy
      title
    }
    summary {
      totalOfGenes {
        inDataset
        inRDBClassic
        notInDataset
        notInRDB
        sharedItems
      }
      totalOfPeaks {
        notInDataset
        inDataset
        inRDBClassic
        notInRDB
        sharedItems
      }
      totalOfTFBS {
        inDataset
        inRDBClassic
        notInDataset
        notInRDB
        sharedItems
      }
    }
    temporalId
  }
}`



const GetInfoDataset = ({
  datasetId = "",
  status = () => { },
  resoultsData = () => { },
}) => {
  const { data, loading, error } = useQuery(query,{
    variables: {
      advancedSearch: `${datasetId}[_id]`
    }
  })
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