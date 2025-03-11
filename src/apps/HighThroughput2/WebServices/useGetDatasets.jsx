import { useLazyQuery, useQuery, gql } from "@apollo/client";
import { DataVerifier } from "../../../components/ui-components";


export function useInitDatasetsByDatasetType(datasetType, source,setDatasets=()=>{}) {
  const { data, loading, error } = useQuery(query,{
    variables:{
      advancedSearch: source === null
      ? `${datasetType}[collectionData.type]`
      : `${datasetType}[collectionData.type] AND ${source}[collectionData.source]`
    },
    onCompleted: (data) => {
      if (DataVerifier.isValidArray(data?.getDatasetsFromSearch)) {
        setDatasets(data?.getDatasetsFromSearch);
      }
    },
  });
  let datasets
  if(error){
    console.error("Error in useGetDatasetsByDatasetType",error);
    
  }
  if(data){
    if (DataVerifier.isValidArray(data?.getDatasetsFromSearch)) {
      datasets = data?.getDatasetsFromSearch
    }
  }

  return{ data, datasets, loading, error };
}

export default function useGetDatasets() {
  const [getDatasets, { loading, error }] = useLazyQuery(query);

  const getDatasetsByDatasetType = (datasetType, setDatasets = () => {}) => {
    getDatasets({
      variables: {
        advancedSearch: `${datasetType}[collectionData.type]`,
      },
      onCompleted: (data) => {
        if (DataVerifier.isValidArray(data?.getDatasetsFromSearch)) {
          setDatasets(data?.getDatasetsFromSearch);
        }else{
          setDatasets([])
        }
      },
    });
  };
  return [getDatasetsByDatasetType, { loading, error }];
}

const query = gql`
  query GetDatasetsFromSearch($advancedSearch: String) {
    getDatasetsFromSearch(advancedSearch: $advancedSearch) {
      _id
      assemblyGenomeId
      collectionData {
        source
        type
      }
      cutOff
      experimentCondition
      growthConditions {
        organism
        geneticBackground
        medium
        aeration
        temperature
        ph
        pressure
        opticalDensity
        growthPhase
        growthRate
        vesselType
        agitationSpeed
        mediumSupplements
        otherTerms
      }
      nlpGrowthConditionsId
      objectsTested {
        _id
        name
        abbreviatedName
        genes {
          _id
          name
        }
      }
      publications {
        authors
        title
      }
      sample {
        title
      }
      sourceSerie {
        title
        strategy
        platform {
          title
        }
      }
    }
  }
`;
