import { gql } from "@apollo/client";

export const query_GETALLNPC = gql`query GetNLPGrowthConditionBySearch($advancedSearch: String) {
  getNLPGrowthConditionBySearch(advancedSearch: $advancedSearch) {
    _id
    datasetIds
    temporalId
    additionalProperties {
      name
      value {
        associatedPhrase
        nameField
        score
        value
      }
    }
    aeration {
      associatedPhrase
      nameField
      score
      value
    }
    aerationSpeed {
      associatedPhrase
      nameField
      score
      value
    }
    geneticBackground {
      associatedPhrase
      nameField
      score
      value
    }
    growthPhase {
      associatedPhrase
      nameField
      score
      value
    }
    growthRate {
      associatedPhrase
      nameField
      score
      value
    }
    medium {
      associatedPhrase
      nameField
      score
      value
    }
    mediumSupplements {
      associatedPhrase
      nameField
      score
      value
    }
    opticalDensity {
      associatedPhrase
      nameField
      score
      value
    }
    organism {
      associatedPhrase
      nameField
      score
      value
    }
    ph {
      associatedPhrase
      nameField
      score
      value
    }
    pressure {
      associatedPhrase
      nameField
      score
      value
    }
    temperature {
      associatedPhrase
      nameField
      score
      value
    }
    vesselType {
      associatedPhrase
      nameField
      score
      value
    }
  }
}`

export const query_GET_DATASET_BY_ADVANCE_SEARCH = gql`query GetDatasetsFromSearch($advancedSearch: String) {
  getDatasetsFromSearch(advancedSearch: $advancedSearch) {
    _id
    assemblyGenomeId
    experimentCondition
    fivePrimeEnrichment
    geneExpressionFiltered
    growthConditions {
      aeration
      aerationSpeed
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
    }
    objectsTested {
      name
      _id
      genes {
        _id
        name
      }
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
    sample {
      controlId
      experimentId
      srrId
      title
    }
    cutOff
    datasetType
    externalReferences {
      description
      name
      note
      url
    }
    linkedDataset {
      controlId
      datasetType
      experimentId
    }
    nlpGrowthConditionsId
    notes
    releaseDataControl {
      date
      version
    }
    sourceReferenceGenome
    sourceSerie {
      method
      platform {
        _id
        title
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
        inDataset
        inRDBClassic
        notInDataset
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

export const query_GET_DATASET_BY_ID = gql`query GetDatasetByID($datasetId: String) {
    getDatasetByID(datasetID: $datasetId) {
      _id
      assemblyGenomeId
      cutOff
      datasetType
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
        aerationSpeed
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
          externalCrossReferenceId
          externalCrossReferenceName
          objectId
          url
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
          _id
          title
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
          inDataset
          inRDBClassic
          notInDataset
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